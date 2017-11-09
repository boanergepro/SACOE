'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
    
        return queryInterface.bulkInsert('roles', [{
            nombre: 'administrador',
            createdAt: 'now()'
        },{
            nombre: 'coordinador',
            createdAt: 'now()'
        },{
            nombre: 'analista',
            createdAt: 'now()'
        },{
            nombre: 'usuario',
            createdAt: 'now()'
        }], {});
    
  },

    down: (queryInterface, Sequelize) => {
    
        return queryInterface.bulkDelete('Person', null, {});
    
    }
};
