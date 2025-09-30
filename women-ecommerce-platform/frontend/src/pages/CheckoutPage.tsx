import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tantml:react-query';
import { Row, Col, Card, Form, Input, Button, Radio, message, Steps, Spin } from 'antd';
import api from '../services/api';
import { Cart, Address, ApiResponse } from '../types';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState<string>();
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const { data: cart, isLoading: cartLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<{ cart: Cart }>>('/cart');
      return response.data.data.cart;
    },
  });

  const { data: addresses, isLoading: addressesLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<{ addresses: Address[] }>>('/users/addresses');
      return response.data.data.addresses;
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: { addressId: string; paymentMethod: string }) => {
      const response = await api.post('/orders', data);
      return response.data;
    },
    onSuccess: (data) => {
      message.success('Order placed successfully!');
      navigate(`/orders/${data.data.order.id}`);
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Failed to place order');
    },
  });

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      message.warning('Please select a delivery address');
      return;
    }
    createOrderMutation.mutate({
      addressId: selectedAddress,
      paymentMethod,
    });
  };

  if (cartLoading || addressesLoading) {
    return (
      <div className="text-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  const subtotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.18;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <Steps
        current={currentStep}
        items={[
          { title: 'Shipping' },
          { title: 'Payment' },
          { title: 'Review' },
        ]}
        className="mb-8"
      />

      <Row gutter={24}>
        <Col xs={24} lg={16}>
          {currentStep === 0 && (
            <Card title="Shipping Address" className="mb-4">
              {addresses && addresses.length > 0 ? (
                <Radio.Group
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  value={selectedAddress}
                  className="w-full"
                >
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <Radio key={address.id} value={address.id} className="w-full">
                        <div className="ml-2">
                          <p className="font-semibold">{address.fullName}</p>
                          <p className="text-sm text-gray-600">
                            {address.addressLine1}, {address.addressLine2 && `${address.addressLine2}, `}
                            {address.city}, {address.state} - {address.postalCode}
                          </p>
                          <p className="text-sm text-gray-600">{address.phone}</p>
                        </div>
                      </Radio>
                    ))}
                  </div>
                </Radio.Group>
              ) : (
                <p className="text-gray-600">No addresses found. Please add a delivery address.</p>
              )}
              <Button type="primary" className="mt-4" onClick={() => setCurrentStep(1)}>
                Continue to Payment
              </Button>
            </Card>
          )}

          {currentStep === 1 && (
            <Card title="Payment Method" className="mb-4">
              <Radio.Group
                onChange={(e) => setPaymentMethod(e.target.value)}
                value={paymentMethod}
              >
                <div className="space-y-3">
                  <Radio value="cod">Cash on Delivery</Radio>
                  <Radio value="stripe">Credit/Debit Card (Stripe)</Radio>
                </div>
              </Radio.Group>
              <div className="mt-4 space-x-2">
                <Button onClick={() => setCurrentStep(0)}>Back</Button>
                <Button type="primary" onClick={() => setCurrentStep(2)}>
                  Continue to Review
                </Button>
              </div>
            </Card>
          )}

          {currentStep === 2 && (
            <Card title="Review Order" className="mb-4">
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} × ₹{item.product.price}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-x-2">
                <Button onClick={() => setCurrentStep(1)}>Back</Button>
                <Button
                  type="primary"
                  onClick={handlePlaceOrder}
                  loading={createOrderMutation.isPending}
                >
                  Place Order
                </Button>
              </div>
            </Card>
          )}
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Order Summary" className="sticky top-24">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%):</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-pink-600">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutPage;