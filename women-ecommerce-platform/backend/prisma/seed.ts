import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123456', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isVerified: true
    }
  });
  console.log('✅ Admin user created');

  // Create test customer
  const customerPassword = await bcrypt.hash('customer123', 12);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      password: customerPassword,
      firstName: 'Jane',
      lastName: 'Doe',
      phone: '+919876543210',
      role: 'CUSTOMER',
      isVerified: true,
      cart: {
        create: {}
      }
    }
  });
  console.log('✅ Customer user created');

  // Create categories
  const categories = [
    {
      name: 'Beauty & Cosmetics',
      slug: 'beauty-cosmetics',
      description: 'Premium beauty products and cosmetics',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400'
    },
    {
      name: 'Fashion & Clothing',
      slug: 'fashion-clothing',
      description: 'Trendy fashion and clothing for women',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400'
    },
    {
      name: 'Hosiery',
      slug: 'hosiery',
      description: 'Comfortable and stylish hosiery',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400'
    },
    {
      name: 'Undergarments',
      slug: 'undergarments',
      description: 'Premium quality undergarments',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400'
    },
    {
      name: 'Baby Clothing',
      slug: 'baby-clothing',
      description: 'Adorable clothing for babies',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400'
    }
  ];

  const createdCategories = await Promise.all(
    categories.map(cat =>
      prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: cat
      })
    )
  );
  console.log('✅ Categories created');

  // Create sample products
  const products = [
    {
      name: 'Luxury Lipstick - Ruby Red',
      slug: 'luxury-lipstick-ruby-red',
      description: 'Long-lasting luxury lipstick with rich color and moisturizing formula',
      price: 599,
      comparePrice: 799,
      categoryId: createdCategories[0].id,
      stock: 50,
      sku: 'BEAUTY-LIP-001',
      images: [
        'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600',
        'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600'
      ],
      colors: ['Ruby Red', 'Pink Blush', 'Coral'],
      tags: ['makeup', 'lipstick', 'beauty'],
      isFeatured: true
    },
    {
      name: 'Floral Summer Dress',
      slug: 'floral-summer-dress',
      description: 'Beautiful floral print summer dress with comfortable fit',
      price: 1299,
      comparePrice: 1799,
      categoryId: createdCategories[1].id,
      stock: 30,
      sku: 'FASHION-DRESS-001',
      images: [
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600'
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Blue', 'Pink', 'Yellow'],
      tags: ['dress', 'summer', 'floral'],
      isFeatured: true
    },
    {
      name: 'Premium Cotton Leggings',
      slug: 'premium-cotton-leggings',
      description: 'Soft and comfortable cotton leggings for everyday wear',
      price: 499,
      comparePrice: 699,
      categoryId: createdCategories[2].id,
      stock: 100,
      sku: 'HOS-LEG-001',
      images: [
        'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600'
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Navy', 'Gray', 'White'],
      tags: ['leggings', 'hosiery', 'comfortable'],
      isFeatured: false
    },
    {
      name: 'Comfort Fit Bra',
      slug: 'comfort-fit-bra',
      description: 'Ultra-comfortable wireless bra with perfect support',
      price: 799,
      comparePrice: 999,
      categoryId: createdCategories[3].id,
      stock: 75,
      sku: 'UND-BRA-001',
      images: [
        'https://images.unsplash.com/photo-1624206112431-fd36b88db0ce?w=600'
      ],
      sizes: ['32B', '34B', '36B', '32C', '34C', '36C'],
      colors: ['Black', 'Nude', 'White'],
      tags: ['bra', 'comfortable', 'wireless'],
      isFeatured: true
    },
    {
      name: 'Baby Cotton Romper Set',
      slug: 'baby-cotton-romper-set',
      description: 'Adorable cotton romper set for babies - pack of 3',
      price: 899,
      comparePrice: 1299,
      categoryId: createdCategories[4].id,
      stock: 40,
      sku: 'BABY-ROM-001',
      images: [
        'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600',
        'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600'
      ],
      sizes: ['0-3M', '3-6M', '6-9M', '9-12M'],
      colors: ['Multicolor'],
      tags: ['baby', 'romper', 'cotton'],
      isFeatured: true
    },
    {
      name: 'Silk Evening Gown',
      slug: 'silk-evening-gown',
      description: 'Elegant silk evening gown perfect for special occasions',
      price: 2999,
      comparePrice: 3999,
      categoryId: createdCategories[1].id,
      stock: 15,
      sku: 'FASHION-GOWN-001',
      images: [
        'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600'
      ],
      sizes: ['S', 'M', 'L'],
      colors: ['Black', 'Navy', 'Burgundy'],
      tags: ['evening', 'gown', 'silk', 'formal'],
      isFeatured: true
    },
    {
      name: 'Natural Face Cream',
      slug: 'natural-face-cream',
      description: 'Organic face cream with natural ingredients for healthy skin',
      price: 799,
      comparePrice: 1099,
      categoryId: createdCategories[0].id,
      stock: 60,
      sku: 'BEAUTY-CREAM-001',
      images: [
        'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=600'
      ],
      tags: ['skincare', 'organic', 'face cream'],
      isFeatured: false
    },
    {
      name: 'Denim Jacket',
      slug: 'denim-jacket',
      description: 'Classic denim jacket - a wardrobe essential',
      price: 1599,
      comparePrice: 2199,
      categoryId: createdCategories[1].id,
      stock: 25,
      sku: 'FASHION-JACKET-001',
      images: [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600'
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Light Blue', 'Dark Blue', 'Black'],
      tags: ['jacket', 'denim', 'casual'],
      isFeatured: false
    }
  ];

  await Promise.all(
    products.map(product =>
      prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: product
      })
    )
  );
  console.log('✅ Products created');

  console.log('🌱 Seed completed successfully!');
  console.log('\n📝 Test Credentials:');
  console.log('Admin: admin@example.com / admin123456');
  console.log('Customer: customer@example.com / customer123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });