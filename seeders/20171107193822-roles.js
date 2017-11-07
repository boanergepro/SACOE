'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
    
        return queryInterface.bulkInsert('roles', [{
            nombre: 'administrador',
            createdAt: new Date()
        },{
            nombre: 'coordinador'

        },{
            nombre: 'analista'
        },{
            nombre: 'usuario'
        }], {});
    
  },

    down: (queryInterface, Sequelize) => {
    
        return queryInterface.bulkDelete('Person', null, {});
    
    }
};
