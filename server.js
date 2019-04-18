let express = require('express');
let path = require('path');
let fs = require('fs');

let app = express();
var PORT = process.env.PORT || 3000;

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

function getTables(){
    fs.readFileSync('tables.js', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        }
        let tables = data.split(',');
        tables.map(function(table){
            console.log(table);
        });
    });
}
getTables();



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
  