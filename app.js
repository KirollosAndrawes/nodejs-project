console.clear();

const express = require('express');
const app = express();
const port = process.env.PORT || 3010;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

const allRoutes = require('./routes/allRoutes');
app.use(allRoutes);

const addUserRoute = require('./routes/addUser');
app.use('/user', addUserRoute);

/* ===={ Auto Refresh }==== */

const path = require('path');
const livereload = require('livereload');
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

const connectLivereload = require('connect-livereload');
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
})

/* ===={ Start Connection DB }==== */

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kirollos:49Wv7Ph0nQduTsZw@cluster0.v4xyorf.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0')
.then((e) => {

        app.listen(port, () => {
        console.log(`http://localhost:${port}/`);
    })
})
.catch(error => console.log(error));

