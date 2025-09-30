import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Cart: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={1}>Shopping Cart</Title>
      <p>Shopping cart page coming soon...</p>
    </div>
  );
};

export default Cart;