const {Category, Brand} = require('../models/models');
const ApiError = require('../error/ApiError');

class CategoryController {
    async create(req, res){
        const {name} = req.body
        const category = await Category.create({name})
        return res.json(category)
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const deletedCount = await Category.destroy({ where: { id } });

            if (!deletedCount) {
                return next(ApiError.badRequest("Category not found"));
            }

            return res.json({ message: "Category deleted successfully" });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res){
        const categories = await Category.findAll()
        return res.json(categories)
    }
}

module.exports = new CategoryController();