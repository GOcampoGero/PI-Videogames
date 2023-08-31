const { DataTypes} = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Plataformas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FechaDeLanzaminto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Raiting:{
      type: DataTypes.DECIMAL
    }, 
    created: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },  { timestamps: false }
  );
};
