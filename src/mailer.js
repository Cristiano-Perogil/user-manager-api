require('dotenv').config({ path: "../.env" });
const mailer = require("nodemailer");

// Setting Up the mail service
const transport = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.DOMAIN,
        pass: process.env.SECRET
    },
})

function sendMail(action, data) {
    // Logging the beginning of the action
    console.log("Starting Mail Process....")

    // Getting the data information to attach to the email
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let time = new Date().toLocaleTimeString();
    let fullDate = `on ${day}/${month}/${year} at ${time}`

    // The email structure
    let email = {
        from: "User Manager API <usermanagerapi@gmail.com>",
        to: "cristianojuniorcol@gmail.com",
        subject: `${action} on ${fullDate}`,
        html: `<h1 style='text-align: center'>Recent Action</h1><p>A user has recently updated the database. Check what is new below:</p>${generateHTMLTable(data)}<p>Have a good one!</p>`
    }
    transport.sendMail(email)
}

// Generating an html table from an object
function generateHTMLTable(data) {
    let table = "<table style='width: 100%'><tr>";
    // Adding the header to the table
    data.headers.map((cell) => {
        table += `<th style='border: 1px solid; padding: 0.5em;'>${cell}</th>`;
    })
    table += "</tr><tr>";
    // Adding the rows to the table
    data.rows.map((cell) => {
        table += `<td style='border: 1px solid; padding: 0.5em;'>${cell}</td>`;
    })
    table += "</tr></table>"
    return table
}


module.exports = sendMail;