'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
   
        return queryInterface.createTable('personas', {

            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            nombre: {
                type: Sequelize.STRING,
                set(val) {
                    this.setDataValue('ocupacion', val.toLowerCase());
                }
            },

            apellido: {
                type: Sequelize.STRING,
                set(val) {
                    this.setDataValue('ocupacion', val.toLowerCase());
                }
            },
            
            sexo: Sequelize.STRING,
            
            nacionalidad: Sequelize.STRING,
            
            ocupacion: {
                type: Sequelize.STRING,
                set(val) {
                    this.setDataValue('ocupacion', val.toLowerCase());
                }
            },
            ciudad: {
                type: Sequelize.STRING,
                set(val) {
                    this.setDataValue('ciudad', val.toLowerCase());
                }
            },
            telefono: {
                type: Sequelize.STRING,
                set(val) {
                    this.setDataValue('telefono', val.toLowerCase());
                }
            },
            correo: {
                type: Sequelize.STRING,
                set(val) {
                    this.setDataValue('correo', val.toLowerCase());
                }
            },
            direccion: {
                type: Sequelize.STRING,
                set(val) {
                    this.setDataValue('direccion', val.toLowerCase());  
                }
            },
            fecha_nacimiento: {
                type: Sequelize.DATE,
                
            },
            fecha_registro: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
            heredad_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'heredades',
                    key: 'id',
                }
            },
            //Este campo solo podra tener dos valores 'a' o 'i', 'a' si el registro esta acctivo e 'i' si esta inactivo
            estado_personas: {
                type: Sequelize.STRING,
                set(val) {
                    this.setDataValue('estado_personas', val.toLowerCase());
                }
            }

        })
    
    },

    down: (queryInterface, Sequelize) => {
    
        return queryInterface.dropTable('personas')
    
    }
}
