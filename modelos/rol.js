const Sequelize = require('sequelize')

const moment = require('moment')

const config = require('../config')

const db = require('../db')

//Conexion
const conexionDB = db.getConecctionDb();

const Rol = conexionDB.define('roles', {

	nombre:{
		type: Sequelize.STRING,
	}

})

module.exports = Rol