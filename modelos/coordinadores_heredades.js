const Sequelize = require('sequelize')

const db = require('../db')

//Modelos para las relaciones
const Heredad = require('./heredad')
const Usuario = require('./usuario')


//Conexion
const conexionDB = db.getConecctionDb();


const CoordinadorHeredad = conexionDB.define('coordinadores_heredades', {
	
	//Llave foranea
	coordinador_id: {

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
	heredad_id: {

	   type: Sequelize.INTEGER,

	   references: {
	     // This is a reference to another model
	     model: Heredad,

	     // This is the column name of the referenced model
	     key: 'id',

	     // This declares when to check the foreign key constraint. PostgreSQL only.
	     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	   }
	}
})


module.exports = CoordinadorHeredad