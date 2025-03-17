import React, { useState } from 'react';
import './modal.scss';
import { createCategory } from '../../http/productAPI';

export const CreateCategory = ({ show, onHide }) => {
    const [value, setValue] = useState('');

    const addCategory = () => {
        createCategory({ name: value }).then(() => {
            setValue('');
            onHide();
        });
    };

    return (
        <div className={`modalOverlay ${show ? 'show' : ''}`}>
            <div className="modalContainer">
                <div className="modalHeader">
                    <h2 className="modalTitle">Create Category</h2>
                    <button className="closeButton" onClick={onHide}>
                        &times;
                    </button>
                </div>
                <div className="modalBody">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Category name"
                        className="inputField"
                    />
                </div>
                <div className="modalFooter">
                    <button className="buttonDanger" onClick={onHide}>
                        Cancel
                    </button>
                    <button className="buttonSuccess" onClick={addCategory}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};
