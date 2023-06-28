const database = require("../db/Database");

exports.getUserPreferencesByCategoryId = (req, res) => {
        const categoryId = req.params.categoryId;

        const query = "SELECT users_categories_preferences.*, tags.tag_description FROM users_categories_preferences " + "\n" +
                       "JOIN tags on users_categories_preferences.tag_id = tags.tag_id WHERE category_id = ?;"

        database.query(query, [categoryId], (result) => {
        if (result.length === 0) {
          res.json(null);
          return;
        }
        const preferences = {
          category_id: result[0].category_id,
          tagWeights: [],
        };

        result.forEach((row) => {
          const tagId = row.tag_id;
          const tagDescription = row.tag_description;
          const weight = row.weight;

          const tagWeight = {
          tag_id: tagId,
          tag_description: tagDescription,
          weight: weight
          }

          preferences.tagWeights.push(tagWeight);
        });

        res.json(preferences);
    });
}

exports.addUserPreference = (req, res) => {
  const categoryId = req.body.categoryId;
  const tagId = req.body.tagId;
  const weight = req.body.weight;

  const query = "INSERT INTO users_categories_preferences (category_id, tag_id, weight) VALUES (?, ?, ?);";
  database.query(query, [categoryId, tagId, weight], (result) =>res.send(`Insert user_preferences with weight ${weight}`));
}


exports.deleteUserPreference = (req, res) => {
  const categoryId = req.params.categoryId;
  const tagId = req.params.tagId;

  const query = "DELETE FROM users_categories_preferences WHERE category_id = ? AND tag_id = ?";
  database.query(query, [categoryId, tagId], (result) => res.send(`Delete user preference with tag with ID ${tagId} and category with ID ${categoryId}`));
}
