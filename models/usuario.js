const {Sequelize, DataTypes} = require ('sequelize');
const database = require('../db/connection'); 
const bcrypt = require('bcrypt');

const Usuario = database.define("Usuario",{
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    sobrenome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    },
    bl_adm:{
        type: DataTypes.BOOLEAN,
        defaultValue: null
    }
});

module.exports = Usuario;