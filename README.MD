# Book Management System

A simple web application for managing and browsing books, built with Node.js,
Express, EJS, and MySQL. This project demonstrates how to set up an Express
server, render dynamic pages using EJS templates, and interact with a MySQL
database for storing and retrieving book data.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Routes](#available-routes)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- Home page with shop name display
- Search form for querying the book database
- User registration form with confirmation
- About page (static)
- Simple routing and form handling
- Static CSS styling

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer recommended)
- [MySQL](https://www.mysql.com/) database server

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zakariya-ali/Book-Management-System.git
   cd "Book Management System"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Database Setup

1. Create the database and tables by running the SQL script:
   ```bash
   mysql -u <username> -p < create_db.sql
   ```
2. Insert test data:
   ```bash
   mysql -u <username> -p < insert_test_data.sql
   ```
3. Ensure the database name is `myBookshop` and the `books` table contains
   sample rows.

## Running the Application

1. Start the server:
   ```bash
   node index.js
   ```
2. Open your browser and go to `http://localhost:8000`

## Project Structure

```
Book Management System/
├── create_db.sql           # SQL script to create database and tables
├── insert_test_data.sql    # SQL script to seed test data
├── index.js                # Main application entry point
├── package.json            # NPM package manifest
├── public/                 # Static assets (CSS)
│   └── main.css
├── routes/                 # Express route definitions
│   └── main.js
└── views/                  # EJS templates for rendering pages
    ├── index.ejs
    ├── register.ejs
    └── search.ejs
```

## Available Routes

| Method | Path           | Description                            |
| ------ | -------------- | -------------------------------------- |
| GET    | /              | Home page                              |
| GET    | /about         | About page                             |
| GET    | /search        | Book search form                       |
| GET    | /search-result | Displays search keyword (no DB query)  |
| GET    | /register      | User registration form                 |
| POST   | /registered    | Registration confirmation with details |

_Note:_ The `/search-result` route currently returns only the search keyword. To
integrate actual book search, update the route handler in `routes/main.js` to
query the `books` table.

## Technologies Used

- Node.js
- Express 5.x
- EJS templating engine
- MySQL
- Body-Parser middleware
- CSS for basic styling

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file
for details.
