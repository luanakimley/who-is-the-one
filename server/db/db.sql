/*
	****************** VOTING SYSTEM *******************
*/


/*-----------------------------------------------------------------CREATES-------------------------------------------------------------------------------------*/

/*CREATES the politician system database*/
CREATE DATABASE IF NOT EXISTS voting_system DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE voting_system;

/*DROPS any of the tables that may already exists*/
DROP TABLE IF EXISTS users_categories_preferences, tags_in_candidates, tags, candidates_in_categories, categories, candidates, users;

/*CREATE users table*/
CREATE TABLE users
(
  user_id VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE (email)
);

/*CREATE candidates table*/
CREATE TABLE candidates
(
  candidate_id INT NOT NULL,
  candidate_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (candidate_id)
);

/*CREATE categories table*/
CREATE TABLE categories
(
  category_id INT NOT NULL,
  category_name VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (category_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  UNIQUE (category_name, user_id)
);

/*CREATE candidates_in_categories table*/
CREATE TABLE candidates_in_categories
(
  category_id INT NOT NULL,
  candidate_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(category_id),
  FOREIGN KEY (candidate_id) REFERENCES candidates(candidate_id),
  UNIQUE (category_id, candidate_id)
);

/*CREATE tags table*/
CREATE TABLE tags
(
  tag_id INT NOT NULL,
  tag_description VARCHAR(255) NOT NULL,
  PRIMARY KEY (tag_id),
  UNIQUE (tag_description)
);

/*CREATE tags_in_candidates table*/
CREATE TABLE tags_in_candidates
(
  tag_id INT NOT NULL,
  candidate_id INT NOT NULL,
  FOREIGN KEY (tag_id) REFERENCES tags(tag_id),
  FOREIGN KEY (candidate_id) REFERENCES candidates(candidate_id),
  UNIQUE (tag_id, candidate_id)
);

/*CREATE users_categories_preferences table*/
CREATE TABLE users_categories_preferences
(
  category_id INT NOT NULL,
  tag_id INT NOT NULL,
  weight DOUBLE NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(category_id),
  FOREIGN KEY (tag_id) REFERENCES tags(tag_id),
  UNIQUE (category_id, tag_id)
);

/*-----------------------------------------------------------------PROCEDURES-------------------------------------------------------------------------------------*/
DROP PROCEDURE IF EXISTS get_all_tags_by_user_id;

DELIMITER //
CREATE PROCEDURE get_all_tags_by_user_id(IN user_id VARCHAR(255))
BEGIN
  SELECT DISTINCT tags.*
  FROM tags
  JOIN tags_in_candidates ON tags.tag_id = tags_in_candidates.tag_id
  JOIN candidates ON tags_in_candidates.candidate_id = candidates.candidate_id
  JOIN candidates_in_categories ON candidates.candidate_id = candidates_in_categories.candidate_id
  JOIN categories ON candidates_in_categories.category_id = categories.category_id
  WHERE categories.user_id = user_id;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS get_list_of_candidates_by_category;

DELIMITER //
CREATE PROCEDURE get_list_of_candidates_by_category(IN user_id VARCHAR(255), IN category_name VARCHAR(255))
BEGIN
  SELECT candidates.*, tags.tag_description FROM candidates
  JOIN candidates_in_categories ON candidates.candidate_id = candidates_in_categories.candidate_id
  JOIN categories ON candidates_in_categories.category_id = categories.category_id
  JOIN tags_in_candidates ON candidates.candidate_id = tags_in_candidates.candidate_id
  JOIN tags ON tags_in_candidates.tag_id = tags.tag_id
  WHERE categories.user_id = user_id AND categories.category_name = category_name;
END //
DELIMITER ;
