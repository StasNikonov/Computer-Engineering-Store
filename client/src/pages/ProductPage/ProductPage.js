import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { fetchOneProduct } from "../../http/productAPI";
import './ProductPage.scss';

export const ProductPage = () => {
    const [product, setProduct] = useState({ info: [] });
    const { id } = useParams();

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data));
    }, [id]);

    return (
        <div className="productPage">
            <div className="productRow">
                <div className="productImageContainer">
                    <img className="productImage" src={product.img} alt={product.name}/>
                    <h3>Від {product.price} грн</h3>
                </div>
                <div className="productColumn">
                    <h1 className="productName">{product.name}</h1>
                    <div className="productCharacteristics">
                        <h1 className="characteristicsTitle">Characteristics</h1>
                        {product.info.map((info) => (
                            <div
                                key={info.id}
                                className="characteristicItems"
                            >
                                {info.title}: {info.description}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
