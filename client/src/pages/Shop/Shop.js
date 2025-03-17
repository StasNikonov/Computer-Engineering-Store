import React, { useContext, useEffect } from 'react';
import { CategoryBar } from "../../components/CategoryBar/CategoryBar";
import { BrandBar } from "../../components/BrandBar/BrandBar";
import { ProductList } from "../../components/ProductList/ProductList";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { fetchBrands, fetchCategory, fetchProducts } from "../../http/productAPI";
import './Shop.scss';

export const Shop = observer(() => {
    const { product } = useContext(Context);

    useEffect(() => {
        fetchCategory().then(data => product.setCategories(data));
        fetchBrands().then(data => product.setBrands(data));
        fetchProducts().then(data => product.setProducts(data.rows));
    }, []);

    return (
        <div className="shopContainer">
            <div className="sidebar">
                <CategoryBar />
            </div>
            <div className="mainContent">
                <BrandBar />
                <ProductList />
            </div>
        </div>
    );
});
