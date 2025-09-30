import { Table, Button, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AdminProducts = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products Management</h1>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Product
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <p className="p-8">Product management interface will be displayed here</p>
      </div>
    </div>
  );
};

export default AdminProducts;