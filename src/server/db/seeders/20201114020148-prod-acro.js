'use strict';

const seed_data = require('../../../data/acro.json')
function transformAcro(acro){
  acro.createdAt = new Date();
  acro.updatedAt = new Date();
  return acro;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const acros = seed_data.map(acro => transformAcro(acro));
    return queryInterface.bulkInsert('Acros', acros);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Acros', null, {});
  }
};
