const Sequelize = require('sequelize')

const db = require('../db')

//Modelos para las relaciones
const Fase = require('./fase')
const Usuario = require('./usuario')


//Conexion
const conexionDB = db.getConecctionDb();


const CoordinadorFase = conexionDB.define('coordinadores_fases', {
	
	//Llave foranea a la tabla usuarios en el campo id
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
	fase_id: {

	   type: Sequelize.INTEGER,

	   references: {
	     // This is a reference to another model
	     model: Fase,

	     // This is the column name of the referenced model
	     key: 'id',

	     // This declares when to check the foreign key constraint. PostgreSQL only.
	     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	   }
	}
})


module.exports = CoordinadorFase