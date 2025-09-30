import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Products: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={1}>Products</Title>
      <p>Products page coming soon...</p>
    </div>
  );
};

export default Products;