# Retail Product Catalog with Fuzzy Search - Backend Project Documentation

By Ali Irandoust

## Overview

This project is a Node.js application built with TypeScript that follows a layered architecture. It manages products, offering operations such as adding, retrieving, and searching for products. The system features a fuzzy search powered by the Damerau-Levenshtein Distance algorithm, along with other features like pagination, input validation using Zod, rate limiting, and centralized error handling.

## Key Features

- **Product Management** (Add, Get, Search)
- **Fuzzy Search** using **Damerau-Levenshtein Distance** with configurable maximum allowed distance
- **Pagination** support for product retrieval and search results
- **Zod-based Validation** for input validation
- **Rate Limiting** to protect the API from excessive requests
- **Layered Architecture** for clean separation of concerns

## Layered Architecture

This project is structured using a **layered architecture**, with distinct layers responsible for different parts of the system. This architecture ensures that the code is maintainable, scalable, and follows the principle of separation of concerns:

- **Controller Layer**: Handles incoming HTTP requests and sends responses back to the client.
- **Service Layer**: Contains the business logic of the application, including operations like product management, fuzzy search, and pagination.
- **Repository Layer**: Responsible for interacting with the data source (in this case, an in-memory store).
- **Utility Layer**: Provides helper functions and shared utilities for features like error handling, pagination, and search algorithms.

This approach ensures reusability and modularity, making it easier to maintain and extend.

## Features and Details

### 1. **Product Management**

- **Add a New Product** (`POST /products`):

  - Adds a new product to the in-memory store.
  - Validates the product data using **Zod** for fields like `name`, `category`, `description`, `price`, and `imageUrl`.

- **Get All Products with Pagination** (`GET /products`):

  - Fetches all products with pagination support.
  - Query parameters: `page` (optional) and `limit` (optional).
  - Validates the query parameters using **Zod** to ensure correct input types.

- **Get Product by ID** (`GET /products/:id`):

  - Retrieves a product by its unique ID.
  - Validates the ID as a **UUID** using **Zod**.

- **Search Products (Fuzzy Search)** (`GET /search`):
  - Supports fuzzy search for products by name using the **Damerau-Levenshtein Distance** algorithm.
  - Query parameter: `term` (required), `page` and `limit` (optional for pagination).
  - The maximum allowed distance for fuzzy matches is **configurable** via the `FUZZY_SEARCH_MAX_ALLOWED_DISTANCE` environment variable (default is `3`).

### 2. **Fuzzy Search with Damerau-Levenshtein Distance**

The **fuzzy search** feature allows users to find products even when the search term contains minor typos or errors. This is achieved using the **Damerau-Levenshtein Distance** algorithm, which calculates the minimum number of operations (substitution, insertion, deletion, transposition) needed to transform one string into another.

#### Configurable Search Sensitivity:

- The fuzziness of the search can be controlled by the `FUZZY_SEARCH_MAX_ALLOWED_DISTANCE` environment variable. By default, this value is set to `3`, balancing search flexibility and performance.

### 3. **Pre-Populated Data**

The application uses mock product data, which is stored in the `productsData.ts` file inside the **repositories** folder. Upon application startup, this data is loaded into an in-memory array, simulating a data source. All product-related operations (such as adding, retrieving, and searching for products) are performed on this in-memory store.

### 4. **Pagination**

Both the **Get All Products** and **Search Products** endpoints support pagination. The following query parameters can be used to paginate results:

- **`page`**: The page number to retrieve (defaults to 1).
- **`limit`**: The number of items per page (defaults to 10).

Pagination ensures efficient handling of large datasets by limiting the number of records returned in each request.

### 5. **Input Validation with Zod**

All input data is validated using **Zod** to ensure that only valid data is processed by the API. Key validation schemas include:

- **Product Schema**: Validates product data when creating or updating products.
- **Pagination Schema**: Validates `page` and `limit` parameters for pagination.
- **UUID Validation**: Ensures that product IDs are valid UUIDs.

This approach reduces the risk of processing malformed or invalid data, making the API more robust.

### 6. **Error Handling**

The application uses a centralized error handling mechanism. All errors are captured and processed using the `exceptionHandler` utility, which is responsible for handling errors at the service layer. If an error occurs, it is passed up from the service layer to the controller and consistently handled.

Errors are formatted and returned with the appropriate HTTP status codes:

- **Validation Errors**: When input does not pass Zod validation, a `400 Bad Request` response is returned, along with details about the validation failure.
- **Not Found Errors**: If a requested product does not exist, a `404 Not Found` response is returned.
- **Internal Server Errors**: Any unexpected errors result in a `500 Internal Server Error` response, with a generic error message.

This centralized approach ensures consistency and clarity in how errors are handled across the entire application, making it easier to maintain and debug.

### 7. **Response Handling**

A **serviceResponseHandler** utility is used to ensure all API responses follow a standardized structure. This utility formats the response from the service layer and sends it back to the client with the appropriate HTTP status code.

The **ServiceResponse** class is used to encapsulate both successful and failed responses, ensuring a consistent format across all API responses. This uniformity reduces inconsistencies and ensures a standardized structure for handling both success and error cases, regardless of the route.

#### Key Response Types:

- **Success Responses**:

  - Include a `success` flag set to `true`.
  - Provide a `message` describing the outcome of the operation.
  - Return the `data` relevant to the request.
  - Have an appropriate HTTP status code (e.g., `200 OK`, `201 Created`).

- **Failure Responses**:
  - Include a `success` flag set to `false`.
  - Provide an `error message` explaining what went wrong.
  - Return a `null` or `undefined` data field.
  - Have an appropriate HTTP status code (e.g., `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`).

This approach ensures uniformity across all API responses, making the application easier to maintain and extend as new features are added.

### 8. **Rate Limiting**

The application includes **rate limiting** to prevent abuse of the API. By default, each client (identified by IP) is allowed to make a maximum of **100 requests per minute**. This behavior can be customized using the following environment variables:

- **`COMMON_RATE_LIMIT_MAX_REQUESTS`**: Maximum number of requests allowed within the specified time window (default is `100`).
- **`COMMON_RATE_LIMIT_WINDOW_MS`**: Time window for rate limiting in milliseconds (default is `60000`, or 1 minute).

Rate limiting is implemented using the `express-rate-limit` package. This helps to prevent abuse by limiting the number of requests a client can make within a specific timeframe.

In the future, if an API gateway is introduced in front of the application, rate limiting can be offloaded and handled at the gateway level. In this case, the in-app rate limiting middleware can be removed to avoid double enforcement and potential conflicts.

---

## Environment Configuration

The project uses **dotenv** and **envalid** to manage and validate environment variables. The following environment variables are critical to the application's behavior:

- **`NODE_ENV`**: Specifies the environment (development, production, or test).
- **`HOST`**: The hostname for the server (default is `localhost`).
- **`PORT`**: The port on which the server listens (default is `3000`).
- **`FUZZY_SEARCH_MAX_ALLOWED_DISTANCE`**: Controls the maximum allowed distance for fuzzy search matches (default is `3`).
- **`COMMON_RATE_LIMIT_MAX_REQUESTS`**: Configures the maximum number of requests allowed in the rate limit window (default is `100`).
- **`COMMON_RATE_LIMIT_WINDOW_MS`**: Configures the time window for rate limiting in milliseconds (default is `60000`).

---

## Installation and Setup

### 1. Install Dependencies

To install the necessary dependencies, run:

```bash
npm install
```

### 2. Environment Setup

Create a .env file in the root directory to configure the environment variables. Example:

```sh
NODE_ENV=development
PORT=3000
FUZZY_SEARCH_MAX_ALLOWED_DISTANCE=3
COMMON_RATE_LIMIT_MAX_REQUESTS=100
COMMON_RATE_LIMIT_WINDOW_MS=60000
```

### 3. Running the Server

Start the development server with automatic reloading using nodemon:

```bash
npm run dev
```

This will start the server at http://localhost:3000.

### 4. Building for Production

```bash
npm run build
```

Once built, you can start the production server with:

```bash
npm run start
```

## API Endpoints

### 1. **POST /products**

- Adds a new product to the system.
- **Request Body**:
  ```json
  {
    "name": "Chair",
    "category": "Furniture",
    "description": "A comfortable chair",
    "price": 150.99,
    "imageUrl": "http://example.com/chair.jpg"
  }
  ```

### 2. **GET /products**

- Retrieves all products with pagination.
- **Query Parameters**:

  - `page`: Page number (optional).
  - `limit`: Items per page (optional).

- **Success Response:**
  ```json
  {
    "success": true,
    "message": "5 Products found.",
    "data": {
      "page": 1,
      "limit": 5,
      "totalItems": 20,
      "totalPages": 4,
      "results": [
        {
          "id": "c8f4b8de-6c59-4f4e-901e-94b8c8a028c9",
          "name": "Chair",
          "category": "Furniture",
          "description": "A comfortable wooden chair",
          "price": 150.99,
          "imageUrl": "http://example.com/chair.jpg"
        },
        {
          "id": "e384b90c-e7ea-42b7-b69d-8e3f238b9f99",
          "name": "Table",
          "category": "Furniture",
          "description": "A sturdy wooden table",
          "price": 250.5,
          "imageUrl": "http://example.com/table.jpg"
        }
      ]
    },
    "statusCode": 200
  }
  ```
- **Failure Response (Invalid Pagination Parameters):**
  ```json
  {
    "success": false,
    "message": "Invalid input: page must be a positive number",
    "data": null,
    "statusCode": 400
  }
  ```

### 3. **GET /products/:id**

- Retrieves a product by its ID (UUID).

- **Success Response:**

  ```json
  {
    "success": true,
    "message": "Product found.",
    "data": {
      "id": "c8f4b8de-6c59-4f4e-901e-94b8c8a028c9",
      "name": "Chair",
      "category": "Furniture",
      "description": "A comfortable wooden chair",
      "price": 150.99,
      "imageUrl": "http://example.com/chair.jpg"
    },
    "statusCode": 200
  }
  ```

- **Failure Response (Product Not Found):**

  ```json
  {
    "success": false,
    "message": "No product found.",
    "data": null,
    "statusCode": 400
  }
  ```

- **Failure Response (Invalid ID Format):**
  ```json
  {
    "success": false,
    "message": "Invalid input: id must be a valid UUID",
    "data": null,
    "statusCode": 400
  }
  ```

### 4. **GET /search**

- Searches for products by name using fuzzy search.
- **Query Parameters**:

  - `term`: The search term (required, minimum 3 characters).
  - `page`: Page number (optional).
  - `limit`: Items per page (optional).

- **Success Response:**

  ```json
  {
    "success": true,
    "message": "2 Products found.",
    "data": {
      "page": 1,
      "limit": 10,
      "totalItems": 2,
      "totalPages": 1,
      "results": [
        {
          "id": "c8f4b8de-6c59-4f4e-901e-94b8c8a028c9",
          "name": "Chair",
          "category": "Furniture",
          "description": "A comfortable wooden chair",
          "price": 150.99,
          "imageUrl": "http://example.com/chair.jpg"
        },
        {
          "id": "e384b90c-e7ea-42b7-b69d-8e3f238b9f99",
          "name": "Table",
          "category": "Furniture",
          "description": "A sturdy wooden table",
          "price": 250.5,
          "imageUrl": "http://example.com/table.jpg"
        }
      ]
    },
    "statusCode": 200
  }
  ```

- **Failure Response (Invalid ID Format):**
  ```json
  {
    "success": false,
    "message": "Invalid input: Search term must be at least 3 characters",
    "data": null,
    "statusCode": 400
  }
  ```

---

## Key Dependencies

Here are the major dependencies used in this project:

- **express**: Web framework for building APIs.
- **typescript**: JavaScript with static typing for improved scalability.
- **zod**: TypeScript-first schema declaration and validation library.
- **express-rate-limit**: Middleware for rate-limiting incoming requests.
- **dotenv**: Loads environment variables from a `.env` file.
- **envalid**: Ensures environment variables are validated.
- **http-status-codes**: Utility for consistent use of HTTP status codes.
