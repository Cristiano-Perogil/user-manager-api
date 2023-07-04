const app = require("./app");

// Getting the port used to access the app from the .env file
const PORT = process.env.PORT;

// Starting the server
app.listen(3000, () => {
    console.log(`App running at port ${PORT}`)
})