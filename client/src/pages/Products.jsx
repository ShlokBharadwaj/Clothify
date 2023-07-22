import React from 'react';

const Products = () => {
    // TODO: Fetch data from products array with image URLs and descriptions
    const products = [
        { imageUrl: '/path/to/image1.jpg', description: 'Product 1' },
        { imageUrl: '/path/to/image2.jpg', description: 'Product 2' },
        { imageUrl: '/path/to/image3.jpg', description: 'Product 3' },
        { imageUrl: '/path/to/image4.jpg', description: 'Product 4' },
        { imageUrl: '/path/to/image5.jpg', description: 'Product 5' },
        { imageUrl: '/path/to/image6.jpg', description: 'Product 6' },
    ];

    return (
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 mt-8">
            {products.map((product, index) => (
                <div key={index} className="border border-gray-300 p-4 rounded-lg">
                    <img src={product.imageUrl} alt={product.description} className="w-full h-64 object-cover mb-2 rounded-lg" />
                    <p className="text-gray-800 text-sm">{product.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Products;
