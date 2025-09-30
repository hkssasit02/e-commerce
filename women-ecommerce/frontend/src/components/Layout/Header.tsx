import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Input, Badge, Button, Dropdown, Avatar, Space } from 'antd';
import { 
  SearchOutlined, 
  ShoppingCartOutlined, 
  UserOutlined, 
  HeartOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Heart, ShoppingBag, Search, Menu as MenuIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const { Header: AntHeader } = Layout;
const { Search: AntSearch } = Input;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/products?search=${encodeURIComponent(value.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'My Profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'orders',
      icon: <ShoppingCartOutlined />,
      label: 'My Orders',
      onClick: () => navigate('/profile/orders'),
    },
    {
      key: 'wishlist',
      icon: <HeartOutlined />,
      label: 'Wishlist',
      onClick: () => navigate('/profile/wishlist'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/profile/settings'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const categoryMenuItems = [
    {
      key: 'beauty',
      label: <Link to="/products/beauty">Beauty & Cosmetics</Link>,
    },
    {
      key: 'fashion',
      label: <Link to="/products/fashion">Fashion & Clothing</Link>,
    },
    {
      key: 'accessories',
      label: <Link to="/products/accessories">Accessories</Link>,
    },
    {
      key: 'lingerie',
      label: <Link to="/products/lingerie">Lingerie & Undergarments</Link>,
    },
    {
      key: 'baby',
      label: <Link to="/products/baby">Baby & Kids</Link>,
    },
  ];

  return (
    <AntHeader className="bg-white shadow-md sticky top-0 z-50 px-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              WomenStyle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Menu
              mode="horizontal"
              items={categoryMenuItems}
              className="border-none bg-transparent"
            />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <AntSearch
              placeholder="Search for products, brands..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              className="w-full"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <Button 
              type="text" 
              icon={<Search size={20} />} 
              className="md:hidden"
              onClick={() => {/* Handle mobile search modal */}}
            />

            {/* Wishlist */}
            <Button
              type="text"
              icon={<Heart size={20} />}
              className="hidden sm:flex"
              onClick={() => navigate('/profile/wishlist')}
            />

            {/* Cart */}
            <Badge count={getCartItemsCount()} showZero={false}>
              <Button
                type="text"
                icon={<ShoppingBag size={20} />}
                onClick={() => navigate('/cart')}
              />
            </Badge>

            {/* User Menu */}
            {isAuthenticated && user ? (
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                trigger={['click']}
              >
                <Space className="cursor-pointer">
                  <Avatar
                    size="default"
                    src={user.avatar}
                    icon={<UserOutlined />}
                  />
                  <span className="hidden sm:block font-medium">
                    {user.firstName}
                  </span>
                </Space>
              </Dropdown>
            ) : (
              <div className="flex items-center space-x-2">
                <Button type="text" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button type="primary" onClick={() => navigate('/register')}>
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Button
              type="text"
              icon={<MenuIcon size={20} />}
              className="lg:hidden"
              onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuVisible && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-4">
            <Menu
              mode="vertical"
              items={categoryMenuItems}
              className="border-none"
            />
          </div>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;