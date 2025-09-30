import { useQuery } from '@tanstack/react-query';
import { Card, Row, Col, Statistic, Spin } from 'antd';
import { ShoppingOutlined, UserOutlined, DollarOutlined, AppstoreOutlined } from '@ant-design/icons';
import api from '../../services/api';

const AdminDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const response = await api.get('/admin/dashboard');
      return response.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={data?.stats.totalUsers || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={data?.stats.totalOrders || 0}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={data?.stats.totalProducts || 0}
              prefix={<AppstoreOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={data?.stats.totalRevenue || 0}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#cf1322' }}
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Orders">
        <p>Recent orders list will be displayed here</p>
      </Card>
    </div>
  );
};

export default AdminDashboard;