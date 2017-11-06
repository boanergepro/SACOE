'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
   
        return queryInterface.createTable('heredades', { 

            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            codigo: Sequelize.STRING(3),
            nombre: Sequelize.STRING

        })
    
    },

    down: (queryInterface, Sequelize) => {
    
        return queryInterface.dropTable('heredades');
    
    }
};
