const request = require("supertest");
const app = require("../app");

describe("GET / ", () => {
    test("It must return an array of objects which contains all the users present in the database", async () => {
        const response = await request(app).get('/getusers');
        expect(response.status).toBe(200);
    })
})

describe("POST/ ", () => {
    test("It must add a new user to the database", async () => {
        const response = await request(app).post('/adduser').send({
            name: "Marina",
            age: 24,
            city: "Lux",
            role: "IT leader",
            departmentNumber: 23521
        });
        expect(response.status).toBe(200);
    })
})

describe("POST/ ", () => {
    test("This must fails due to its not having the required property 'role'.", async () => {
        const response = await request(app).post('/adduser').send({
            name: "Marina",
            age: 24,
            city: "Lux",
            departmentNumber: 23521
        });
        expect(response.status).toBe(422);
    })
})

describe("POST/ ", () => {
    test("This must fails due to its not having the required type number associated with the age property.", async () => {
        const response = await request(app).post('/adduser').send({
            name: "Marina",
            age: "24",
            city: "Lux",
            role: "Manager",
            departmentNumber: 23521
        });
        expect(response.status).toBe(422);
    })
})


describe("PUT/ ", () => {
    test("This must update a user from the database.", async () => {
        const response = await request(app).put('/edituser/1').send({
            name: "Marina",
            age: 24,
            city: "Lux",
            role: "Manager",
            departmentNumber: 23521
        });
        expect(response.status).toBe(200);
    })
})
