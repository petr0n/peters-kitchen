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

// home
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});




// Functions
// =============================================================

let hasRes = [];
let onWaiting = [];

function getTables(){
    let tablesJSON = fs.readFileSync(tableFile, 'utf8');
    tables = JSON.parse(tablesJSON);
    return tables;
}
function getWaiting(){
    let tables = getTables();
    return tables.filter(t => !t.hasReservation)
}
function getReservations(){
    let tables = getTables();
    return tables.filter(t => t.hasReservation);
}
getTables();
console.log(getWaiting());
console.log(getReservations());

function addTable(table){
    tables
    fs.writeFile(tableFile, table, function(error){
        if (error) { console.log(error) }
    });
}


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
  