# NC-News

Hosted Version: https://news-project-ebx2.onrender.com/api/

## Summary

This project is a backend API for a Reddit-like application, providing endpoints for users, topics, comment management, and fetching articles by query. The API is built using Node.js, Express, and PostgreSQL.

## Installation

Prerequisites

    Node.js: v14.0.0 or higher
    PostgreSQL: v12.0 or higher

# Setup Instructions

### Clone the Repository

    git clone https://github.com/puppydog4/news-project.git
    cd news-project

### Install Dependencies

    npm install

### Create .env.development and .env.test files in the root directory

    // .env.development //

    PGDATABASE=nc_news

     // .env.test //

    PGDATABASE=nc_news_test

### Create and Seed the Local Database

    npm run setup-dbs
    npm run seed

### Run the Application

    npm start

This will start the application on port 9090.

Go to http://localhost:9090/api to see a list of all available endpoints.

### Run Tests

    npm test

This will execute the test suites to ensure everything is working correctly.
