'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
   
        return queryInterface.createTable('usuarios', { 

            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            rol_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 4,
                references: {
                    model: 'roles',
                    key: 'id'
               }
            },
            nombre: Sequelize.STRING,
            apellido: Sequelize.STRING,
            username: Sequelize.STRING,
            password: Sequelize.STRING,
            email: Sequelize.STRING,
            telegram_id: {
                //chat_id entre el usuario y el bot
                type: Sequelize.STRING
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: Sequelize.DATE

        })
    
    },

    down: (queryInterface, Sequelize) => {
    
        return queryInterface.dropTable('usuarios')
    
    }
}
