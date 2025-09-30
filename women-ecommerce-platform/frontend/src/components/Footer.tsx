import { Link } from 'react-router-dom';
import { Row, Col, Space } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  HeartOutlined,
} from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                <HeartOutlined className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-white">Women's Store</span>
            </div>
            <p className="text-sm mb-4">
              Your one-stop destination for beauty, fashion, and lifestyle products designed exclusively for women.
            </p>
            <Space size="large">
              <FacebookOutlined className="text-xl hover:text-pink-500 cursor-pointer" />
              <TwitterOutlined className="text-xl hover:text-pink-500 cursor-pointer" />
              <InstagramOutlined className="text-xl hover:text-pink-500 cursor-pointer" />
              <YoutubeOutlined className="text-xl hover:text-pink-500 cursor-pointer" />
            </Space>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=beauty-cosmetics" className="hover:text-pink-500">Beauty & Cosmetics</Link></li>
              <li><Link to="/products?category=fashion-clothing" className="hover:text-pink-500">Fashion & Clothing</Link></li>
              <li><Link to="/products?category=hosiery" className="hover:text-pink-500">Hosiery</Link></li>
              <li><Link to="/products?category=undergarments" className="hover:text-pink-500">Undergarments</Link></li>
              <li><Link to="/products?category=baby-clothing" className="hover:text-pink-500">Baby Clothing</Link></li>
            </ul>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-pink-500">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-pink-500">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-pink-500">Returns & Refunds</Link></li>
              <li><Link to="/faq" className="hover:text-pink-500">FAQ</Link></li>
              <li><Link to="/track-order" className="hover:text-pink-500">Track Your Order</Link></li>
            </ul>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-pink-500">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-pink-500">Careers</Link></li>
              <li><Link to="/privacy" className="hover:text-pink-500">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-pink-500">Terms of Service</Link></li>
            </ul>
          </Col>
        </Row>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Women's Store. All rights reserved.</p>
          <p className="mt-2">Made with ❤️ for women everywhere</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;