const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    // res.send("Welcome to my HOME PAGE");
    // res.send("<h1>Welcome to my HOME PAGE</h1>");

    // Multiple.....
    res.write("<h1>Welcome to my HOME PAGE</h1>");
    res.write("<h1>Welcome to my HOME PAGE again</h1>");
    res.send();

});

app.get('/about', (req, res) => {
    res.send("Welcome to my ABOUT PAGE");
});

app.get('/contact', (req, res) => {
    res.status(200).send("Welcome to my CONTACT PAGE");
});

app.get('/json', (req, res) => {
    res.send({
        id: 1,
        name: "Arshad",
    });
});

app.get('/json2', (req, res) => {
    res.json({
        id: 1,
        name: "Arshad",
    });
});

/*
* The methods are identical when an object or array is passed,
* But res.json() will also convert non-objects,
* such as null and undefined, which are not valid JSON.
*/

app.get('/object', (req, res) => {
    res.send([{
        id: 1,
        name: "Arshad",
    }]);
});

app.get('/myprofile', (req, res) => {
    res.redirect('https://mascreation.tech');
});

app.get('/myblog', (req, res) => {
    res.redirect('https://skillsrouting.blogspot.com');
});

app.listen(port, () => {
    console.log(`listening to the port ${port}`);
});
