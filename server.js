const app = require("./app");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Getting the port used to access the app from the .env file
const PORT = process.env.PORT;

// Setting Up the documentation
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// Starting the sever
app.listen(3000, () => {
    console.log(`App running at port ${PORT}`)
});
