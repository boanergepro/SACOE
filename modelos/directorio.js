const Sequelize = require('sequelize')

const moment = require('moment')

const config = require('../config')

const db = require('../db')

const Usuario = require('./usuario')

//Conexion
const conexionDB = db.getConecctionDb()

const Directorio = conexionDB.define('directorios', {

	user_id:{
		type: Sequelize.INTEGER,
		allowNull: false,

		references: {
			model: Usuario,
			key: 'id'
		}
	}
	telegram_id: {
		type: Sequelize.INTEGER
	}

})

module.exports = Directorio