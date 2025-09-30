import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Typography, Carousel, Space, Spin, message } from 'antd';
import { ArrowRightOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Product, Category } from '@/types';
import { productService } from '@/services/productService';

const { Title, Text } = Typography;
const { Meta } = Card;

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productService.getFeaturedProducts(),
          productService.getCategories(),
        ]);
        
        setFeaturedProducts(productsData);
        setCategories(categoriesData);
      } catch (error: any) {
        message.error('Failed to load home page data');
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const heroSlides = [
    {
      title: "New Collection 2024",
      subtitle: "Discover the latest trends in women's fashion",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
      link: "/products/fashion",
    },
    {
      title: "Beauty & Cosmetics",
      subtitle: "Premium skincare and makeup products",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=600&fit=crop",
      link: "/products/beauty",
    },
    {
      title: "Accessories & More",
      subtitle: "Complete your look with our accessories",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=600&fit=crop",
      link: "/products/accessories",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="mb-16">
        <Carousel autoplay effect="fade" className="hero-carousel">
          {heroSlides.map((slide, index) => (
            <div key={index}>
              <div 
                className="relative h-96 md:h-[500px] lg:h-[600px] bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <Title level={1} className="text-white mb-4 text-3xl md:text-5xl lg:text-6xl">
                      {slide.title}
                    </Title>
                    <Text className="text-xl md:text-2xl mb-8 block">
                      {slide.subtitle}
                    </Text>
                    <Link to={slide.link}>
                      <Button 
                        type="primary" 
                        size="large" 
                        icon={<ShoppingOutlined />}
                        className="bg-primary-500 border-primary-500 hover:bg-primary-600"
                      >
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      <div className="container mx-auto px-4">
        {/* Categories Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <Title level={2} className="gradient-text">
              Shop by Category
            </Title>
            <Text className="text-lg text-gray-600">
              Discover our curated collections for every style and occasion
            </Text>
          </div>
          
          <Row gutter={[24, 24]}>
            {categories.slice(0, 6).map((category) => (
              <Col xs={12} sm={8} lg={4} key={category.id}>
                <Link to={`/products/${category.slug}`}>
                  <Card
                    hoverable
                    cover={
                      <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                        {category.image ? (
                          <img 
                            src={category.image} 
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-6xl text-primary-300">
                            👗
                          </div>
                        )}
                      </div>
                    }
                    className="text-center category-card"
                  >
                    <Meta 
                      title={category.name}
                      description={category.description}
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </section>

        {/* Featured Products Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Title level={2} className="gradient-text mb-2">
                Featured Products
              </Title>
              <Text className="text-lg text-gray-600">
                Handpicked favorites just for you
              </Text>
            </div>
            <Link to="/products">
              <Button type="link" size="large" icon={<ArrowRightOutlined />}>
                View All Products
              </Button>
            </Link>
          </div>

          <Row gutter={[24, 24]}>
            {featuredProducts.slice(0, 8).map((product) => (
              <Col xs={12} sm={8} lg={6} key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <Card
                    hoverable
                    cover={
                      <div className="h-64 overflow-hidden">
                        <img
                          src={product.images[0]?.url || '/placeholder-product.jpg'}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    }
                    className="product-card h-full"
                  >
                    <Meta
                      title={
                        <div className="truncate" title={product.name}>
                          {product.name}
                        </div>
                      }
                      description={
                        <div>
                          <div className="text-sm text-gray-500 mb-2">
                            {product.brand}
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-lg font-bold text-primary-600">
                                ${product.price}
                              </span>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-sm text-gray-400 line-through ml-2">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                            <div className="text-yellow-500">
                              ⭐ {product.rating.toFixed(1)}
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </section>

        {/* Benefits Section */}
        <section className="mb-16 bg-gray-50 rounded-2xl p-8">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} lg={12}>
              <Title level={2} className="gradient-text mb-4">
                Why Choose WomenStyle?
              </Title>
              <Space direction="vertical" size="large" className="w-full">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    🚚
                  </div>
                  <div>
                    <Title level={4} className="mb-2">Free Shipping</Title>
                    <Text className="text-gray-600">
                      Free shipping on orders over $50. Fast and reliable delivery.
                    </Text>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    🔒
                  </div>
                  <div>
                    <Title level={4} className="mb-2">Secure Payment</Title>
                    <Text className="text-gray-600">
                      Your payment information is always secure with SSL encryption.
                    </Text>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    ↩️
                  </div>
                  <div>
                    <Title level={4} className="mb-2">Easy Returns</Title>
                    <Text className="text-gray-600">
                      30-day return policy. No questions asked.
                    </Text>
                  </div>
                </div>
              </Space>
            </Col>
            <Col xs={24} lg={12}>
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=400&fit=crop"
                  alt="Happy customer"
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </Col>
          </Row>
        </section>
      </div>
    </div>
  );
};

export default Home;