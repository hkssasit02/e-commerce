import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, Tag, Empty, Spin, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import api from '../services/api';
import { Order, ApiResponse, PaginationResponse } from '../types';

const OrdersPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<PaginationResponse<Order>>>('/orders');
      return response.data.data;
    },
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'gold',
      PROCESSING: 'blue',
      SHIPPED: 'cyan',
      OUT_FOR_DELIVERY: 'purple',
      DELIVERED: 'green',
      CANCELLED: 'red',
    };
    return colors[status] || 'default';
  };

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!data || data.orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Empty description="No orders yet" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {data.orders.map((order) => (
          <Link to={`/orders/${order.id}`} key={order.id}>
            <Card hoverable className="shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-lg font-semibold">Order #{order.orderNumber}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <Tag color={getStatusColor(order.status)}>{order.status}</Tag>
                  <p className="text-lg font-bold text-pink-600 mt-2">
                    ₹{order.total.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {order.items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
                {order.items.length > 3 && (
                  <p className="text-sm text-gray-600 self-center">
                    +{order.items.length - 3} more items
                  </p>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;