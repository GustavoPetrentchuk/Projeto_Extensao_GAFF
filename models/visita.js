const {Sequelize, DataTypes} = require ('sequelize');
const database = require('../db/connection');
const Familia = require('./familia');
const Usuario = require('./usuario');

const Visita = database.define("visita",{
    observacao_visita:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    data_visita:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {paranoid: true});

Visita.belongsTo(Familia);
Visita.hasMany(Usuario);
module.exports = Visita;

/*Precisa registrar a entrega de recursos na visita?*/