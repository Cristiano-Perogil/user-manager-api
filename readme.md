<p align=""center><h1>USER-MANAGER-API</h1></p>

## Overview

This project is meticulously crafted to facilitate straightforward CRUD operations, encompassing the seamless management of user records within a database. By employing Express, our system establishes a robust REST API, empowering users to submit parameters that dynamically influence database manipulation. Additionally, the project supports Swagger UI integration to facilitate operations and maintain consistent documentation.

## Key Features

1. **Comprehensive CRUD Functionality:**

    - Effortlessly save, create, edit, and delete user entries within the database, providing a holistic solution for data management.

2. **Express-Enabled REST API:**

    - Leveraging the power of Express, our project establishes a RESTful API, ensuring a standardized and flexible interface for interacting with the database.

3. **Dynamic Parameter Handling:**

    - The REST API seamlessly accepts parameters, empowering users to customize and fine-tune database operations according to their specific needs.

4. **Swagger UI Integration:**
    - The project integrates Swagger UI, offering a user-friendly interface for API documentation, facilitating operations, and ensuring consistent documentation practices.

## Technical Overview

-   **Express.js Integration:** The project harnesses the capabilities of Express.js, a robust web application framework, to create a high-performance backend server.

-   **REST API Architecture:** Our system follows the principles of REST, offering a well-defined and efficient API for interacting with the database.

## How It Works

1. **User-Initiated CRUD Actions:**

    - Users can effortlessly initiate CRUD actions through our intuitive interface, providing a user-centric experience.

2. **Express-Driven RESTful Communication:**

    - Express handles the communication between the frontend and the database, ensuring a smooth and responsive interaction.

3. **Parameterized Database Manipulation:**
    - Users can submit parameters via the REST API, enabling dynamic and customizable database manipulations tailored to their requirements.

## Advantages

-   **Simplicity:** Streamlined CRUD operations simplify user interactions and database management.

-   **Flexibility:** The REST API, powered by Express, offers flexibility and adaptability for diverse user needs.

-   **User Empowerment:** Parameterized operations put control in the hands of users, allowing tailored manipulations of the database.

-   **Swagger UI Integration:** Consistent and accessible API documentation through Swagger UI enhances user experience and facilitates efficient operations.

## Set Up Locally

To start the application, you will need to follow the steps below:

1. Get all the required dependencies by running:
   `npm i` / `yarn`
2. Create a `.env` file in the project root directory containing the port intended to be used for performing operations with the following content:
   `PORT=0`
   Replace 0 for the desired port number
3. After the installation, you will be able to start the project by running:
   `npm start`

## Important

This project supports any simple sql operation regarding one table with no relationships, this feature will be released in future versions.

## Technologies

1. Express JS
2. JSON Schema
3. Swagger UI
