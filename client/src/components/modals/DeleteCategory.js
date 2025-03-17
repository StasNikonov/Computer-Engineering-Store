import React, { useState, useEffect, useContext } from 'react';
import { deleteCategory, fetchCategory } from "../../http/productAPI";  // Імпортуємо функції для роботи з категоріями
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import './modal.scss';

export const DeleteCategory = observer(({ show, onHide, categoryId }) => {
    const { product } = useContext(Context);
    const [categoryDetails, setCategoryDetails] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Завантажуємо категорії
    useEffect(() => {
        fetchCategory().then(data => product.setCategories(data)); // Оновлюємо список категорій
    }, []);

    // Якщо categoryId змінюється, оновлюємо інформацію про категорію
    useEffect(() => {
        if (categoryId) {
            const foundCategory = product.categories.find(c => c.id === categoryId);
            setCategoryDetails(foundCategory);
        }
    }, [categoryId, product.categories]);

    // Видалення категорії
    const removeCategory = () => {
        if (!product.modalSelectedCategory) {
            console.error("No category selected for deletion.");
            return;
        }

        deleteCategory(product.modalSelectedCategory.id).then(() => {
            onHide();
            fetchCategory().then(data => product.setCategories(data)); // Оновлюємо категорії після видалення
            product.setSelectedCategory(null);
        }).catch(error => {
            console.error("Error deleting category:", error);
        });
    };

    const handleOverlayClick = (e) => {
        // Переконатися, що клік відбувається тільки по зовнішньому фону
        if (e.target === e.currentTarget) {
            onHide();
        }
    };

    return (
        <div className={`modalOverlay ${show ? 'show' : ''}`} onClick={handleOverlayClick}>
            <div className="modalContainer" onClick={e => e.stopPropagation()}>
                <div className="modalHeader">
                    <h2>Delete Category</h2>
                    <button className="closeButton" onClick={onHide}>&times;</button>
                </div>
                <div className="modalBody">
                    <div className="dropdownContainer">
                        <button
                            className="dropdownButton"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {product.modalSelectedCategory?.name || "Choose category"}
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdownMenu">
                                {product.categories && product.categories.length > 0 ? (
                                    product.categories.map(cat => (
                                        <div
                                            className="dropdownItem"
                                            onClick={() => {
                                                product.setModalSelectedCategory(cat);
                                                setIsDropdownOpen(false);
                                            }}
                                            key={cat.id}
                                        >
                                            {cat.name}
                                        </div>
                                    ))
                                ) : (
                                    <p>No categories available</p>
                                )}
                            </div>
                        )}
                    </div>
                    {categoryDetails && (
                        <div className="mt-3">
                            <p><strong>Category to delete:</strong> {categoryDetails.name}</p>
                        </div>
                    )}
                </div>
                <div className="modalFooter">
                    <button className="buttonDanger" onClick={onHide}>
                        Cancel
                    </button>
                    <button className="buttonSuccess" onClick={removeCategory}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
});
