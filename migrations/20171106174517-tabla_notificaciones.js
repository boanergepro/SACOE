'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
   
        return queryInterface.createTable('notificaciones', { 

            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            descripcion: Sequelize.STRING,
            fecha: {
                type: Sequelize.DATE, 
                defaultValue: Sequelize.NOW
            },
            categoria: Sequelize.STRING,
            estado:{
                type: Sequelize.STRING,
                defaultValue: 'a'
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: Sequelize.DATE

        })
    
    },

    down: (queryInterface, Sequelize) => {
    
        return queryInterface.dropTable('notificaciones')
    
    }
};
