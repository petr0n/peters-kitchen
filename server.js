let express = require('express');
let path = require('path');
let fs = require('fs');

let app = express();
let PORT = process.env.PORT || 3000;
let tableFile = 'tables.js';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());




// Routes
// =============================================================
// HTML ROUTES
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/addreservation", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});


// API ROUTES
app.get("/api/tables", function (req, res) {
    return res.json();
});

app.get("/api/reservations", function (req, res) {
    return getReservations();
});

  app.get("/api/waitlist", function(req, res) {
    return getWaiting ();
  });  

app.post("/api/makereservation", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newParty = req.body;
    console.log(newParty);

    // // Using a RegEx Pattern to remove spaces from newCharacter
    // // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newParty.routeName = newParty.name.replace(/\s+/g, "").toLowerCase();

    // console.log(newParty);

    // tables.push(newParty)

    // res.json(newParty);
});


// Functions
// =============================================================
function getTables() {
    let tablesJSON = fs.readFileSync(tableFile, 'utf8');
    tables = JSON.parse(tablesJSON);
    return tables;
}
function getWaiting() {
    let tables = getTables();
    return tables.filter(t => !t.hasReservation)
}
function getReservations() {
    let tables = getTables();
    return tables.filter(t => t.hasReservation);
}
getTables();
// console.log(getWaiting());
// console.log(getReservations());

function addTable(newParty) {
    let tables = getTables();
    let tableCount = Object.keys(tables).length;

    // fs.writeFile(tableFile, table, function(error){
    //     if (error) { console.log(error) }
    // });
}
addTable();


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

