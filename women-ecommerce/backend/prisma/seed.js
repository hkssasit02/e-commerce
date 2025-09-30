"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting database seeding...');
    const beautyCategory = await prisma.category.create({
        data: {
            name: 'Beauty & Cosmetics',
            slug: 'beauty',
            description: 'Premium skincare, makeup, and beauty products',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
        },
    });
    const fashionCategory = await prisma.category.create({
        data: {
            name: 'Fashion & Clothing',
            slug: 'fashion',
            description: 'Trendy clothing and fashion accessories',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
        },
    });
    const accessoriesCategory = await prisma.category.create({
        data: {
            name: 'Accessories',
            slug: 'accessories',
            description: 'Bags, jewelry, and fashion accessories',
            image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop',
        },
    });
    const lingerieCategory = await prisma.category.create({
        data: {
            name: 'Lingerie & Undergarments',
            slug: 'lingerie',
            description: 'Comfortable and stylish undergarments',
            image: 'https://images.unsplash.com/photo-1594736797933-d0bd3e5ad2c8?w=400&h=300&fit=crop',
        },
    });
    const babyCategory = await prisma.category.create({
        data: {
            name: 'Baby & Kids',
            slug: 'baby',
            description: 'Clothing and accessories for babies and children',
            image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop',
        },
    });
    console.log('✅ Categories created');
    const adminPassword = await bcryptjs_1.default.hash('admin123', 12);
    const admin = await prisma.user.create({
        data: {
            email: 'admin@womenstyle.com',
            password: adminPassword,
            firstName: 'Admin',
            lastName: 'User',
            role: client_1.Role.ADMIN,
        },
    });
    await prisma.cart.create({
        data: {
            userId: admin.id,
        },
    });
    console.log('✅ Admin user created');
    const customerPassword = await bcryptjs_1.default.hash('customer123', 12);
    const customer = await prisma.user.create({
        data: {
            email: 'customer@example.com',
            password: customerPassword,
            firstName: 'Jane',
            lastName: 'Doe',
            phone: '+1234567890',
        },
    });
    await prisma.cart.create({
        data: {
            userId: customer.id,
        },
    });
    await prisma.address.create({
        data: {
            userId: customer.id,
            firstName: 'Jane',
            lastName: 'Doe',
            street: '123 Fashion Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'US',
            phone: '+1234567890',
            isDefault: true,
        },
    });
    console.log('✅ Sample customer created');
    const products = [
        {
            name: 'Premium Moisturizer',
            description: 'Hydrating moisturizer with natural ingredients for all skin types',
            price: 49.99,
            originalPrice: 59.99,
            categoryId: beautyCategory.id,
            brand: 'SkinCare Pro',
            sku: 'SKU001',
            stockQuantity: 100,
            featured: true,
            tags: ['skincare', 'moisturizer', 'hydrating'],
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
                    alt: 'Premium Moisturizer',
                    isPrimary: true,
                    order: 0,
                },
            ],
        },
        {
            name: 'Elegant Summer Dress',
            description: 'Flowy summer dress perfect for any occasion',
            price: 79.99,
            categoryId: fashionCategory.id,
            brand: 'Fashion Forward',
            sku: 'SKU002',
            stockQuantity: 50,
            featured: true,
            tags: ['dress', 'summer', 'elegant'],
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=500&fit=crop',
                    alt: 'Elegant Summer Dress',
                    isPrimary: true,
                    order: 0,
                },
            ],
        },
        {
            name: 'Designer Handbag',
            description: 'Luxury leather handbag with gold hardware',
            price: 199.99,
            originalPrice: 249.99,
            categoryId: accessoriesCategory.id,
            brand: 'Luxury Bags',
            sku: 'SKU003',
            stockQuantity: 25,
            featured: true,
            tags: ['handbag', 'leather', 'luxury'],
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
                    alt: 'Designer Handbag',
                    isPrimary: true,
                    order: 0,
                },
            ],
        },
        {
            name: 'Comfortable Bra Set',
            description: 'Soft and comfortable bra and panty set',
            price: 39.99,
            categoryId: lingerieCategory.id,
            brand: 'Comfort Plus',
            sku: 'SKU004',
            stockQuantity: 75,
            tags: ['bra', 'comfort', 'set'],
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1594736797933-d0bd3e5ad2c8?w=500&h=500&fit=crop',
                    alt: 'Comfortable Bra Set',
                    isPrimary: true,
                    order: 0,
                },
            ],
        },
        {
            name: 'Baby Cotton Onesie',
            description: 'Soft cotton onesie for babies, available in multiple colors',
            price: 19.99,
            categoryId: babyCategory.id,
            brand: 'Baby Comfort',
            sku: 'SKU005',
            stockQuantity: 200,
            tags: ['baby', 'cotton', 'onesie'],
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&h=500&fit=crop',
                    alt: 'Baby Cotton Onesie',
                    isPrimary: true,
                    order: 0,
                },
            ],
        },
    ];
    for (const productData of products) {
        const { images, ...product } = productData;
        const createdProduct = await prisma.product.create({
            data: {
                ...product,
                price: product.price,
                originalPrice: product.originalPrice || null,
            },
        });
        for (const image of images) {
            await prisma.productImage.create({
                data: {
                    ...image,
                    productId: createdProduct.id,
                },
            });
        }
        if (createdProduct.name.includes('Dress')) {
            const sizes = ['XS', 'S', 'M', 'L', 'XL'];
            for (const size of sizes) {
                await prisma.productVariant.create({
                    data: {
                        productId: createdProduct.id,
                        name: 'Size',
                        value: size,
                        type: 'SIZE',
                        stockQuantity: 10,
                    },
                });
            }
        }
        if (createdProduct.name.includes('Bra')) {
            const sizes = ['32A', '32B', '34A', '34B', '36A', '36B'];
            for (const size of sizes) {
                await prisma.productVariant.create({
                    data: {
                        productId: createdProduct.id,
                        name: 'Size',
                        value: size,
                        type: 'SIZE',
                        stockQuantity: 5,
                    },
                });
            }
        }
        if (createdProduct.name.includes('Onesie')) {
            const sizes = ['0-3M', '3-6M', '6-12M', '12-18M'];
            for (const size of sizes) {
                await prisma.productVariant.create({
                    data: {
                        productId: createdProduct.id,
                        name: 'Size',
                        value: size,
                        type: 'SIZE',
                        stockQuantity: 20,
                    },
                });
            }
        }
    }
    console.log('✅ Sample products created');
    await prisma.coupon.create({
        data: {
            code: 'WELCOME10',
            description: '10% off for new customers',
            type: 'PERCENTAGE',
            value: 10,
            minAmount: 50,
            usageLimit: 100,
            validFrom: new Date(),
            validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
    });
    console.log('✅ Sample coupon created');
    console.log('🎉 Database seeding completed!');
    console.log('📧 Admin credentials: admin@womenstyle.com / admin123');
    console.log('📧 Customer credentials: customer@example.com / customer123');
}
main()
    .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map