import React, { useState, useEffect, useContext } from 'react';
import { deleteProduct, fetchProducts } from "../../http/productAPI";
import { Context } from "../../index";
import './modal.scss';  // Імпортуємо стилі

export const DeleteProduct = ({ show, onHide }) => {
    const { product } = useContext(Context);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Завантаження продуктів при завантаженні компонента
    useEffect(() => {
        fetchProducts().then(data => product.setProducts(data.rows || []));
    }, []);

    // Видалення продукту
    const removeProduct = () => {
        if (!product.selectedProducts) {
            alert("Please select a product to delete.");
            return;
        }

        deleteProduct(product.selectedProducts.id)
            .then(() => {
                onHide();
                fetchProducts().then(data => product.setProducts(data.rows || []));
                product.setSelectedProduct(null);
            })
            .catch(error => {
                console.error("Error deleting product:", error);
            });
    };

    // Обробка натискання по зовнішньому фону для закриття модального вікна
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onHide();
        }
    };

    return (
        <div className={`modalOverlay ${show ? 'show' : ''}`} onClick={handleOverlayClick}>
            <div className="modalContainer" onClick={e => e.stopPropagation()}>
                <div className="modalHeader">
                    <h2>Delete Product</h2>
                    <button className="closeButton" onClick={onHide}>&times;</button>
                </div>
                <div className="modalBody">
                    <div className="dropdownContainer">
                        <button
                            className="dropdownButton"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {product.selectedProducts?.name || "Choose Product"}
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdownMenu">
                                {Array.isArray(product.products) ? (
                                    product.products.map(prod => (
                                        <div
                                            className="dropdownItem"
                                            onClick={() => {
                                                product.setSelectedProduct(prod);
                                                setIsDropdownOpen(false);
                                            }}
                                            key={prod.id}
                                        >
                                            {prod.name}
                                        </div>
                                    ))
                                ) : (
                                    <p>No products available</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="modalFooter">
                    <button className="buttonDanger" onClick={onHide}>Close</button>
                    <button className="buttonSuccess" onClick={removeProduct}>Delete</button>
                </div>
            </div>
        </div>
    );
};
