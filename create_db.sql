# Create database script for Berties books

# Create the database
CREATE DATABASE myBookshop;
USE myBookshop;

# Create the tables
CREATE TABLE books (id INT AUTO_INCREMENT,name VARCHAR(50),price DECIMAL(5, 2) unsigned,PRIMARY KEY(id));

