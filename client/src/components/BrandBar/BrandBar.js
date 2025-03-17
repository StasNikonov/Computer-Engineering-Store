import React, { useContext } from 'react';
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import './BrandBar.scss';

export const BrandBar = observer(() => {
    const { product } = useContext(Context);

    const sortedBrands = [...product.brands].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="brandBar">
            <div
                className={`brandCard ${!product.selectedBrand ? 'active' : ''}`}
                onClick={() => product.setSelectedBrand(null)}
            >
                All Brands
            </div>
            {sortedBrands.map(brand => (
                <div
                    className={`brandCard ${product.selectedBrand && brand.id === product.selectedBrand.id ? 'active' : ''}`}
                    onClick={() => product.setSelectedBrand(brand)}
                    key={brand.id}
                >
                    {brand.name}
                </div>
            ))}
        </div>
    );
});
