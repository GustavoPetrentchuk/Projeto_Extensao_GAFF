const database = require('../db/connection');

const Usuario = require('../models/usuario');
const Pessoa = require('../models/pessoa');
const Familia = require('../models/familia');

//database.sync({force:true});
database.sync();
