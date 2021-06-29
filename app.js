const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');
const port = 3000;
const hostname = "localhost";

mongoose.connect('mongodb://localhost:27017/jattDance', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to Database Successfully");
});
const contactSchema = new mongoose.Schema({
    name: String,
    message: String
});
const Entry = mongoose.model('Entry', contactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.status(200).render('home')
});
app.get('/about', (req, res) => {
    res.status(200).render('about')
});
app.get('/gallery', (req, res) => {
    res.status(200).render('gallery')
});
app.get('/contact', (req, res) => {
    res.status(200).render('contact', { reply: "" });
});
app.post('/contact', (req, res) => {
    const entry = new Entry(req.body);
    entry.save().then(() => {
        reply = `Thank you dear ${req.body.name} for giving your valuable feedback.`
        res.status(200).render('contact', { reply: reply });
    }).catch(() => {
        error = `Sorry dear ${req.body.name}. There was some error. Please try again`
        res.status(200).render('contact', { error: error });
    });
});

app.listen(port, hostname, (err, data) => {
    console.log(`Server Listening at : http://${hostname}:${port}`);
});