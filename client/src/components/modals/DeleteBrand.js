import React, { useState, useEffect, useContext } from 'react';
import { deleteBrand, fetchBrands } from "../../http/productAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";

export const DeleteBrand = observer(({ show, onHide, brandId }) => {
    const { product } = useContext(Context);
    const [brandDetails, setBrandDetails] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        fetchBrands().then(data => product.setBrands(data));
    }, []);

    useEffect(() => {
        if (brandId) {
            const foundBrand = product.brands.find(b => b.id === brandId);
            setBrandDetails(foundBrand);
        }
    }, [brandId, product.brands]);

    const removeBrand = () => {
        if (!product.modalSelectedBrand) {
            console.error("No brand selected for deletion.");
            return;
        }

        deleteBrand(product.modalSelectedBrand.id).then(() => {
            onHide();
            fetchBrands().then(data => product.setBrands(data));
            product.setSelectedBrand(null);
        }).catch(error => {
            console.error("Error deleting brand:", error);
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
                    <h2>Delete Brand</h2>
                    <button className="closeButton" onClick={onHide}>&times;</button>
                </div>
                <div className="modalBody">
                    <div className="dropdownContainer">
                        <button
                            className="dropdownButton"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {product.modalSelectedBrand?.name || "Choose brand"}
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdownMenu">
                                {product.brands && product.brands.length > 0 ? (
                                    product.brands.map(br => (
                                        <div
                                            className="dropdownItem"
                                            onClick={() => {
                                                product.setModalSelectedBrand(br);
                                                setIsDropdownOpen(false);
                                            }}
                                            key={br.id}
                                        >
                                            {br.name}
                                        </div>
                                    ))
                                ) : (
                                    <p>No brands available</p>
                                )}
                            </div>
                        )}
                    </div>
                    {brandDetails && (
                        <div className="mt-3">
                            <p><strong>Brand to delete:</strong> {brandDetails.name}</p>
                        </div>
                    )}
                </div>
                <div className="modalFooter">
                    <button className="buttonDanger" onClick={onHide}>
                        Cancel
                    </button>
                    <button className="buttonSuccess" onClick={removeBrand}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
});
