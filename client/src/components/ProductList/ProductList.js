import React, { useContext } from 'react';
import { Context } from "../../index";
import { ProductItem } from "../ProductItem/ProductItem";
import { observer } from "mobx-react-lite";
import './ProductList.scss';

export const ProductList = observer(() => {
    const { product } = useContext(Context);

    const productsToDisplay = product.selectedProduct;

    if (!productsToDisplay || productsToDisplay.length === 0) {
        return <p className="noProducts">No products available</p>;
    }

    return (
        <div className="productList">
            {productsToDisplay.map(product =>
                <ProductItem key={product.id} product={product} />
            )}
        </div>
    );
});
