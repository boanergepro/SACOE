const Sequelize = require('sequelize')

const moment = require('moment')

const config = require('../config')

const db = require('../db')


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
	}
});

module.exports = Persona