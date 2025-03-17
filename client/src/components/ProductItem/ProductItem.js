import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../utils/consts";
import { fetchBrands } from "../../http/productAPI";
import './ProductItem.scss';

export const ProductItem = ({ product }) => {
    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllBrands = async () => {
            try {
                const brandData = await fetchBrands();
                setBrands(brandData);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };

        fetchAllBrands();
    }, []);

    useEffect(() => {
        if (brands.length > 0) {
            const foundBrand = brands.find(b => b.id === product.brandId);
            setBrand(foundBrand);
        }
    }, [brands, product.brandId]);

    return (
        <div className="productItem" onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>
            <div className="productCard">
                <img className="productImage" src={product.img} alt={product.name} />
                <div className="productDetails">
                    <div className="productBrand">
                        {brand ? brand.name : 'Loading brand...'}
                    </div>
                </div>
                <div className="productName">{product.name}</div>
            </div>
        </div>
    );
};
