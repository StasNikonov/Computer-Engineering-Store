const {Brand, Category, Product, ProductInfo} = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res){
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const deletedCount = await Brand.destroy({ where: { id } });

            if (!deletedCount) {
                return next(ApiError.badRequest("Product not found"));
            }

            return res.json({ message: "Brand deleted successfully" });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res){
        const brands = await Brand.findAll()
        return res.json(brands)
    }
}

module.exports = new BrandController();