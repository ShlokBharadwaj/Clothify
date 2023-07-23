import React from 'react';

const Products = () => {
    // TODO: Fetch data from products array with image URLs and descriptions
    const products = [
        { imageUrl: 'http://localhost:8000/products/img1.png', description: 'Yellow Winter Coat' },
        { imageUrl: 'http://localhost:8000/products/img2.png', description: 'Blue Denim Jeans' },
        { imageUrl: 'http://localhost:8000/products/img3.png', description: 'Gray Business Suit' },
        { imageUrl: 'http://localhost:8000/products/img4.png', description: 'White Shirt' },
        { imageUrl: 'http://localhost:8000/products/img5.png', description: 'Blue Crop Top' },
        { imageUrl: 'http://localhost:8000/products/img6.png', description: 'Green T-Shirt' },
        { imageUrl: 'http://localhost:8000/products/img7.png', description: 'Red Skirt' },
        { imageUrl: 'http://localhost:8000/products/img8.png', description: 'Red&White Checked Shirt' },
        { imageUrl: 'http://localhost:8000/products/img9.png', description: 'White Tuxedo' },
    ];

    return (
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 mt-8">
            {products.map((product, index) => (
                <div key={index} className="border border-gray-300 p-4 rounded-lg cursor-pointer">
                    <img src={product.imageUrl} alt={product.description} className="w-full h-64 sm:object-contain  object-cover mb-2 rounded-lg" />
                    <p className="text-gray-800 text-sm text-center font-semibold">{product.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Products;
