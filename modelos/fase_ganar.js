const Sequelize = require('sequelize')

const moment = require('moment')

const config = require('../config')

const db = require('../db')

//Modelo persona
const Persona = require('./persona')


//Conexion
const conexionDB = db.getConecctionDb();


const FaseGanar = conexionDB.define('fase_ganar', {

	//Clave foranea con la tabla personas
	persona_id:{

	   type: Sequelize.INTEGER,

	   references: {
	     // This is a reference to another model
	     model: Persona,

	     // This is the column name of the referenced model
	     key: 'id',

	     // This declares when to check the foreign key constraint. PostgreSQL only.
	     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	   }
	},
	fecha_contactado: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	lugar_contacto: {
		type: Sequelize.STRING,
		set(val) {
		  this.setDataValue('lugar', val.toLowerCase());
		}
	},
	invitado_por: {
		type: Sequelize.STRING,
		set(val) {
	  		this.setDataValue('invitado_por', val.toLowerCase());
		}
	},
	fecha_visitar: {
		type: Sequelize.STRING
		
	},
	celula_insertar: {
		type: Sequelize.STRING,
		set(val) {
		 	this.setDataValue('celula_insertar', val.toLowerCase());
		}
	},	
	peticion_oracion: {
		type: Sequelize.STRING,
		set(val) {
		 	this.setDataValue('peticion_oracion', val.toLowerCase());
		}
	}
})


module.exports = FaseGanar