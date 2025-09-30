import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Button, Spin, Card } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import { Product, Category, ApiResponse } from '../types';

const HomePage = () => {
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<{ products: Product[] }>>(
        '/products?featured=true&limit=8'
      );
      return response.data.data.products;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<{ categories: Category[] }>>('/categories');
      return response.data.data.categories;
    },
  });

  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200',
      title: 'New Season Collection',
      subtitle: 'Discover the latest trends in fashion',
      cta: 'Shop Now',
      link: '/products?category=fashion-clothing',
    },
    {
      url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200',
      title: 'Beauty Essentials',
      subtitle: 'Premium cosmetics for every occasion',
      cta: 'Explore Beauty',
      link: '/products?category=beauty-cosmetics',
    },
    {
      url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200',
      title: 'Baby Collection',
      subtitle: 'Adorable clothing for your little ones',
      cta: 'Shop Baby',
      link: '/products?category=baby-clothing',
    },
  ];

  return (
    <div className="fade-in">
      {/* Hero Carousel */}
      <Carousel autoplay className="mb-12">
        {carouselImages.map((slide, index) => (
          <div key={index}>
            <div
              className="relative h-[500px] bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.url})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="relative h-full flex items-center justify-center text-center text-white px-4">
                <div>
                  <h1 className="text-5xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                  <Link to={slide.link}>
                    <Button type="primary" size="large" className="rounded-full px-8 py-6 text-lg h-auto">
                      {slide.cta} <ArrowRightOutlined />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <Row gutter={[24, 24]}>
            {categories?.slice(0, 5).map((category) => (
              <Col xs={12} sm={8} md={6} lg={4} key={category.id}>
                <Link to={`/products?category=${category.slug}`}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={category.name}
                        src={category.image || 'https://via.placeholder.com/300'}
                        className="h-40 object-cover"
                      />
                    }
                    className="text-center"
                  >
                    <Card.Meta title={category.name} />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </section>

        {/* Featured Products */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products">
              <Button type="text" className="text-pink-500">
                View All <ArrowRightOutlined />
              </Button>
            </Link>
          </div>

          {productsLoading ? (
            <div className="text-center py-20">
              <Spin size="large" />
            </div>
          ) : (
            <Row gutter={[24, 24]}>
              {productsData?.map((product) => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </section>

        {/* Benefits Section */}
        <section className="mb-16 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-8">
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8} className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over ₹500</p>
            </Col>
            <Col xs={24} md={8} className="text-center">
              <div className="text-4xl mb-4">💯</div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">100% authentic products</p>
            </Col>
            <Col xs={24} md={8} className="text-center">
              <div className="text-4xl mb-4">↩️</div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day hassle-free returns</p>
            </Col>
          </Row>
        </section>
      </div>
    </div>
  );
};

export default HomePage;