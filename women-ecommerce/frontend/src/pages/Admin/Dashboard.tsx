import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={1}>Admin Dashboard</Title>
      <p>Admin dashboard coming soon...</p>
    </div>
  );
};

export default AdminDashboard;