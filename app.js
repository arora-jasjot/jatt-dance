const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = 3000;
const hostname = "localhost";

app.use('/static', express.static('static'));
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) =>{    
    res.status(200).render('home')
});
app.get('/about', (req, res) =>{    
    res.status(200).render('about')
});
app.get('/gallery', (req, res) =>{    
    res.status(200).render('gallery')
});
app.get('/contact', (req, res) =>{    
    res.status(200).render('contact', {reply: ""});
});
app.post('/contact', (req, res) =>{
    reply = `Thank you dear ${req.body.name} for giving your valuable feedback.` 
    res.status(200).render('contact', {reply: reply});
});

app.listen(port, hostname, (err, data) => {
    console.log(`Server Listening at : http://${hostname}:${port}`);
});