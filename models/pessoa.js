const {Sequelize, DataTypes} = require ('sequelize');
const database = require('../db/connection') 
const Familia = require('./familia');

const Pessoa = database.define("Pessoa",{
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    sobrenome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone:{
        type: DataTypes.STRING,
    },
    dataNascimento:{
        type: DataTypes.DATE,
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING
    },
    rendaMensal:{
        type: DataTypes.STRING,
    }
});

Pessoa.belongsTo(Familia, {
    foreignKey: {
      allowNull: false,
    }});
Familia.hasMany(Pessoa);

module.exports = Pessoa;