'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
   
        return queryInterface.createTable('fase_ganar_llamadas', {

            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            persona_id: {
                //chat_id entre el usuario y el bot
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'personas',
                    key: 'id'
                }
            },
            descripcion: Sequelize.STRING,
            operador: Sequelize.STRING,
            estado_fase_ganar_visitas: {
                type: Sequelize.STRING,
                set(val) {
                    this.setDataValue('estado_fase_ganar_llamadas', val.toLowerCase());
                }
            }
        })
    
    },

    down: (queryInterface, Sequelize) => {
    
        return queryInterface.dropTable('fase_ganar_llamadas')
    
    }
}
