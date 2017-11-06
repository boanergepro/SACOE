'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
   
        return queryInterface.createTable('usuarios_personas', {

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
            persona_id: {
                //chat_id entre el usuario y el bot
                type: Sequelize.STRING
                allowNull: false,
                references: {
                    model: 'personas',
                    key: 'id',
                }
            }
        })
    
    },

    down: (queryInterface, Sequelize) => {
    
        return queryInterface.dropTable('usuarios_personas')
    
    }
}
