import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout as AntLayout } from 'antd';
import Header from './Header';
import Footer from './Footer';
import { useAuthStore } from '../stores/authStore';

const { Content } = AntLayout;

const Layout = () => {
  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AntLayout className="min-h-screen">
      <Header />
      <Content className="mt-16">
        <Outlet />
      </Content>
      <Footer />
    </AntLayout>
  );
};

export default Layout;