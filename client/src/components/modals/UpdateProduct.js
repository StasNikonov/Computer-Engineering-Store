import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../index";
import { fetchBrands, fetchCategory, fetchProductsForUpdate, updateProduct } from "../../http/productAPI";
import { observer } from "mobx-react-lite";
import './modal.scss'; // Імпортуємо ваші стилі

export const UpdateProduct = observer(({ show, onHide }) => {
    const { product } = useContext(Context);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isProductsVisible, setIsProductsVisible] = useState(false);
    const [isCategoryVisible, setIsCategoryVisible] = useState(false);  // Visibility for category dropdown
    const [isBrandVisible, setIsBrandVisible] = useState(false);  // Visibility for brand dropdown
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState('');
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchProductsForUpdate().then(data => setProducts(data));
        fetchCategory().then(data => product.setModalSelectedCategory(data));
        fetchBrands().then(data => product.setModalSelectedBrand(data));
    }, []);

    const selectProduct = (productData) => {
        setSelectedProduct(productData);
        setName(productData.name);
        setPrice(productData.price);
        setImg(productData.img);
        setInfo(productData.info ? JSON.parse(productData.info) : []);

        const category = product.categories.find(c => c.id === productData.categoryId);
        const brand = product.brands.find(b => b.id === productData.brandId);

        setSelectedCategory(category ? { id: category.id, name: category.name } : null);
        setSelectedBrand(brand ? { id: brand.id, name: brand.name } : null);
    };

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]);
    };

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
    };

    const updateProductData = () => {
        const updatedData = {
            id: selectedProduct.id,
            name: name,
            price: price,
            img: img,
            brandId: selectedBrand?.id,
            categoryId: selectedCategory?.id,
            info: JSON.stringify(info),
        };

        updateProduct(selectedProduct.id, updatedData)
            .then(() => {
                onHide();
                setSelectedProduct(null);
            })
            .catch(error => console.error("Error updating product:", error));
    };

    return (
        <div className={`modalOverlay ${show ? 'show' : ''}`} onClick={(e) => e.target === e.currentTarget && onHide()}>
            <div className="modalContainer" onClick={e => e.stopPropagation()}>
                <div className="modalHeader">
                    <h2>Update Product</h2>
                    <button className="closeButton" onClick={onHide}>&times;</button>
                </div>
                <div className="modalBody">
                    {!selectedProduct ? (
                        <div className="dropdownContainer">
                            <button
                                className="dropdownButton"
                                onClick={() => setIsProductsVisible(!isProductsVisible)}  // Toggle product visibility
                            >
                                Choose Product
                            </button>
                            {isProductsVisible && (
                                <div className="dropdownMenu">
                                    {products.map(p => (
                                        <div
                                            className="dropdownItem"
                                            key={p.id}
                                            onClick={() => selectProduct(p)}
                                        >
                                            {p.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <form>
                            {/* Category Dropdown */}
                            <div className="dropdownContainer">
                                <button
                                    className="dropdownButton"
                                    onClick={(e) => {
                                        e.preventDefault();  // Запобігає перезавантаженню сторінки
                                        setIsCategoryVisible(!isCategoryVisible);  // Перемикає видимість меню
                                    }}
                                >
                                    {selectedCategory?.name || "Choose Category"}
                                </button>
                                {isCategoryVisible && (
                                    <div className="dropdownMenu">
                                        {product.categories.map(category => (
                                            <div
                                                className="dropdownItem"
                                                key={category.id}
                                                onClick={() => {
                                                    setSelectedCategory(category);  // Вибір категорії
                                                    setIsCategoryVisible(false);  // Закриття меню після вибору
                                                }}
                                            >
                                                {category.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="dropdownContainer">
                                <button
                                    className="dropdownButton"
                                    onClick={(e) => {
                                        e.preventDefault();  // Запобігає перезавантаженню сторінки
                                        setIsBrandVisible(!isBrandVisible);  // Перемикає видимість меню
                                    }}
                                >
                                    {selectedBrand?.name || "Choose Brand"}
                                </button>
                                {isBrandVisible && (
                                    <div className="dropdownMenu">
                                        {product.brands.map(brand => (
                                            <div
                                                className="dropdownItem"
                                                key={brand.id}
                                                onClick={() => {
                                                    setSelectedBrand(brand);  // Вибір бренду
                                                    setIsBrandVisible(false);  // Закриття меню після вибору
                                                }}
                                            >
                                                {brand.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="inputField"
                                placeholder="Name product"
                            />
                            <input
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                                className="inputField"
                                placeholder="Price product"
                            />
                            <input
                                value={img}
                                onChange={e => setImg(e.target.value)}
                                className="inputField"
                                placeholder="URL image"
                            />

                            <hr/>
                        </form>
                    )}
                </div>
                <div className="modalFooter">
                    <button className="buttonDanger" onClick={onHide}>Close</button>
                    {selectedProduct && (
                        <button className="buttonSuccess" onClick={updateProductData}>Update</button>
                    )}
                </div>
            </div>
        </div>
    );
});
