import React, { useState } from 'react';
import './modal.scss'; // Ваші стилі
import { createBrand } from '../../http/productAPI';

export const CreateBrand = ({ show, onHide }) => {
    const [value, setValue] = useState('');

    const addBrand = () => {
        createBrand({ name: value }).then(() => {
            setValue('');
            onHide();
        });
    };

    return (
        <div className={`modalOverlay ${show ? 'show' : ''}`}>
            <div className="modalContainer">
                <div className="modalHeader">
                    <h2 className="modalTitle">Create Brand</h2>
                    <button className="closeButton" onClick={onHide}>
                        &times;
                    </button>
                </div>
                <div className="modalBody">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Brand name"
                        className="inputField"
                    />
                </div>
                <div className="modalFooter">
                    <button className="buttonDanger" onClick={onHide}>
                        Cancel
                    </button>
                    <button className="buttonSuccess" onClick={addBrand}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};
