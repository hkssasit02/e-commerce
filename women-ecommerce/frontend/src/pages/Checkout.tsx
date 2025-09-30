import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Checkout: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={1}>Checkout</Title>
      <p>Checkout page coming soon...</p>
    </div>
  );
};

export default Checkout;