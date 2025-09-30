import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  Row,
  Col,
  Image,
  Button,
  InputNumber,
  Select,
  Rate,
  Tabs,
  message,
  Spin,
  Tag,
} from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import api from '../services/api';
import { Product, ApiResponse } from '../types';
import { useCartStore } from '../stores/cartStore';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [mainImage, setMainImage] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const response = await api.get<ApiResponse<{ product: Product }>>(
        `/products/slug/${slug}`
      );
      return response.data.data.product;
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      if (!product) return;
      
      const response = await api.post('/cart', {
        productId: product.id,
        quantity,
        size: selectedSize,
        color: selectedColor,
      });
      return response.data;
    },
    onSuccess: () => {
      message.success('Added to cart!');
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        message.info('Please login to add items to cart');
        navigate('/login');
      } else {
        message.error(error.response?.data?.message || 'Failed to add to cart');
      }
    },
  });

  const handleAddToCart = () => {
    if (product?.sizes.length && !selectedSize) {
      message.warning('Please select a size');
      return;
    }
    if (product?.colors.length && !selectedColor) {
      message.warning('Please select a color');
      return;
    }
    addToCartMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Row gutter={[48, 24]}>
        {/* Product Images */}
        <Col xs={24} md={12}>
          <div className="sticky top-24">
            <Image.PreviewGroup>
              <Image
                src={product.images[mainImage] || 'https://via.placeholder.com/600'}
                alt={product.name}
                className="rounded-lg mb-4"
              />
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className={`cursor-pointer rounded-lg border-2 ${
                      mainImage === idx ? 'border-pink-500' : 'border-gray-200'
                    }`}
                    onClick={() => setMainImage(idx)}
                  />
                ))}
              </div>
            </Image.PreviewGroup>
          </div>
        </Col>

        {/* Product Details */}
        <Col xs={24} md={12}>
          <div className="mb-2">
            <Tag color="blue">{product.category?.name}</Tag>
            {product.isFeatured && <Tag color="gold">Featured</Tag>}
          </div>

          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center mb-4">
            <Rate disabled value={product.rating} />
            <span className="ml-2 text-gray-600">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-baseline space-x-4 mb-6">
            <span className="text-4xl font-bold text-pink-600">
              ₹{product.price.toLocaleString()}
            </span>
            {product.comparePrice && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.comparePrice.toLocaleString()}
                </span>
                <Tag color="red" className="text-base">
                  {discount}% OFF
                </Tag>
              </>
            )}
          </div>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Size</label>
              <Select
                placeholder="Select size"
                value={selectedSize}
                onChange={setSelectedSize}
                className="w-full"
                size="large"
                options={product.sizes.map((size) => ({ value: size, label: size }))}
              />
            </div>
          )}

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Color</label>
              <Select
                placeholder="Select color"
                value={selectedColor}
                onChange={setSelectedColor}
                className="w-full"
                size="large"
                options={product.colors.map((color) => ({ value: color, label: color }))}
              />
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <InputNumber
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(val) => setQuantity(val || 1)}
              size="large"
              className="w-32"
            />
            <span className="ml-4 text-gray-600">
              {product.stock} available
            </span>
          </div>

          {/* Add to Cart Button */}
          <div className="flex space-x-4 mb-6">
            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              loading={addToCartMutation.isPending}
              disabled={product.stock === 0}
              className="flex-1 h-12 text-base font-semibold"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            <Button
              size="large"
              icon={<HeartOutlined />}
              className="h-12"
            />
          </div>

          {/* Product Info */}
          <div className="border-t pt-6">
            <p className="mb-2">
              <strong>SKU:</strong> {product.sku}
            </p>
            <p className="mb-2">
              <strong>Category:</strong> {product.category?.name}
            </p>
            {product.tags.length > 0 && (
              <div className="mt-4">
                <strong>Tags:</strong>
                <div className="mt-2">
                  {product.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Product Tabs */}
      <div className="mt-12">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: 'Description',
              children: (
                <div className="py-4">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              ),
            },
            {
              key: '2',
              label: `Reviews (${product.reviewCount})`,
              children: (
                <div className="py-4">
                  <p className="text-gray-600">Reviews will be displayed here</p>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;