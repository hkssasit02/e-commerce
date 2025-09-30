import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Profile: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={1}>Profile</Title>
      <p>Profile page coming soon...</p>
    </div>
  );
};

export default Profile;