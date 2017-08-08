const Sequelize = require('sequelize')

const moment = require('moment')

const config = require('../config')

const db = require('../db')

//Conexion
const conexionDB = db.getConecctionDb();

const Fase = conexionDB.define('fases', {

	nombre: {
		type: Sequelize.STRING
	}

})

module.exports = Fase