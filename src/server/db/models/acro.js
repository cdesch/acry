'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Acro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Acro.init({
    acronym: DataTypes.STRING,
    definition: DataTypes.TEXT,
    info: DataTypes.TEXT,
    url: DataTypes.TEXT,
    updated_at: DataTypes.DATE,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Acro',
  });
  return Acro;
};