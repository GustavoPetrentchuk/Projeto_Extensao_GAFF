const {Sequelize, DataTypes} = require ('sequelize');
const database = require('../db/connection');
const Familia = require('./familia');
const Usuario = require('./usuario');

const Entrega = database.define("entrega",{
    data_entrega:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {paranoid: true});

Entrega.belongsTo(Familia);
Entrega.hasMany(Usuario);
module.exports = Entrega;