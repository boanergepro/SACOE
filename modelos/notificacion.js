//descripcion, fecha y categoria
const Sequelize = require('sequelize')

const config = require('../config')

const db = require('../db')

//Conexion
const conexionDB = db.getConecctionDb();

const Notificacion = conexionDB.define('notificaciones', {

	descripcion:{

		type: Sequelize.STRING
	
	},
	fecha: {
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW
	},
	categoria:{

		type: Sequelize.STRING,

	},
	estado:{
		type: Sequelize.STRING,
		defaultValue: 'a'
	}
})

module.exports = Notificacion