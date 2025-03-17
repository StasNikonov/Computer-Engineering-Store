import React, { useContext, useEffect, useState } from 'react';
import './modal.scss';
import { Context } from '../../index';
import { createProduct, fetchBrands, fetchCategory } from '../../http/productAPI';
import { observer } from 'mobx-react-lite';

export const CreateProduct = observer(({ show, onHide }) => {
    const { product } = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState('');
    const [info, setInfo] = useState([]);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isBrandOpen, setIsBrandOpen] = useState(false);

    useEffect(() => {
        fetchCategory().then(data => product.setModalSelectedCategory(data));
        fetchBrands().then(data => product.setModalSelectedBrand(data));
    }, []);

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]);
    };

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => (i.number === number ? { ...i, [key]: value } : i)));
    };

    const addProduct = () => {
        const productData = {
            name,
            price,
            img,
            brandId: product.modalSelectedBrand?.id,
            categoryId: product.modalSelectedCategory?.id,
            info: JSON.stringify(info),
        };

        createProduct(productData)
            .then(() => onHide())
            .catch(error => console.error('Error creating product:', error));
    };

    const toggleCategoryDropdown = () => setIsCategoryOpen(!isCategoryOpen);
    const toggleBrandDropdown = () => setIsBrandOpen(!isBrandOpen);

    const handleCategorySelect = (category) => {
        product.setModalSelectedCategory(category);
        setIsCategoryOpen(false);
    };

    const handleBrandSelect = (brand) => {
        product.setModalSelectedBrand(brand);
        setIsBrandOpen(false);
    };

    if (!show) return null;

    return (
        <div className={`modalOverlay ${show ? 'show' : ''}`}> {/* Відображення модалки залежно від show */}
            <div className="modalContainer">
                <div className="modalHeader">
                    <h2 className="modalTitle">Add Product</h2>
                    <button className="closeButton" onClick={onHide}>&times;</button>
                </div>
                <div className="modalBody">
                    {/* Вибір категорії */}
                    <div className="dropdownContainer">
                        <button
                            className="dropdownButton"
                            onClick={toggleCategoryDropdown}
                        >
                            {product.modalSelectedCategory?.name || 'Choose Category'}
                        </button>
                        {isCategoryOpen && (
                            <div className="dropdownMenu">
                                {product.categories.map(category => (
                                    <div
                                        className="dropdownItem"
                                        key={category.id}
                                        onClick={() => handleCategorySelect(category)}
                                    >
                                        {category.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Вибір бренду */}
                    <div className="dropdownContainer">
                        <button
                            className="dropdownButton"
                            onClick={toggleBrandDropdown}
                        >
                            {product.modalSelectedBrand?.name || 'Choose Brand'}
                        </button>
                        {isBrandOpen && (
                            <div className="dropdownMenu">
                                {product.brands.map(brand => (
                                    <div
                                        className="dropdownItem"
                                        key={brand.id}
                                        onClick={() => handleBrandSelect(brand)}
                                    >
                                        {brand.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Поля для введення даних продукту */}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Product Name"
                        className="inputField"
                    />
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        placeholder="Product Price"
                        className="inputField"
                    />
                    <input
                        type="text"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        placeholder="Image URL"
                        className="inputField"
                    />

                    {/* Додавання властивостей продукту */}
                    <button className="buttonOutline" onClick={addInfo}>
                        Add Property
                    </button>
                    {info.map(i => (
                        <div key={i.number} className="propertyRow">
                            <input
                                type="text"
                                value={i.title}
                                onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                placeholder="Property Name"
                                className="inputFieldSmall"
                            />
                            <input
                                type="text"
                                value={i.description}
                                onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                placeholder="Description"
                                className="inputFieldSmall"
                            />
                            <button
                                className="buttonDangerSmall"
                                onClick={() => removeInfo(i.number)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <div className="modalFooter">
                    <button className="buttonDanger" onClick={onHide}>
                        Cancel
                    </button>
                    <button className="buttonSuccess" onClick={addProduct}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
});
