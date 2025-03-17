const {Product, ProductInfo} = require('../models/models')
const ApiError = require("../error/ApiError");

class ProductController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, categoryId, info, img } = req.body;

            const product = await Product.create({ name, price, brandId, categoryId, img });

            if(info){
                info = JSON.parse(info);
                await Promise.all(
                    info.map(i =>
                        ProductInfo.create({
                            title: i.title,
                            description: i.description,
                            productId: product.id,
                        })
                    )
                );
            }

            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const deletedCount = await Product.destroy({ where: { id } });

            if (!deletedCount) {
                return next(ApiError.badRequest("Product not found"));
            }

            await ProductInfo.destroy({ where: { productId: id } });

            return res.json({ message: "Product deleted successfully" });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            let { name, price, img, brandId, categoryId, info } = req.body;

            if (!name || !price || !brandId || !categoryId || !img) {
                return next(ApiError.badRequest("All fields are required"));
            }

            if (info) {
                try {
                    info = JSON.parse(info); // Парсимо info, якщо воно є
                } catch (e) {
                    return next(ApiError.badRequest("Invalid JSON format for info"));
                }
            } else {
                info = [];
            }

            const product = await Product.findByPk(id);
            if (!product) {
                return next(ApiError.badRequest("Product not found"));
            }

            // Оновлення продукту
            await product.update({
                name,
                price,
                img,
                brandId,
                categoryId,
                info,  // Зберігаємо info після парсингу
            });

            return res.json({ message: "Product updated successfully" });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }



    async getAll(req, res){
        let {brandId, categoryId, limit, page} = req.query;
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products;
        if(!brandId && !categoryId){
            products = await Product.findAndCountAll({limit, offset})
        }
        if( brandId && !categoryId ){
            products = await Product.findAndCountAll({where: {brandId}, limit, offset});
        }
        if (!brandId && categoryId ){
            products = await Product.findAndCountAll({where: {categoryId}, limit, offset});
        }
        if (brandId && categoryId ){
            products = await Product.findAndCountAll({where: {brandId, categoryId}, limit, offset});
        }
        return res.json(products);
    }

    async getOne(req, res){
        const {id} = req.params;
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info'}],
            },
        )
        return res.json(product)
    }
}

module.exports = new ProductController();