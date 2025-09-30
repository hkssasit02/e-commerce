import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, InputNumber, Empty, message, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import api from '../services/api';
import { Cart, ApiResponse } from '../types';

const CartPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<{ cart: Cart }>>('/cart');
      return response.data.data.cart;
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      return api.put(`/cart/${itemId}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Failed to update quantity');
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      return api.delete(`/cart/${itemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      message.success('Item removed from cart');
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Failed to remove item');
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Empty
          description="Your cart is empty"
          className="py-20"
        >
          <Button type="primary" onClick={() => navigate('/products')}>
            Start Shopping
          </Button>
        </Empty>
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingCost = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.18;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <Row gutter={24}>
        <Col xs={24} lg={16}>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <Card key={item.id} className="shadow-sm">
                <Row gutter={16} align="middle">
                  <Col xs={8} sm={6}>
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-24 object-cover rounded"
                    />
                  </Col>
                  <Col xs={16} sm={18}>
                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-gray-600 text-sm">
                          {item.size && `Size: ${item.size}`}
                          {item.color && ` | Color: ${item.color}`}
                        </p>
                        <p className="text-pink-600 font-semibold mt-2">
                          ₹{item.product.price.toLocaleString()}
                        </p>
                      </Col>
                      <Col xs={24} sm={12} className="flex items-center justify-between mt-4 sm:mt-0">
                        <InputNumber
                          min={1}
                          max={item.product.stock}
                          value={item.quantity}
                          onChange={(val) =>
                            updateQuantityMutation.mutate({
                              itemId: item.id,
                              quantity: val || 1,
                            })
                          }
                          className="w-24"
                        />
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => removeItemMutation.mutate(item.id)}
                          loading={removeItemMutation.isPending}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Order Summary" className="shadow-sm sticky top-24">
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
              {subtotal < 500 && (
                <p className="text-sm text-gray-600">
                  Add ₹{(500 - subtotal).toLocaleString()} more for free shipping!
                </p>
              )}
            </div>
            <Button
              type="primary"
              size="large"
              className="w-full mt-6 h-12 text-base font-semibold"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </Button>
            <Button
              type="text"
              className="w-full mt-2"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;