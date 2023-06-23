/*
	****************** VOTING SYSTEM *******************
*/


/*-----------------------------------------------------------------CREATES-------------------------------------------------------------------------------------*/

/*CREATES the politician system database*/
CREATE DATABASE IF NOT EXISTS voting_system DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE voting_system;

/*DROPS any of the tables that may already exists*/
DROP TABLE IF EXISTS candidates_in_users, tags_in_candidates, tags, candidates, users;

/*CREATE users table*/
CREATE TABLE users
(
  user_id INT NOT NULL AUTO_INCREMENT,
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


/*CREATE candidates_in_users table*/
CREATE TABLE candidates_in_users
(
  user_id INT NOT NULL,
  candidate_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (candidate_id) REFERENCES candidates(candidate_id),
  UNIQUE (user_id, candidate_id)
);



