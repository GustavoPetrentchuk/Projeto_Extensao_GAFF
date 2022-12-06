const {Sequelize, DataTypes} = require ('sequelize');
const database = require('../db/connection');

const Familia = database.define("Familia",{
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco:{
        type: DataTypes.STRING
    },
    numero:{
        type: DataTypes.INTEGER
    },
    bairro:{
        type: DataTypes.STRING
    },
    cep:{
        type: DataTypes.INTEGER
    },
    cidade:{
        type: DataTypes.STRING
    },
    telefone:{
        type: DataTypes.STRING
    },
    observacao:{
        type: DataTypes.TEXT,
    }
});

module.exports = Familia;