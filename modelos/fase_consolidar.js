const Sequelize = require('sequelize')

const moment = require('moment')

const config = require('../config')

const db = require('../db')

//Modelo persona
const Persona = require('./persona')


//Conexion
const conexionDB = db.getConecctionDb();


const FaseConsolidar = conexionDB.define('fase_consolidar', {
	
	//Llave foranea
	persona_id:{

	   type: Sequelize.INTEGER,
	   /*Agrega un not null a este campo*/
	   allowNull: false,

	   references: {
	     // This is a reference to another model
	     model: Persona,

	     // This is the column name of the referenced model
	     key: 'id',

	     // This declares when to check the foreign key constraint. PostgreSQL only.
	     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	   }
	},

	//Agregar los demas campos alusivos a esta fase

})


module.exports = FaseConsolidar