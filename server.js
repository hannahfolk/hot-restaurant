// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Reservations (DATA)
//=============================================================
const tables = [
    {
        routeName: "hannah",
        name: "Hannah Folk",
        phoneNumber: 5555555555,
        email: "hfolk25@gmail.com",
        uniqueID: "Hannah"
    },
    {
        routeName: "ty",
        name: "Ty Shivers",
        phoneNumber: 5555555555,
        email: "tshivers@gmail.com",
        uniqueID: "Ty"
    },
    {
        routeName: "omar",
        name: "Omar Patel",
        phoneNumber: 5555555555,
        email: "omarpatel123@gmail.com",
        uniqueID: "Omar"
    }
];

const waitlist = [
    {
        routeName: "peter",
        name: "Peter Park",
        phoneNumber: 5555555555,
        email: "pPark@gmail.com",
        uniqueID: "Peter"
    }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", (req, res) => {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", (req, res) => {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all characters
app.get("/api/tables", (req, res) => {
  return res.json(tables);
});

// Displays a single character, or returns false
app.get("/api/waitlist", (req, res) => {
  return res.json(waitlist);
});

// Create New Characters - takes in JSON input
app.post("/api/tables", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newTable = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newTable);

  tables.push(newTable);

  res.json(newTable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
