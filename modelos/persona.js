const Sequelize = require('sequelize')

const moment = require('moment')

const config = require('../config')

const db = require('../db')

const FaseGanar = require('../modelos/fase_ganar')

//Conexion
const conexionDB = db.getConecctionDb();


const Persona = conexionDB.define('personas', {

	nombre: {
		type: Sequelize.STRING,
		set(val) {
	  		this.setDataValue('nombre', val.toLowerCase());
		}
	},
	apellido: {
		type: Sequelize.STRING,
		set(val) {
	  		this.setDataValue('apellido', val.toLowerCase());
		}
	},
	sexo: {
		type: Sequelize.STRING,
	},
	nacionalidad: {
		type: Sequelize.STRING,
		
	},
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
	heredad: {
		type: Sequelize.STRING,
		set(val) {
			this.setDataValue('heredad', val.toLowerCase());
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

module.exports = Persona