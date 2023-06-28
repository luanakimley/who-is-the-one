/*
	****************** VOTING SYSTEM *******************
*/


/*-----------------------------------------------------------------CREATES-------------------------------------------------------------------------------------*/

/*CREATES the politician system database*/
CREATE DATABASE IF NOT EXISTS voting_system DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE voting_system;

/*DROPS any of the tables that may already exists*/
DROP TABLE IF EXISTS users_categories_preferences, tags_in_candidates, tags, candidates, categories, users;

/*CREATE users table*/
CREATE TABLE users
(
  user_id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE (email)
);

/*CREATE categories table*/
CREATE TABLE categories
(
  category_id INT NOT NULL AUTO_INCREMENT,
  is_favourite BOOLEAN,
  user_id INT NOT NULL,
  category_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (category_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  UNIQUE (category_name, user_id)
);

/*CREATE candidates table*/
CREATE TABLE candidates
(
  candidate_id INT NOT NULL AUTO_INCREMENT,
  category_id INT NOT NULL,
  candidate_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (candidate_id),
  FOREIGN KEY (category_id) REFERENCES categories(category_id),
  UNIQUE (category_id, candidate_name)
);

/*CREATE tags table*/
CREATE TABLE tags
(
  tag_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  tag_description VARCHAR(255) NOT NULL,
  PRIMARY KEY (tag_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  UNIQUE (user_id, tag_description)
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


/*-----------------------------------------------------------------INDEXES-------------------------------------------------------------------------------------*/

ALTER TABLE candidates
DROP INDEX IF EXISTS candidates_categories_index;

/*CREATES an index called candidates_categories_index on category_id in candidates*/
CREATE INDEX candidates_categories_index
ON candidates(category_id);

ALTER TABLE categories
DROP INDEX IF EXISTS user_categories_index;

/*CREATES an index called user_categories_index on user_id in categories*/
CREATE INDEX user_categories_index
ON categories(user_id);

ALTER TABLE tags
DROP INDEX IF EXISTS user_tags_index;

/*CREATES an index called user_tags_index on user_id in tags*/
CREATE INDEX user_tags_index
ON tags(user_id);

/*-----------------------------------------------------------------TRIGGERS-------------------------------------------------------------------------------------*/

/*DELETE TRIGGERS to remove categories details*/
DROP TRIGGER IF EXISTS delete_categories_foreign_key_candidates;

CREATE TRIGGER delete_categories_foreign_key_candidates

BEFORE DELETE ON categories
FOR EACH ROW

DELETE FROM candidates WHERE candidates.category_id = OLD.category_id;


DROP TRIGGER IF EXISTS delete_categories_foreign_key_users_categories_preferences;

CREATE TRIGGER delete_categories_foreign_key_users_categories_preferences

BEFORE DELETE ON categories
FOR EACH ROW

DELETE FROM users_categories_preferences WHERE users_categories_preferences.category_id = OLD.category_id;


/*DELETE TRIGGERS to remove tags details*/
DROP TRIGGER IF EXISTS delete_tags_foreign_key_tags_in_candidates;

CREATE TRIGGER delete_tags_foreign_key_tags_in_candidates

BEFORE DELETE ON tags
FOR EACH ROW

DELETE FROM tags_in_candidates WHERE tags_in_candidates.tag_id = OLD.tag_id;


DROP TRIGGER IF EXISTS delete_tags_foreign_key_users_categories_preferences;

CREATE TRIGGER delete_tags_foreign_key_users_categories_preferences

BEFORE DELETE ON tags
FOR EACH ROW

DELETE FROM users_categories_preferences WHERE users_categories_preferences.tag_id = OLD.tag_id;


/*DELETE TRIGGERS to remove candidates details*/
DROP TRIGGER IF EXISTS delete_candidates_foreign_key_tags_in_candidates;

CREATE TRIGGER delete_candidates_foreign_key_tags_in_candidates

BEFORE DELETE ON candidates
FOR EACH ROW

DELETE FROM tags_in_candidates WHERE tags_in_candidates.candidate_id = OLD.candidate_id;


/*-----------------------------------------------------------------PROCEDURES-------------------------------------------------------------------------------------*/

DROP PROCEDURE IF EXISTS get_all_tags_for_a_category;

DELIMITER //
CREATE PROCEDURE get_all_tags_for_a_category(IN category_id INT)
BEGIN
  SELECT DISTINCT tags.*
    FROM tags
    JOIN tags_in_candidates ON tags.tag_id = tags_in_candidates.tag_id
    JOIN candidates ON tags_in_candidates.candidate_id = candidates.candidate_id
    WHERE candidates.category_id = category_id;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS get_all_candidates_by_category;

DELIMITER //
CREATE PROCEDURE get_all_candidates_by_category(IN category_id INT)
BEGIN
  SELECT candidates.*, tags.tag_id, tags.tag_description FROM candidates
  JOIN categories ON candidates.category_id = categories.category_id
  LEFT JOIN tags_in_candidates ON candidates.candidate_id = tags_in_candidates.candidate_id
  LEFT JOIN tags ON tags_in_candidates.tag_id = tags.tag_id
  WHERE candidates.category_id = category_id;
END //
DELIMITER ;



