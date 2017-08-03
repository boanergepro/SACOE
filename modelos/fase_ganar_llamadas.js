const Sequelize = require('sequelize')

const moment = require('moment')

const config = require('../config')

const db = require('../db')

//Modelo persona
const Persona = require('./persona')


//Conexion
const conexionDB = db.getConecctionDb();


const FaseGanarLlamadas = conexionDB.define('fase_ganar_llamadas', {
	
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
	}
	//Agregar los demas campos alusivos a esta fase

})


module.exports = FaseGanarLlamadas