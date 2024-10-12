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

The application uses a centralized error handling mechanism. All errors are captured and formatted using an `exceptionHandler` utility. Errors are consistently handled, and appropriate HTTP status codes are returned to the client:

- **Validation Errors**: When the input does not pass validation, a `400 Bad Request` response is returned with details about the validation failure.
- **Not Found Errors**: When a requested product does not exist, a `404 Not Found` response is returned.
- **Internal Server Errors**: Any unexpected errors result in a `500 Internal Server Error` response with a generic error message.

This centralized approach ensures consistency and clarity in how errors are handled and presented to the client.

### 7. **Response Handling**

A **serviceResponseHandler** utility is used to ensure all API responses follow a standardized structure. This utility formats the response from the service layer and sends it back to the client with the appropriate HTTP status code.

The **ServiceResponse** class is used to encapsulate both successful and failed responses, ensuring a consistent format across all API responses. This structure provides:

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

By using this approach, response formatting is reused across the entire application, reducing duplication and maintaining consistency.

### 8. **Rate Limiting**

The application includes **rate limiting** to prevent abuse of the API. By default, each client (identified by IP) is allowed to make a maximum of **100 requests per minute**. This behavior can be customized using the following environment variables:

- **`COMMON_RATE_LIMIT_MAX_REQUESTS`**: Maximum number of requests allowed within the specified time window (default is `100`).
- **`COMMON_RATE_LIMIT_WINDOW_MS`**: Time window for rate limiting in milliseconds (default is `60000`, or 1 minute).

Rate limiting is implemented using the `express-rate-limit` package. This helps to prevent abuse by limiting the number of requests a client can make within a specific timeframe. In the future, if an API gateway is introduced in front of the application, rate limiting can be offloaded and handled at the gateway level, allowing this implementation to be removed from the application itself.

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

### 3. **GET /products/:id**

- Retrieves a product by its ID (UUID).

### 4. **GET /search**

- Searches for products by name using fuzzy search.
- **Query Parameters**:
  - `term`: The search term (required, minimum 3 characters).
  - `page`: Page number (optional).
  - `limit`: Items per page (optional).

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
