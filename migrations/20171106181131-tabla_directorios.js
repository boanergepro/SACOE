'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
   
        return queryInterface.createTable('directorios', {

            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'usuarios',
                    key: 'id',
                }
            },
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
    
        return queryInterface.dropTable('directorios')
    
    }
}
