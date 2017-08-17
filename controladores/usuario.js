//Modelos
const Usuario =  require('../modelos/usuario')
const Rol = require('../modelos/rol')
const Notificacion = require('../modelos/notificacion')
const CoordinadorHeredad = require('../modelos/coordinadores_heredades')
const CoordinadoresFases = require('../modelos/coordinadores_fases')

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

	dataNotificacion = {
		descripcion: 'Se ah unido el usuario ' + req.body.nombre + " " + req.body.apellido,
		categoria: 'fase_ganar'
	}
	Notificacion.create(dataNotificacion).then(notificacion => {
		console.log('Notificacion creada')
	})
	
	Usuario.create(dataUser).then(persona => {
		res.redirect('/')
	})
}
//Mostar todos los usuarios independientemente de su rol
function usuarios(req, res) {

	let usuarios = null
	let analistas = null
	let coordinadores = null
	let administradores = null

	//Usuarios
	Usuario.findAll({
		where: {
			rol_id: 4
		}
	}).then(results => {

		usuarios = results

		//Analistas
		Usuario.findAll({
			where: {
				rol_id: 3
			}
		}).then(results => {
			
			analistas = results

			//Coordinadores
			Usuario.findAll({
				where: {
					rol_id: 2
				}
			}).then(results => {
				coordinadores =  results

				//Administradores

				Usuario.findAll({
					where: {
						rol_id: 1
					}
				}).then(results => {
				
					administradores = results
					res.render('usuario/', {usuarios, analistas, coordinadores, administradores, rol_id: 1})
				
				}).catch(err => {
					console.log(`Ha ocuarrido un error al consultar los administradores ${err}`)
				})
			}).catch(err => {
				console.log(`Ha ocuarrido un error al consultar los coordinadores ${err}`)
			})
		}).catch(err => {
		console.log(`Ha ocuarrido un error al consultar los analistas ${err}`)
		})

	}).catch(err => {
		console.log(`Ha ocuarrido un error al consultar los usuarios ${err}`)
	})
/*
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
*/
}

//Editar usuario
function editarUsuario(req, res) {

	let usuario_id = req.params.id

	let datosUsuario = {  }
	//Consulta a la tabla usuarios para mostrale al administardor datos de la persona a la que esta editando
	Usuario.find({

		where: {

			id: usuario_id

		}
	}).then(usuario => {
		
		datosUsuario = usuario
		//Consualta a los roles para mostartle el selec con los roles que puede escojer
		Rol.findAll().then(rol => {

			res.render('usuario/editar', {usuario: datosUsuario, roles: rol, rol_id: 1})

		})

	})

}
//Guardar los cambios del rol del usuario
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
function eliminarUsuario (req,res) {
	let usuario_id = req.params.id

	Usuario.destroy({
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
	saveEdicion,
	eliminarUsuario
}