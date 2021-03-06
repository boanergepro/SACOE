const Sequelize = require('sequelize')

const moment = require('moment')

const config = require('../config')

const db = require('../db')

const Usuario = require('./usuario')

//Conexion
const conexionDB = db.getConecctionDb();

const Permiso = conexionDB.define('permisos', {

	nombre_permiso: {
		type: Sequelize.STRING,
		set(val) {
		  this.setDataValue('lugar', val.toLowerCase());
		}
	},
	codigo: {
		type: Sequelize.STRING,
		set(val) {
		  this.setDataValue('lugar', val.toLowerCase());
		}
	}

})

module.exports = Permiso