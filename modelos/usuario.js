const Sequelize = require('sequelize')

const moment = require('moment')

const config = require('../config')

const db = require('../db')

//Conexion
const conexionDB = db.getConecctionDb();

//modelos
const Rol = require('./rol')

const Usuario = conexionDB.define('usuarios', {

	nombre: {
		type: Sequelize.STRING,
	},
	apellido: {
		type: Sequelize.STRING,
	},
	username: {
		type: Sequelize.STRING,
	},
	password: {
		type: Sequelize.STRING,
	},
	rol_id:{
		type: Sequelize.INTEGER,
		/*Agrega un not null a este campo*/
		allowNull: false,
		defaultValue: 4,

		references: {
	     // This is a reference to another model
			model: Rol,

			// This is the column name of the referenced model
			key: 'id',

		// This declares when to check the foreign key constraint. PostgreSQL only.
		deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	   }
	}

})


module.exports = Usuario