'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
   
        return queryInterface.createTable('fase_ganar', {

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
            fecha_contactado: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            lugar_contacto: {
                type: Sequelize.STRING
            },
            invitado_por: {
                type: Sequelize.STRING,
                set(val) {
                    this.setDataValue('invitado_por', val.toLowerCase());
                }
            },
            fecha_visitar: {
                type: Sequelize.STRING
            },
            celula_insertar: {
                type: Sequelize.STRING
            },  
            peticion_oracion: {
                type: Sequelize.STRING
            },
            //Este campo solo podra tener dos valores 'a' o 'i', 'a' si el registro esta acctivo e 'i' si esta inactivo
            estado_fase_ganar: {
                type: Sequelize.STRING,
                set(val) {
                    this.setDataValue('estado_fase_ganar', val.toLowerCase());
                }
            }
        })
    
    },

    down: (queryInterface, Sequelize) => {
    
        return queryInterface.dropTable('fase_ganar')
    
    }
}
