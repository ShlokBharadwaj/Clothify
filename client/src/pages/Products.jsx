import React, { useState } from 'react';

const Products = ({ setSelectedProduct }) => {

    const chooseImage = (product) => {
        setSelectedProduct(product);
    };

    const products = [
        { imageUrl: 'https://res.cloudinary.com/dhpintvvt/image/upload/v1690310722/Persist-Ventures/products/img8_atrttb.png', description: 'Yellow Winter Coat' },
        { imageUrl: 'https://res.cloudinary.com/dhpintvvt/image/upload/v1690310727/Persist-Ventures/products/img2_jfwvsu.png', description: 'Blue Denim Jeans' },
        { imageUrl: 'https://res.cloudinary.com/dhpintvvt/image/upload/v1690310723/Persist-Ventures/products/img3_ajoo6n.png', description: 'Gray Business Suit' },
        { imageUrl: 'https://res.cloudinary.com/dhpintvvt/image/upload/v1690310721/Persist-Ventures/products/img9_pmcb8a.png', description: 'White Shirt' },
        { imageUrl: 'https://res.cloudinary.com/dhpintvvt/image/upload/v1690310715/Persist-Ventures/products/img4_a2ztbp.png', description: 'Green T-Shirt' },
        { imageUrl: 'https://res.cloudinary.com/dhpintvvt/image/upload/v1690310716/Persist-Ventures/products/img5_kku1x8.png', description: 'Red Skirt' },
        { imageUrl: 'https://res.cloudinary.com/dhpintvvt/image/upload/v1690310717/Persist-Ventures/products/img6_eav1nc.png', description: 'Red&White Checked Shirt' },
        { imageUrl: 'https://res.cloudinary.com/dhpintvvt/image/upload/v1690310724/Persist-Ventures/products/img1_hkldan.png', description: 'Blue Crop Top' },
        { imageUrl: 'https://res.cloudinary.com/dhpintvvt/image/upload/v1690310722/Persist-Ventures/products/img7_gdlddq.png', description: 'White Tuxedo' },
    ];


    return (
        <div>
            <h1 className='font-extrabold text-[#343a40] text-[32px] mt-10 mx-auto max-w-7xl'>
                Products
            </h1>
            <p className='mt-4 text-[#6c757d] text-[16px] max-w-[500px]'>
                Explore our diverse collection of stylish clothing products, offering a wide variety of options to suit your unique style and preferences.
            </p>

            <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 mt-8">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 p-4 rounded-lg cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                    >
                        <img
                            src={product.imageUrl}
                            alt={product.description}
                            className="w-full h-64 sm:object-contain object-cover mb-2 rounded-lg"
                        />
                        <p className="text-gray-800 text-sm text-center font-semibold">{product.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
