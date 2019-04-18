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

app.get("/view", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/addreservation", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});


// API ROUTES
app.get("/api/tables", function (req, res) {
    return getTables();
});

app.get("/api/reservations", function (req, res) {
    return getReservations();
});

app.get("/api/waitlist", function(req, res) {
    return getWaiting ();
});  

app.post("/api/makereservation", function (req, res) {
    var newParty = req.body;
    // console.log(newParty);
    addTable(newParty);
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

function addTable(newParty) {
    let tables = getTables();
    let tableCount = Object.keys(tables).length;
    newParty.id = tableCount + 1;
    newParty.hasReservation = checkCapacity() ? true : false;
    console.log(newParty);
    fs.readFile(tableFile, function(err, data){
        if (err) { console.log(error) }
        const tablesJSON = JSON.parse(data)
        tablesJSON.push(newParty)
        fs.writeFileSync(tableFile, JSON.stringify(tablesJSON));
    });
    return newParty.hasReservation ? 'You\'ve been added to the reservation list.' : 'Sorry, the reservation list is full but you are now on the wait list.'
}

function checkCapacity() {
    let reservations = getReservations();
    let reservationsCount = Object.keys(reservations).length
    return reservationsCount => 10;
}


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

