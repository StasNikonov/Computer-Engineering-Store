import React, { useState } from 'react';
import { CreateCategory } from "../../components/modals/CreateCategory";
import { CreateBrand } from "../../components/modals/CreateBrand";
import { CreateProduct } from "../../components/modals/CreateProduct";
import { DeleteProduct } from "../../components/modals/DeleteProduct";
import { DeleteBrand } from "../../components/modals/DeleteBrand";
import { DeleteCategory } from "../../components/modals/DeleteCategory";
import { UpdateProduct } from "../../components/modals/UpdateProduct";
import './Admin.scss';

export const Admin = () => {
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [productVisible, setProductVisible] = useState(false);
    const [productDeleteVisible, setProductDeleteVisible] = useState(false);
    const [brandDeleteVisible, setBrandDeleteVisible] = useState(false);
    const [categoryDeleteVisible, setCategoryDeleteVisible] = useState(false);
    const [productUpdateVisible, setProductUpdateVisible] = useState(false);

    return (
        <div className="adminСontainer">

            <div className="buttonsCreateContainer">
                <div className="createTitle">Create</div>
                <button
                    className="adminCreateButton"
                    onClick={() => setProductVisible(true)}
                >
                    Create product
                </button>
                <button
                    className="adminCreateButton"
                    onClick={() => setCategoryVisible(true)}
                >
                    Create category
                </button>
                <button
                    className="adminCreateButton"
                    onClick={() => setBrandVisible(true)}
                >
                    Create brand
                </button>
            </div>

            <div className="buttonsDeleteContainer">
                <div className="deleteTitle">Delete</div>
                <button
                    className="adminDeleteButton"
                    onClick={() => setProductDeleteVisible(true)}
                >
                    Delete product
                </button>
                <button
                    className="adminDeleteButton"
                    onClick={() => setCategoryDeleteVisible(true)}
                >
                    Delete category
                </button>
                <button
                    className="adminDeleteButton"
                    onClick={() => setBrandDeleteVisible(true)}
                >
                    Delete brand
                </button>
            </div>

            <div className="buttonsUpdateContainer">
                <div className="updateTitle">Update</div>
                <button
                    className="adminUpdateButton"
                    onClick={() => setProductUpdateVisible(true)}
                >
                    Update product
                </button>
            </div>


            <CreateCategory show={categoryVisible} onHide={() => setCategoryVisible(false)} />
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)} />
            <DeleteProduct show={productDeleteVisible} onHide={() => setProductDeleteVisible(false)} />
            <DeleteBrand show={brandDeleteVisible} onHide={() => setBrandDeleteVisible(false)} />
            <DeleteCategory show={categoryDeleteVisible} onHide={() => setCategoryDeleteVisible(false)} />
            <UpdateProduct show={productUpdateVisible} onHide={() => setProductUpdateVisible(false)} />
        </div>
    );
};
