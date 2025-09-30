import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Row, Col, Spin, Select, Slider, Checkbox, Button, Empty, Pagination } from 'antd';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import { Product, ApiResponse, PaginationResponse } from '../types';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const category = searchParams.get('category');
  const search = searchParams.get('search');

  const { data, isLoading } = useQuery({
    queryKey: ['products', page, limit, category, search, sortBy, order, priceRange],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        order,
        minPrice: priceRange[0].toString(),
        maxPrice: priceRange[1].toString(),
      });

      if (category) params.append('category', category);
      if (search) params.append('search', search);

      const response = await api.get<ApiResponse<PaginationResponse<Product>>>(
        `/products?${params}`
      );
      return response.data.data;
    },
  });

  const handleSortChange = (value: string) => {
    const [newSortBy, newOrder] = value.split('-');
    setSortBy(newSortBy);
    setOrder(newOrder);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {search ? `Search Results for "${search}"` : category ? category.replace(/-/g, ' ').toUpperCase() : 'All Products'}
        </h1>
        <p className="text-gray-600">
          {data?.pagination.total || 0} products found
        </p>
      </div>

      <Row gutter={24}>
        {/* Filters Sidebar */}
        <Col xs={24} md={6} className="mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <Select
                value={`${sortBy}-${order}`}
                onChange={handleSortChange}
                className="w-full"
                options={[
                  { value: 'createdAt-desc', label: 'Newest First' },
                  { value: 'price-asc', label: 'Price: Low to High' },
                  { value: 'price-desc', label: 'Price: High to Low' },
                  { value: 'rating-desc', label: 'Highest Rated' },
                  { value: 'name-asc', label: 'Name: A to Z' },
                ]}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <Slider
                range
                min={0}
                max={10000}
                step={100}
                value={priceRange}
                onChange={(value) => setPriceRange(value as [number, number])}
                className="mb-4"
              />
            </div>

            <Button
              type="primary"
              className="w-full"
              onClick={() => {
                setPage(1);
                setPriceRange([0, 5000]);
                setSortBy('createdAt');
                setOrder('desc');
              }}
            >
              Reset Filters
            </Button>
          </div>
        </Col>

        {/* Products Grid */}
        <Col xs={24} md={18}>
          {isLoading ? (
            <div className="text-center py-20">
              <Spin size="large" />
            </div>
          ) : data?.products && data.products.length > 0 ? (
            <>
              <Row gutter={[24, 24]}>
                {data.products.map((product) => (
                  <Col xs={24} sm={12} lg={8} key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>

              <div className="mt-8 flex justify-center">
                <Pagination
                  current={page}
                  total={data.pagination.total}
                  pageSize={limit}
                  onChange={setPage}
                  showSizeChanger={false}
                  showTotal={(total) => `Total ${total} products`}
                />
              </div>
            </>
          ) : (
            <Empty
              description="No products found"
              className="py-20"
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductsPage;