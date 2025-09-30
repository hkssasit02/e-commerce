import { Link, useNavigate } from 'react-router-dom';
import { Badge, Dropdown, Input, Button, Avatar } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  HeartOutlined,
  SearchOutlined,
  MenuOutlined,
  LogoutOutlined,
  DashboardOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isAdmin } = useAuthStore();
  const itemCount = useCartStore(state => state.itemCount);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'My Profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'orders',
      icon: <ShoppingOutlined />,
      label: 'My Orders',
      onClick: () => navigate('/orders'),
    },
    ...(isAdmin ? [{
      key: 'admin',
      icon: <DashboardOutlined />,
      label: 'Admin Dashboard',
      onClick: () => navigate('/admin'),
    }] : []),
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
              <HeartOutlined className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              Women's Store
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <Input
              size="large"
              placeholder="Search for products..."
              prefix={<SearchOutlined />}
              onPressEnter={(e) => {
                const value = (e.target as HTMLInputElement).value;
                if (value) navigate(`/products?search=${value}`);
              }}
              className="rounded-full"
            />
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/cart">
                  <Badge count={itemCount} showZero>
                    <ShoppingCartOutlined className="text-2xl text-gray-700 hover:text-pink-500" />
                  </Badge>
                </Link>

                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Avatar icon={<UserOutlined />} className="bg-pink-500" />
                    <span className="hidden md:inline text-sm font-medium">
                      {user?.firstName}
                    </span>
                  </div>
                </Dropdown>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button type="text">Login</Button>
                </Link>
                <Link to="/register">
                  <Button type="primary" className="rounded-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <Input
            placeholder="Search for products..."
            prefix={<SearchOutlined />}
            onPressEnter={(e) => {
              const value = (e.target as HTMLInputElement).value;
              if (value) navigate(`/products?search=${value}`);
            }}
            className="rounded-full"
          />
        </div>
      </div>

      {/* Category Navigation */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 h-12 items-center overflow-x-auto">
            <Link to="/products?category=beauty-cosmetics" className="text-sm font-medium text-gray-700 hover:text-pink-500 whitespace-nowrap">
              Beauty & Cosmetics
            </Link>
            <Link to="/products?category=fashion-clothing" className="text-sm font-medium text-gray-700 hover:text-pink-500 whitespace-nowrap">
              Fashion & Clothing
            </Link>
            <Link to="/products?category=hosiery" className="text-sm font-medium text-gray-700 hover:text-pink-500 whitespace-nowrap">
              Hosiery
            </Link>
            <Link to="/products?category=undergarments" className="text-sm font-medium text-gray-700 hover:text-pink-500 whitespace-nowrap">
              Undergarments
            </Link>
            <Link to="/products?category=baby-clothing" className="text-sm font-medium text-gray-700 hover:text-pink-500 whitespace-nowrap">
              Baby Clothing
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;