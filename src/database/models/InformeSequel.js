const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Informe = sequelize.define('Informe', {
  // Model attributes are defined here
  dia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  confirmados: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  recuperados: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  monitoramento: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  obto_investigacao: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  obto_descartado: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  obto_confirmado: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  href: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
});