const Sequelize = require('sequelize')

const moment = require('moment')

const config = require('../config')

const db = require('../db')


//Conexion
const conexionDB = db.getConecctionDb();


const Persona = conexionDB.define('persona', {

	fecha: {
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW
	},
	lugar: {
		type: Sequelize.STRING,
		set(val) {
		  this.setDataValue('lugar', val.toLowerCase());
		}
	},
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
	invitado_por: {
		type: Sequelize.STRING,
		set(val) {
	  		this.setDataValue('invitado_por', val.toLowerCase());
		}
	},
	correo: {
		type: Sequelize.STRING,
		set(val) {
	  		this.setDataValue('correo', val.toLowerCase());
		}
	},
	fecha_visitar: {
		type: Sequelize.STRING
		
	},
	direccion: {
		type: Sequelize.STRING,
		set(val) {
  			this.setDataValue('direccion', val.toLowerCase());	
		}
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
	},
	fecha_registro: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
	fecha_nacimiento: {
		type: Sequelize.DATE,
		//defaultValue: Sequelize.NOW,
		
	},
	heredad: {
		type: Sequelize.STRING,
		set(val) {
			this.setDataValue('heredad', val.toLowerCase());
		}
	},

	edad: {
		type: Sequelize.VIRTUAL,
		/*
		set: function(val){

			this.setDataValue('edad',val)

		},
        get: function(){ 

        	this.getDataValue('edad')

        },
        */
        
    }
});



//Este codigo ejecuta la creacion de la tabla si no existe.
/*
Persona.sync({force: true}).then((x) => {
  // Table created
  console.log(x)
})
.catch((err) => {
	console.log(err)
});
*/

module.exports = Persona