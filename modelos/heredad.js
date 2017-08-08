const Sequelize = require('sequelize')

const moment = require('moment')

const config = require('../config')

const db = require('../db')

//Conexion
const conexionDB = db.getConecctionDb();

//Modelo persona
const Persona = require('./persona')

const Heredad = conexionDB.define('heredades', {

	codigo:{
		type: Sequelize.STRING(3) //Limitar el numero de letras
	},
	nombre: {
		type: Sequelize.STRING
	}
})

module.exports = Heredad