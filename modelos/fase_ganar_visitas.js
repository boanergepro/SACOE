const Sequelize = require('sequelize')

const moment = require('moment')

const config = require('../config')

const db = require('../db')

//Modelo persona
const Persona = require('./persona')


//Conexion
const conexionDB = db.getConecctionDb();


const FaseGanarVisitas = conexionDB.define('fase_ganar_visitas', {
	
	//Llave foranea
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

	descripcion:{
		type: Sequelize.STRING
	},
	operador:{
		type: Sequelize.STRING,
		set(val) {
	  		this.setDataValue('operador', val.toLowerCase());
		}
	},

	//Este campo solo podra tener dos valores 'a' o 'i', 'a' si el registro esta acctivo e 'i' si esta inactivo
	estado_fase_ganar_visitas: {
		type: Sequelize.STRING,
		set(val) {
			this.setDataValue('estado_fase_ganar_visitas', val.toLowerCase());
		}
	}

})


module.exports = FaseGanarVisitas