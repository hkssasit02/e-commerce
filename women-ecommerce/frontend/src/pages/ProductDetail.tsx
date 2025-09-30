import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const ProductDetail: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={1}>Product Detail</Title>
      <p>Product detail page coming soon...</p>
    </div>
  );
};

export default ProductDetail;