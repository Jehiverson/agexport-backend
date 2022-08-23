const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors({ origin: true }));

//CARGAR RUTAS
const routes = require('./routes/index.routes');

//MIDDELWARES
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());


//CABEZERAS
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

//RUTAS
app.use('', routes);

exports.api = functions.https.onRequest(app);

