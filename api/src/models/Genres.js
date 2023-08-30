const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Genres', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        Name:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}