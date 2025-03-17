import { makeAutoObservable } from "mobx";

export default class ProductStore {
    constructor() {
        this._categories = [];
        this._brands = [];
        this._products = [];
        this._selectedCategory = null;
        this._selectedBrand = null;
        this._selectedProduct = null;

        this._modalSelectedCategory = null;
        this._modalSelectedBrand = null;

        makeAutoObservable(this);
    }

    setCategories(categories) {
        this._categories = categories;
    }

    setBrands(brands) {
        this._brands = brands;
    }

    setProducts(products) {
        this._products = products;
    }

    setSelectedProduct(product) {
        this._selectedProduct = product;
    }

    setSelectedCategory(category) {
        this._selectedCategory = category;
    }

    setSelectedBrand(brand) {
        this._selectedBrand = brand;
    }

    setModalSelectedCategory(category) {
        this._modalSelectedCategory = category;
    }

    setModalSelectedBrand(brand) {
        this._modalSelectedBrand = brand;
    }

    get categories() {
        return this._categories;
    }

    get brands() {
        return this._brands;
    }

    get products() {
        return this._products;
    }

    get selectedBrand() {
        return this._selectedBrand;
    }

    get selectedCategory() {
        return this._selectedCategory;
    }

    get selectedProducts() {
        return this._selectedProduct;
    }

    get selectedProduct() {
        let filteredProducts = this._products;

        if (this._selectedCategory) {
            filteredProducts = filteredProducts.filter(prod => prod.categoryId === this._selectedCategory.id);
        }

        if (this._selectedBrand) {
            filteredProducts = filteredProducts.filter(prod => prod.brandId === this._selectedBrand.id);
        }

        return filteredProducts;
    }

    get modalSelectedCategory() {
        return this._modalSelectedCategory;
    }

    get modalSelectedBrand() {
        return this._modalSelectedBrand;
    }
}
