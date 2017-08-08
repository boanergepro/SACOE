//Modelos

const Persona = require('../modelos/persona')
const Heredad = require('../modelos/heredad')
const FaseGanar = require('../modelos/fase_ganar')
const Usuario = require('../modelos/usuario')

//Configuraciones
const config = require('../config')

const moment = require('moment')


//Base de datos
const db = require('../db')

const conexionDB = db.getConecctionDb();

const Sequelize = require('sequelize')

//Variable bandera para ver si esta logeado el admin
var auth = false

//Renderizar login
function verLogin (req, res) {
	
	res.render('index')
}

function inicioSesion (req, res) {

	console.log(req.session)

	let user = req.body.nombre
	let pass = req.body.password

	Usuario.find({
		where: {
			username: user
		}
	}).then(usuario => {

		if (usuario){

			let datos_usuario ={
				username: usuario.username,
				rol_id: usuario.rol_id
			}
			if (usuario.password == pass){
				req.session.datos_usuario = datos_usuario

				res.redirect('/inicio')
			}else{
				
				//Dotos incorrectos
				res.redirect('/')

			}
		}

		res.redirect('/')

	})

	
}

//Ver la vista inicio
function verInicio (req, res) {
	
	res.render('inicio')
	
}

//Vista del formulario para crear registros
function verFormReg (req, res) {

	//Consulta a la tabla heredad pra renderizar
	Heredad.findAll().then(heredades => {

		res.render('persona/nuevo', { datos: heredades })

	}).catch(err => {

		console.log(`Ha ocurrido un error  en la consulta de las heredades ${err}`)
	})
}

//Agregar la persona ganada
function agregarReg(req, res) {

	let fechaNacimiento = new Date(req.body.fecha_nacimiento)

	let fechaGanado = new Date(req.body.fecha_contactado)
	
	
	let dataTablaPersona = {

		nombre: req.body.nombre,
		apellido: req.body.apellido,
		sexo: req.body.sexo,
		nacionalidad: req.body.nacionalidad,
		ocupacion: req.body.ocupacion,
		ciudad: req.body.ciudad,
		telefono: req.body.telefono,
		correo: req.body.correo,
		direccion: req.body.direccion,
		fecha_nacimiento: fechaNacimiento,
		heredad_id: req.body.heredad,
		estado_personas: 'a'
	}
	
	let dataTablaFaseGanar = {
		
		fecha_contactado: fechaGanado,
		lugar_contacto: req.body.lugar_contacto,
		invitado_por: req.body.invitado_por,
		fecha_visitar: req.body.fecha_visitar,
		celula_insertar: req.body.celula_insertar,
		peticion_oracion: req.body.peticion_oracion,
		estado_fase_ganar: 'a'
	}
	

	Persona.create(dataTablaPersona).then((persona) => {
		Object.assign(dataTablaFaseGanar,{
			persona_id: persona.id
		})
		FaseGanar.create(dataTablaFaseGanar).then(() => {
			res.redirect('inicio')

		}).catch((err) => {
			console.log(`No se pudo crear la persona porque: ${err}`)
		})
	})

	console.log({persona: req.body})
	
}

//ver todas las personas  del base de datos sin heredad
function verTodo (req, res) {
	if(auth) {
		
		Persona.findAll({
			where: {
				heredad: '',
				estado_personas: 'a'
			}
		}).then(doc => {
			//Si hay personas en la base de datos...
			if (doc.length > 0) {

				res.render('persona/todos', { persona: doc})
				console.log(doc)
			
			}
			else if (doc.length < 1) {

				res.send('No hay personas sin heredad asignada en la base de datos')
				
			}
			
		}).catch(err => {

			if (err) return console.log(`Ha ocurrido el siguiente error al hacer la consulta ${err}`)

		})

	}else{
		res.redirect('../errores/vista403')
	}
}

function ganados (req, res) {

	//Consultar la cantidad de personas en cada heredad
	conexionDB.query(`SELECT

						heredades.nombre,heredades.codigo, count(personas.id) AS total
						FROM personas 
						RIGHT JOIN heredades ON heredades.id = personas.heredad_id AND personas.estado_personas = 'a'
						GROUP BY heredades.nombre, heredades.codigo,heredades.id
						ORDER by heredades.id
					`,

				{model: Persona}).then((results) => {

  					console.log(results)
  					res.render('persona/', {datos: results})
  					
				}).catch(err => {
					if (err) return console.log(err)
				})
}

function verRegById (req, res) {
	let id = req.params.id

	Persona.findById(id).then(doc => {
		
		res.render('persona/ver', { persona: doc })

	}).catch(err => {

		if (err) return console.log(`Ha ocurrido el siguiente error al hacr la consulta ${err}`)
	
	})
}

var codigoHeredad = ""
var red = ""

function verVistaHeredad (req, res) {
	codigoHeredad = req.params.num
	let url = `/persona/heredad/${codigoHeredad}/red`
	res.redirect(url)
}

function verVistaRedes (req, res) {

	conexionDB.query(`SELECT

			              sum( 
			                CASE WHEN (
			                  (edad BETWEEN 6 AND 12) AND (estado_personas = 'a') AND (estado_fase_ganar = 'a')
			                  ) THEN 1 ELSE 0 END
			                ) as red_ninos,
			              sum( 
			                CASE WHEN (
			                  (edad BETWEEN 13 AND 17) AND (estado_personas = 'a') AND (estado_fase_ganar = 'a')
			                  ) THEN 1 ELSE 0 END
			                ) as red_prejovenes,
			              sum( 
			                CASE WHEN (
			                  (edad BETWEEN 18 AND 24) AND (estado_personas = 'a') AND (estado_fase_ganar = 'a')
			                  ) THEN 1 ELSE 0 END
			                ) as red_jovenes,
			              sum( 
			                CASE WHEN (
			                  (edad BETWEEN 25 AND 100) AND (sexo = 'f') AND (estado_personas = 'a') AND (estado_fase_ganar = 'a')
			                  ) THEN 1 ELSE 0 END
			                ) as red_mujeres,
			                sum( 
			                CASE WHEN (
			                  (edad BETWEEN 25 AND 100) AND (sexo = 'm') AND (estado_personas = 'a') AND (estado_fase_ganar = 'a')
			                  ) THEN 1 ELSE 0 END
			                ) as red_hombres
		          
		                
		            FROM vista_datos_personas
		            WHERE codigo = :heredad`, 
				{ replacements: { heredad: codigoHeredad}, type: conexionDB.QueryTypes.SELECT},
				{model: Persona}).then((results) => {

  					console.log(results[0].red_ninos)
  					res.render('persona/redes', {dato: results[0], codigoHeredad})
  					
				}).catch(err => {
					if (err) return console.log(err)
				})

}
/*
function verVistaFiltrado (req, res) {

	red = req.params.red
	
	//res.redirect('/persona/heredad/:codigoHeredad/red/:red/todos')

}*/

function verFitradoFinal (req, res) {
	red = req.params.red
	let min = 0
	let max = 0
	let sexo = null

	if (red == "ninos") {
		min = 6
		max = 12
		sexo = null
	}
	if (red == "pre-jovenes") {
		min = 13
		max = 17
		sexo = null
	}
	if (red == "jovenes") {
		min = 18
		max = 24
		sexo = null
	}
	if (red == "mujeres") {
		min = 25
		max = 100
		sexo = "f"
	}
	if (red == "hombres") {
		min = 25
		max = 100
		sexo = "m"
	}
	console.log(`min ${min} y max ${max}`)
	if (red == "todos"){
		conexionDB.query('SELECT * FROM vista_datos_personas WHERE codigo = :heredad AND estado_personas = :estado AND estado_fase_ganar = :estado', 
				{ replacements: { heredad: codigoHeredad, estado: 'a' }, type: conexionDB.QueryTypes.SELECT},
				{model: Persona}).then((personas) => {
  					console.log(personas)
  					res.render('persona/verFiltrado', {persona: personas})
		})
	}

	/*Si sexo = null la red seleccionada en ! hombres && mujeres*/
	else if (sexo == null){

		conexionDB.query('SELECT * FROM vista_datos_personas WHERE codigo = :heredad AND estado_personas = :estado AND estado_fase_ganar = :estado AND edad BETWEEN :min AND :max', 
				{ replacements: { heredad: codigoHeredad, estado: 'a', min: min, max: max }, type: conexionDB.QueryTypes.SELECT},
				{model: Persona}).then((personas) => {
  					console.log(personas)
  					res.render('persona/verFiltrado', {persona: personas})
		})

	}

	/*Si sexo != null entonces la red es = hombres || mujeres*/
	else{
		conexionDB.query('SELECT * FROM vista_datos_completos WHERE heredad = :heredad AND sexo = :sexo AND edad BETWEEN :min AND :max', 
				{ replacements: { heredad: numHeredad, sexo: sexo, min: min, max: max }, type: conexionDB.QueryTypes.SELECT},
				{model: Persona}).then((personas) => {
  					console.log(personas)
  					res.render('persona/verFiltrado', {persona: personas})
		})
	}
	
}
let idEditar = ""


//Vistar formulario editar Editar 
function vistaEditar (req, res) {

	let id = req.params.id
	console.log(id)
	idEditar = id

	let datosPersona = {}
	let datos_fase_ganar = {}

	Persona.find({
		where: {
			id: id
		}
	}).then(persona => {

		datosPersona = persona

		FaseGanar.find({

			where: {
				persona_id: id
			}

		}).then(persona_fase_ganar => {

			datos_fase_ganar = persona_fase_ganar

			Heredad.findAll().then(heredades => {

				res.render('persona/editar',{persona: datosPersona, personaGanar: datos_fase_ganar, data_heredades: heredades})
			})

			
			

		}).catch(err => {
			if (err) return console.log(`Ha ocurrido el siguiente error al editar la persona ${err}`)
		})

	}).catch(err => {
		if (err) return console.log(err)
	})
}

//Guardar cambios luego de haber editado el documento
function saveEditar (req, res) {

	let dataTablaPersona = {

		nombre: req.body.nombre,
		apellido: req.body.apellido,
		sexo: req.body.sexo,
		nacionalidad: req.body.nacionalidad,
		ocupacion: req.body.ocupacion,
		ciudad: req.body.ciudad,
		telefono: req.body.telefono,
		correo: req.body.correo,
		direccion: req.body.direccion,
		fecha_nacimiento: req.body.fecha_nacimiento,
		heredad: req.body.heredad
	}
	
	let dataTablaFaseGanar = {
		
		fecha_contactado: req.body.fecha_contactado,
		lugar_contacto: req.body.lugar_contacto,
		invitado_por: req.body.invitado_por,
		fecha_visitar: req.body.fecha_visitar,
		celula_insertar: req.body.celula_insertar,
		peticion_oracion: req.body.peticion_oracion,
	}

	Persona.update(dataTablaPersona, {
		where:{
			id: idEditar
		}

	}).then(() => {

		FaseGanar.update(dataTablaFaseGanar, {
			where:{
				persona_id: idEditar
			}
		}).then(() => {
			res.redirect('/persona/')

		}).catch(err => {
			if (err) return console.log(`Ha ocurrido este error al guardar los datos de la fase ganar: ${err}`)
		})
	}).catch(err => {
		if (err) return console.log(`Ha ocurrido este error al editar la persona ${err}`)
	})
}

//Eliminar registros
 function borrarUno (req, res) {
 	/*
		La accion eliminar no se llevara a cabo debido a la cantidad de
		relaciones entre tablas, tan solo se cambiara el valor de un campo
		en las tablas donde exista dicho registro, esta campo tiene por nombre
		estado_ + el nombre de la tabla, dicho campo solo puede tener dos valores
		'a' si el resgistro esta activo y puede ser objeto interaccion por parte 
		del usuario, e 'i' si esta inactivo, en este estado no se podra tener 
		control del registro con dicho estado.
 	*/
 	let id = req.params.id

 	Persona.update({
 		estado_personas : 'i'
 	},{
 		where: {
 			id: id
 		}
 	}).then(() => {
 		FaseGanar.update({
 			estado_fase_ganar: 'i'
 		},{
 			where: {
 				persona_id: id
 			}
 		})

 		res.redirect('/persona/')

 	}).catch(err => {
 		console.log(`Ha ocurrido el siguiente error al intentar borrar el registro: ${err}`)
 	})
 }

 function vistaEstadisticas (req, res) {
 	res.render('persona/estadisticas')
 }

//Cerrar secion
function cerrarSecion (req, res) {
	auth = false
	res.redirect('/')
}


module.exports = {

	verLogin,
	inicioSesion,
	verInicio,
	verFormReg,
	agregarReg,
	verTodo,
	ganados,
	verRegById,
	verVistaHeredad,
	verVistaRedes,
	//verVistaFiltrado,
	verFitradoFinal,
	vistaEditar,
	saveEditar,
	borrarUno,
	vistaEstadisticas,


	cerrarSecion
}