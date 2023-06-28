const database = require("../db/Database");

exports.getCategoriesByUserId = (req, res) => {
    const userId = req.params.userId;
    const categoriesLimit = parseInt(req.query.limit);
    const pageIndex = parseInt(req.query.page);
    const offset = (pageIndex - 1) * categoriesLimit;


    const query = "SELECT categories.category_id, categories.category_name FROM categories " + "\n" +
                   "WHERE user_id = ? LIMIT ? OFFSET ?;"
    database.query(query, [userId, categoriesLimit, offset], (result) => res.json(result));
}

exports.getCategoriesCountByUserId = (req, res) => {
     const userId = req.params.userId;

     const query = "SELECT COUNT(*) AS total_categories FROM categories WHERE user_id = ?;"
     database.query(query, [userId], (result) => res.json(result[0].total_categories));

}

exports.addCategory = (req, res) => {
    const categoryName = req.body.categoryName;
    const userId = req.body.userId;

    const queryInsert = "INSERT INTO categories (user_id, category_name) VALUES (?, ?);";

    database.query(queryInsert, [userId, categoryName], (result) => {

        const querySelect = "SELECT * FROM categories WHERE category_name = ? AND user_id = ?";

        database.query(querySelect, [categoryName, userId], (resultSelect) => res.json(resultSelect));
    });
}

exports.deleteCategory = (req, res) => {
    const categoryId = req.params.categoryId;
    const query = "DELETE FROM categories WHERE category_id = ?";
    database.query(query, [categoryId], (result) => res.send(`Delete category with ID ${categoryId}`));
}

exports.editCategory =  (req, res) => {
    const newCategoryName = req.body.categoryName;
    const categoryId = req.body.categoryId;

    const query = "UPDATE categories SET category_name = ? WHERE category_id = ?";
    database.query(query, [newCategoryName, categoryId], (result) => res.send(`Update category_name where ID ${categoryId}`));
}
