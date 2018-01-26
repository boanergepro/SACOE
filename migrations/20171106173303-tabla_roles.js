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
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: Sequelize.DATE
        })
            

    },

    down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('roles');

    }
};
