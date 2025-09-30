import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, Tag, Steps, Spin, Row, Col } from 'antd';
import api from '../services/api';
import { Order, ApiResponse } from '../types';

const OrderDetailPage = () => {
  const { id } = useParams();

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<{ order: Order }>>(`/orders/${id}`);
      return response.data.data.order;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!order) {
    return <div className="text-center py-20">Order not found</div>;
  }

  const statusSteps = ['PENDING', 'PROCESSING', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'];
  const currentStepIndex = statusSteps.indexOf(order.status);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      <Card className="mb-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-2xl font-semibold">Order #{order.orderNumber}</p>
            <p className="text-gray-600">Placed on {new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <Tag color={order.status === 'DELIVERED' ? 'green' : 'blue'} className="text-base px-4 py-1">
            {order.status}
          </Tag>
        </div>

        <Steps
          current={currentStepIndex}
          items={statusSteps.map((status) => ({ title: status }))}
          className="mb-8"
        />
      </Card>

      <Row gutter={24}>
        <Col xs={24} lg={16}>
          <Card title="Order Items" className="mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 mb-4 pb-4 border-b last:border-b-0">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.size && `Size: ${item.size}`}
                    {item.color && ` | Color: ${item.color}`}
                  </p>
                  <p className="text-sm">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                </div>
                <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </Card>

          <Card title="Shipping Address">
            <p className="font-semibold">{order.address.fullName}</p>
            <p className="text-gray-600">
              {order.address.addressLine1}
              {order.address.addressLine2 && `, ${order.address.addressLine2}`}
            </p>
            <p className="text-gray-600">
              {order.address.city}, {order.address.state} - {order.address.postalCode}
            </p>
            <p className="text-gray-600">{order.address.phone}</p>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Order Summary" className="mb-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>₹{order.shippingCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>₹{order.tax.toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-₹{order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-pink-600">₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          <Card title="Payment Info">
            <p>Method: {order.paymentMethod.toUpperCase()}</p>
            <p>Status: <Tag color={order.paymentStatus === 'COMPLETED' ? 'green' : 'gold'}>{order.paymentStatus}</Tag></p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetailPage;