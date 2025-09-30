import { Link } from 'react-router-dom';
import { Card, Tag, Rate, Button } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { Product } from '../types';

const { Meta } = Card;

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <Link to={`/products/${product.slug}`}>
      <Card
        hoverable
        className="product-card h-full"
        cover={
          <div className="relative overflow-hidden h-64">
            <img
              alt={product.name}
              src={product.images[0] || 'https://via.placeholder.com/400'}
              className="w-full h-full object-cover"
            />
            {discount > 0 && (
              <Tag color="red" className="absolute top-2 left-2 font-semibold">
                {discount}% OFF
              </Tag>
            )}
            {product.isFeatured && (
              <Tag color="gold" className="absolute top-2 right-2">
                Featured
              </Tag>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                size="large"
                className="mr-2"
              >
                Add to Cart
              </Button>
              <Button
                type="default"
                icon={<HeartOutlined />}
                size="large"
                className="bg-white"
              />
            </div>
          </div>
        }
      >
        <Meta
          title={
            <div className="flex flex-col">
              <span className="text-base font-semibold truncate">{product.name}</span>
              <div className="flex items-center mt-1">
                <Rate disabled defaultValue={product.rating} className="text-xs" />
                <span className="text-xs text-gray-500 ml-2">
                  ({product.reviewCount})
                </span>
              </div>
            </div>
          }
          description={
            <div className="mt-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-bold text-pink-600">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.comparePrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.comparePrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.stock < 10 && product.stock > 0 && (
                <Tag color="orange" className="mt-2">
                  Only {product.stock} left!
                </Tag>
              )}
              {product.stock === 0 && (
                <Tag color="red" className="mt-2">
                  Out of Stock
                </Tag>
              )}
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default ProductCard;