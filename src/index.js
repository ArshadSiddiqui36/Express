const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const hbs = require("hbs");
const requests = require("requests");


// app.get(route, callback)

/*
* => API
* get - read
* post - create
* put - update
* delete - delete
*/

// app.get("/", (req, res) => {
//     res.send("Hello World from the express");
// });

// app.get("/author", (req, res) => {
//     res.send("Arshad Siddiqui");
// });

// app.listen(8000, () => {
//     console.log("listening the port at 8000");
// });


// ............................................................
// Paths.....
// console.log(path);
// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));
// const staticPath = path.join(__dirname, "../public");

// Builtin Middleware.....
/*
* This is a built-in middleware function in Express.
* It serves static files and is based on serve-static.
* express.static(root, [options])
*/

// app.use(express.static(staticPath));


// ............................................................
// app.get("/", (req, res) => {
//     res.send("OK, Working");
// });

// app.get('/myprofile', (req, res) => {
//     res.redirect('https://mascreation.tech');
// });

// app.get('/myblog', (req, res) => {
//     res.redirect('https://skillsrouting.blogspot.com');
// });

// app.listen(port, () => {
//     console.log(`listening to the port ${port}`);
// });


// ...............................................................
// View Engine (Default).....
// app.set("view engine", "hbs");

// app.get("/", (req, res) =>{
//     res.render('index');
// });


// Template Views.....
// const templatePath = path.join(__dirname, "../templates");
// app.set("view engine", "hbs");
// app.set('views', templatePath);

// app.get("/", (req, res) =>{
//     res.render('index');
// });

// app.get("/about", (req, res) =>{
//     res.render('about');
// });



// Using CSS from Public.....
// const staticPath = path.join(__dirname, "../public");
const staticPath = path.join(__dirname, "../public/css");
app.use(express.static(staticPath));


// Partials.....
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set('views', templatePath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) =>{
    res.render('index');
});

// API.....
app.get("/weather", (req, res) =>{
    requests(`http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=d39a046c717c0b7efc0a22b546acd0a2`)

        .on("data", (chunk) => {
            const objdata = JSON.parse(chunk);
            const arrData = [objdata];
            console.log(`City name is ${arrData[0].name} and temprature is ${arrData[0].main.temp}`);
            res.write(`City : ${arrData[0].name} | Temprature : ${arrData[0].main.temp}`);
        })
        .on("end", (err) => {
            if (err) return console.log('connection closed due to errors', err);
            res.end();
        });
});

app.get("/about", (req, res) =>{
    res.render('about');
});

app.get("/about/*", (req, res) => {
    res.render("404", {
        errorcomment: "Opps this about us page couldn't be found"
    });
});

// 404 Not Found - Put at Bottom
app.get("*", (req, res) => {
    res.render("404", {
        errorcomment: "Opps page couldn't be found",
    });
});









// Listening....................................
app.listen(port, () => {
    console.log(`listening to the port ${port}`);
});


