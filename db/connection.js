const Sequelize = require('sequelize');

const sequelize = new Sequelize('projeto_gaff', 'root', '12345',{
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log("Connecton successful!")
}).catch((err) => {
    console.log("Error Connecting to database!")
});

module.exports = sequelize;