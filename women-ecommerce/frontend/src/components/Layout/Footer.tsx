import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  InstagramOutlined, 
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link: AntLink } = Typography;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <Row gutter={[32, 32]}>
          {/* Brand Section */}
          <Col xs={24} sm={12} lg={6}>
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <span className="text-xl font-bold text-white">
                  WomenStyle
                </span>
              </div>
              <Text className="text-gray-300 text-base leading-relaxed">
                Your premier destination for women's fashion, beauty, and lifestyle products. 
                Discover the latest trends and timeless classics.
              </Text>
            </div>
            
            {/* Social Media */}
            <Space size="large">
              <AntLink href="#" className="text-gray-300 hover:text-primary-400">
                <FacebookOutlined style={{ fontSize: '20px' }} />
              </AntLink>
              <AntLink href="#" className="text-gray-300 hover:text-primary-400">
                <InstagramOutlined style={{ fontSize: '20px' }} />
              </AntLink>
              <AntLink href="#" className="text-gray-300 hover:text-primary-400">
                <TwitterOutlined style={{ fontSize: '20px' }} />
              </AntLink>
              <AntLink href="#" className="text-gray-300 hover:text-primary-400">
                <LinkedinOutlined style={{ fontSize: '20px' }} />
              </AntLink>
            </Space>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} lg={6}>
            <Title level={4} className="text-white mb-4">
              Quick Links
            </Title>
            <div className="space-y-2">
              <div><Link to="/products" className="text-gray-300 hover:text-primary-400">All Products</Link></div>
              <div><Link to="/products/beauty" className="text-gray-300 hover:text-primary-400">Beauty & Cosmetics</Link></div>
              <div><Link to="/products/fashion" className="text-gray-300 hover:text-primary-400">Fashion & Clothing</Link></div>
              <div><Link to="/products/accessories" className="text-gray-300 hover:text-primary-400">Accessories</Link></div>
              <div><Link to="/products/baby" className="text-gray-300 hover:text-primary-400">Baby & Kids</Link></div>
              <div><Link to="/about" className="text-gray-300 hover:text-primary-400">About Us</Link></div>
            </div>
          </Col>

          {/* Customer Service */}
          <Col xs={24} sm={12} lg={6}>
            <Title level={4} className="text-white mb-4">
              Customer Service
            </Title>
            <div className="space-y-2">
              <div><Link to="/help" className="text-gray-300 hover:text-primary-400">Help Center</Link></div>
              <div><Link to="/returns" className="text-gray-300 hover:text-primary-400">Returns & Exchanges</Link></div>
              <div><Link to="/shipping" className="text-gray-300 hover:text-primary-400">Shipping Info</Link></div>
              <div><Link to="/size-guide" className="text-gray-300 hover:text-primary-400">Size Guide</Link></div>
              <div><Link to="/track-order" className="text-gray-300 hover:text-primary-400">Track Your Order</Link></div>
              <div><Link to="/contact" className="text-gray-300 hover:text-primary-400">Contact Us</Link></div>
            </div>
          </Col>

          {/* Contact Info */}
          <Col xs={24} sm={12} lg={6}>
            <Title level={4} className="text-white mb-4">
              Contact Info
            </Title>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <EnvironmentOutlined className="text-primary-400" />
                <Text className="text-gray-300">
                  123 Fashion Street, Style City, SC 12345
                </Text>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneOutlined className="text-primary-400" />
                <Text className="text-gray-300">
                  +1 (555) 123-4567
                </Text>
              </div>
              <div className="flex items-center space-x-3">
                <MailOutlined className="text-primary-400" />
                <Text className="text-gray-300">
                  support@womenstyle.com
                </Text>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <Title level={5} className="text-white mb-2">
                Newsletter
              </Title>
              <Text className="text-gray-300 text-sm">
                Subscribe to get updates on new arrivals and exclusive offers.
              </Text>
              {/* Newsletter signup form would go here */}
            </div>
          </Col>
        </Row>

        <Divider className="border-gray-700 my-8" />

        {/* Bottom Section */}
        <Row justify="space-between" align="middle" className="flex-wrap">
          <Col xs={24} md={12} className="text-center md:text-left mb-4 md:mb-0">
            <Text className="text-gray-400">
              © {currentYear} WomenStyle. All rights reserved.
            </Text>
          </Col>
          <Col xs={24} md={12} className="text-center md:text-right">
            <Space split={<span className="text-gray-600">|</span>}>
              <Link to="/privacy" className="text-gray-400 hover:text-primary-400">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary-400">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-primary-400">
                Cookie Policy
              </Link>
            </Space>
          </Col>
        </Row>
      </div>
    </AntFooter>
  );
};

export default Footer;