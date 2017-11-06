'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('roles', { 
        
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
            },
        nombre: Sequelize.STRING,

        })

    },

    down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('roles');

    }
};
