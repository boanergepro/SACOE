const Sequelize = require('sequelize')

const moment = require('moment')

const config = require('../config')

const db = require('../db')

const Permiso = require('./permisos')


//Conexion
const conexionDB = db.getConecctionDb();

const Usuario = conexionDB.define('usuarios', {

	username: {
		type: Sequelize.STRING,
		set(val) {
		  this.setDataValue('lugar', val.toLowerCase());
		}
	},
	password: {
		type: Sequelize.STRING,
		set(val) {
		  this.setDataValue('lugar', val.toLowerCase());
		}
	}

})


module.exports = Usuario