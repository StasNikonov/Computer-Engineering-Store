import {$authHost, $host} from "./index";

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', category)
    return data
}

export const deleteCategory = async (id) => {
    const {data} = await $authHost.delete(`api/category/${id}`)
    return data
}

export const fetchCategory = async () => {
    const {data} = await $host.get('api/category')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const deleteBrand = async (id) => {
    const {data} = await $authHost.delete(`api/brand/${id}`)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product)
    return data
}

export const deleteProduct = async (id) => {
    const {data} = await $authHost.delete(`api/product/${id}`)
    return data
}

export const updateProduct = async (id, updatedData) => {
    const { data } = await $authHost.put(`api/product/${id}`, updatedData);
    return data;
};

export const fetchProducts = async (limit, categoryId, brandId, page) => {
    const {data} = await $host.get('api/product', {params: {
            categoryId, brandId, page, limit
        }})
    return data
}

export const fetchProductsForUpdate = async (limit, categoryId, brandId, page) => {
    const { data } = await $host.get('api/product', {
        params: { categoryId, brandId, page, limit }
    });
    return data.rows || [];
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}