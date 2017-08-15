const Sequelize = require('sequelize')

const moment = require('moment')

const config = require('../config')

const db = require('../db')

//Modelos para las relaciones
const Persona = require('./persona')
const Usuario = require('./usuario')


//Conexion
const conexionDB = db.getConecctionDb();


const Usuario_persona = conexionDB.define('usuarios_personas', {
	
	//Llave foranea
	usuario_id:{

	   type: Sequelize.INTEGER,

	   references: {
	     // This is a reference to another model
	     model: Usuario,

	     // This is the column name of the referenced model
	     key: 'id',

	     // This declares when to check the foreign key constraint. PostgreSQL only.
	     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	   }
	},

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
	}
})


module.exports = Usuario_persona