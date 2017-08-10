//Modelos

const Usuario =  require('../modelos/usuario')
const Rol = require('../modelos/rol')

//Configuraciones
const config = require('../config')

const moment = require('moment')


//Base de datos
const db = require('../db')

const conexionDB = db.getConecctionDb();

const Sequelize = require('sequelize')

function registro(req, res) {

	dataUser = {
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		username: req.body.username,
		password: req.body.password
	}
	
	Usuario.create(dataUser).then((persona) => {
		res.redirect('/')
	})
}

function usuarios(req, res) {

	conexionDB.query(`

		SELECT
		
			usuarios.id AS usuario_id,
			usuarios.nombre,
			usuarios.apellido,
			usuarios.username,
			roles.id AS rol_id,
			roles.nombre AS rol

			FROM usuarios
			INNER JOIN roles ON roles.id = usuarios.rol_id
						
			`,

			{model: Usuario}
	).then((results) => {

		console.log(results)
		res.render('usuario/', {datos: results, rol_id: 1})

  					
	}).catch(err => {
		if (err) return console.log(err)
	})
}

function editarUsuario(req, res) {

	let usuario_id = req.params.id

	let datosUsuario = {}

	Usuario.find({
		where: {
			id: usuario_id
		}
	}).then(usuario => {
		datosUsuario = usuario

		Rol.findAll().then(rol => {

			res.render('usuario/editar', {usuario: datosUsuario, roles: rol, rol_id: 1})

		})

	})

}

function saveEdicion(req, res) {

	let usuario_id = req.params.id
	//Id del rol
	let rol = {
		rol_id: req.body.rol
	}


	Usuario.update(rol,{
		where: {
			id: usuario_id
		}
	}).then(() => {
		res.redirect('/usuarios')
	})
}


module.exports = {

	registro,
	usuarios,
	editarUsuario,
	saveEdicion
}