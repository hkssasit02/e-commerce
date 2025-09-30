import { Tabs, Card, Form, Input, Button, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';

const ProfilePage = () => {
  const { user } = useAuthStore();
  const [form] = Form.useForm();

  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      return api.put('/users/profile', data);
    },
    onSuccess: () => {
      message.success('Profile updated successfully');
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Failed to update profile');
    },
  });

  const onFinish = (values: any) => {
    updateProfileMutation.mutate(values);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <Card>
        <Tabs
          items={[
            {
              key: '1',
              label: 'Profile Information',
              children: (
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  initialValues={user || {}}
                >
                  <Form.Item label="First Name" name="firstName">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Last Name" name="lastName">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item label="Phone" name="phone">
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={updateProfileMutation.isPending}
                    >
                      Update Profile
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
            {
              key: '2',
              label: 'Addresses',
              children: <div>Address management will be displayed here</div>,
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default ProfilePage;