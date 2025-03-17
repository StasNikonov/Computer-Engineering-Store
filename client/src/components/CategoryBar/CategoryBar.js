import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import './CategoryBar.scss';

export const CategoryBar = observer(() => {
    const { product } = useContext(Context);

    if (!product.categories || product.categories.length === 0) {
        return <div className="no-categories">No categories available</div>;
    }

    const sortedCategories = [...product.categories].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="categoryBar">
            <div
                className={`categoryItem ${!product.selectedCategory ? 'active' : ''}`}
                onClick={() => product.setSelectedCategory(null)}
            >
                All categories
            </div>
            {sortedCategories.map(category => (
                <div
                    className={`categoryItem ${category.id === product.selectedCategory?.id ? 'active' : ''}`}
                    onClick={() => product.setSelectedCategory(category)}
                    key={category.id}
                >
                    {category.name}
                </div>
            ))}
        </div>
    );
});
