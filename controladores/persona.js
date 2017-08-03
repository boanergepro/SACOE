const Personas = require('../modelos/persona')
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
function inicioSecion (req, res) {

	console.log(req.session)
	
	let user = req.body.nombre
	let pass = req.body.password

	if (user == config.user && pass == config.pass) {
		auth = true
		if(auth) {
			res.redirect('inicio')
		}
	
	}else{
		auth = false
		res.render('index')
	}
}

//Ver la vista inicio
function verInicio (req, res) {
	
	if(auth) {
		
		res.render('inicio')
	
	}else{

		res.redirect('errores/vista403')
	}
}

//Vista del formulario para crear registros
function verFormReg (req, res) {
	if (auth) {
		res.render('persona/nuevo')
	}else{
		res.redirect('../errores/vista403')
	}
}

//Agregar la persona ganada
function agregarReg(req, res) {

	let fechaNacimiento = new Date(req.body.fechaNacimiento)

	let fechaGanado = new Date(req.body.fechaGanado)
	
	
	let data = {

		fecha: fechaGanado,
		lugar: req.body.lugar,
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		sexo: req.body.sexo,
		nacionalidad: req.body.nacionalidad,
		ocupacion: req.body.ocupacion,
		ciudad: req.body.ciudad,
		telefono: req.body.telefono,
		invitado_por: req.body.invitadoPor,
		correo: req.body.correo,
		fecha_visitar: req.body.fechaVisitar,
		direccion: req.body.direccion,
		celula_insertar: req.body.celulaInsertar,
		peticion_oracion: req.body.peticionOracion,
		fecha_registro: req.body.fechaRegistro,
		fecha_nacimiento: fechaNacimiento,
		heredad: req.body.heredad
	}

	Personas.create(data);

	console.log({persona: req.body})
	
	res.redirect('inicio')
}

//ver todas las personas  del base de datos sin heredad
function verTodo (req, res) {
	if(auth) {
		
		Personas.findAll({
			where: {
				heredad: ''
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

							sum( 
							  CASE WHEN heredad = '1' THEN 1 ELSE 0 END
							  ) as heredad1,
							sum( 
							  CASE WHEN heredad = '2' THEN 1 ELSE 0 END
							  ) as heredad2,
							sum( 
							  CASE WHEN heredad = '3' THEN 1 ELSE 0 END
							  ) as heredad3,
							sum( 
							  CASE WHEN heredad = '4' THEN 1 ELSE 0 END
							  ) as heredad4,
							  sum( 
							  CASE WHEN heredad = '5' THEN 1 ELSE 0 END
							  ) as heredad5,
							sum( 
							  CASE WHEN heredad = '6' THEN 1 ELSE 0 END
							  ) as heredad6,
							  sum( 
							  CASE WHEN heredad = '7' THEN 1 ELSE 0 END
							  ) as heredad7,
							sum( 
							  CASE WHEN heredad = '8' THEN 1 ELSE 0 END
							  ) as heredad8,
							  sum( 
							  CASE WHEN heredad = '9' THEN 1 ELSE 0 END
							  ) as heredad9,
							sum( 
							  CASE WHEN heredad = '10' THEN 1 ELSE 0 END
							  ) as heredad10,
							  sum( 
							  CASE WHEN heredad = '11' THEN 1 ELSE 0 END
							  ) as heredad11,
							sum( 
							  CASE WHEN heredad = '12' THEN 1 ELSE 0 END
							  ) as heredad12,
							  sum( 
							  CASE WHEN heredad = '' THEN 1 ELSE 0 END
							  ) as todos
							  
						FROM personas`,

				{model: Personas}).then((results) => {

  					console.log(results[0])
  					res.render('persona/', {dato: results[0].dataValues})
  					
				}).catch(err => {
					if (err) return console.log(err)
				})
}

function verRegById (req, res) {
	let id = req.params.id

	Personas.findById(id).then(doc => {
		
		res.render('persona/ver', { persona: doc })

	}).catch(err => {

		if (err) return console.log(`Ha ocurrido el siguiente error al hacr la consulta ${err}`)
	
	})
}

var numHeredad = ""
var red = ""

function verVistaHeredad (req, res) {
	numHeredad = req.params.num

	res.redirect('/persona/redes')
}

function verVistaRedes (req, res) {

	conexionDB.query(`SELECT

			              sum( 
			                CASE WHEN (
			                  edad BETWEEN 6 AND 12
			                  ) THEN 1 ELSE 0 END
			                ) as red_ninos,
			              sum( 
			                CASE WHEN (
			                  edad BETWEEN 13 AND 17
			                  ) THEN 1 ELSE 0 END
			                ) as red_prejovenes,
			              sum( 
			                CASE WHEN (
			                  edad BETWEEN 18 AND 24
			                  ) THEN 1 ELSE 0 END
			                ) as red_jovenes,
			              sum( 
			                CASE WHEN (
			                  (edad BETWEEN 25 AND 100) AND (sexo = 'f')
			                  ) THEN 1 ELSE 0 END
			                ) as red_mujeres,
			                sum( 
			                CASE WHEN (
			                  (edad BETWEEN 25 AND 100) AND (sexo = 'm')
			                  ) THEN 1 ELSE 0 END
			                ) as red_hombres
		          
		                
		            FROM vista_datos_completos
		            WHERE heredad = :heredad`, 
				{ replacements: { heredad: numHeredad}, type: conexionDB.QueryTypes.SELECT},
				{model: Personas}).then((results) => {

  					console.log(results[0].red_ninos)
  					res.render('persona/redes', {dato: results[0]})
  					
				}).catch(err => {
					if (err) return console.log(err)
				})

}

function verVistaFiltrado (req, res) {

	red = req.params.red
	
	res.redirect('/persona/verFiltrado')

}

function verFitradoFinal (req, res) {

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

	if (red == "todos"){
		conexionDB.query('SELECT * FROM vista_datos_completos WHERE heredad = :heredad', 
				{ replacements: { heredad: numHeredad }, type: conexionDB.QueryTypes.SELECT},
				{model: Personas}).then((personas) => {
  					console.log(personas)
  					res.render('persona/verFiltrado', {persona: personas})
		})
	}

	/*Si sexo = null la red seleccionada en ! hombres && mujeres*/
	else if (sexo == null){

		conexionDB.query('SELECT * FROM vista_datos_completos WHERE heredad = :heredad AND edad BETWEEN :min AND :max', 
				{ replacements: { heredad: numHeredad, min: min, max: max }, type: conexionDB.QueryTypes.SELECT},
				{model: Personas}).then((personas) => {
  					console.log(personas)
  					res.render('persona/verFiltrado', {persona: personas})
		})

	}

	/*Si sexo != null entonces la red es = hombres || mujeres*/
	else{
		conexionDB.query('SELECT * FROM vista_datos_completos WHERE heredad = :heredad AND sexo = :sexo AND edad BETWEEN :min AND :max', 
				{ replacements: { heredad: numHeredad, sexo: sexo, min: min, max: max }, type: conexionDB.QueryTypes.SELECT},
				{model: Personas}).then((personas) => {
  					console.log(personas)
  					res.render('persona/verFiltrado', {persona: personas})
		})
	}
	
}

//Vistar formulario editar Editar 
function vistaEditar (req, res) {

	let id = req.params.id
	idEditar = id

	Personas.find({
		where: {
			id: id
		}
	}).then(persona => {
		res.render('persona/editar',{persona: persona})
		console.log(persona)

	}).catch(err => {
		if (err) return console.log(`Ha ocurrido el siguiente error al editar la persona ${err}`)
	})

}
//Guardar cambios luego de haber editado el documento
let idEditar = ""
function saveEditar (req, res) {

	data = {

		fecha: req.body.fechaGanado,
		lugar: req.body.lugar,
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		sexo: req.body.sexo,
		nacionalidad: req.body.nacionalidad,
		ocupacion: req.body.ocupacion,
		ciudad: req.body.ciudad,
		telefono: req.body.telefono,
		invitado_por: req.body.invitadoPor,
		correo: req.body.correo,
		fecha_visitar: req.body.fechaVisitar,
		direccion: req.body.direccion,
		celula_insertar: req.body.celulaInsertar,
		peticion_oracion: req.body.peticionOracion,
		fecha_registro: req.body.fechaRegistro,
		fecha_nacimiento: req.body.fechaNacimiento,
		heredad: req.body.heredad
	}

	Personas.update(data, {
		where:{
			id: idEditar
		}
	}).then(persona => {
		res.redirect('persona/')
		console.log(persona)

	}).catch(err => {
		if (err) return console.log(`Ha ocurrido el siguiente error al editar la persona ${err}`)
	})

	//res.send({persona: data})
}

//Eliminar registros
 function borrarUno (req, res) {

 	let id = req.params.id

	Personas.destroy({
		where: {
			id: id
		}
	}).then(doc => {

		console.log(doc)
		res.redirect('/persona/')

	}).catch(err => {

		if (err) return console.log(`Ha ocurrido el siguiente error al borrar el registro: ${err}`)

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
	inicioSecion,
	verInicio,
	verFormReg,
	agregarReg,
	verTodo,
	ganados,
	verRegById,
	verVistaHeredad,
	verVistaRedes,
	verVistaFiltrado,
	verFitradoFinal,
	vistaEditar,
	saveEditar,
	borrarUno,
	vistaEstadisticas,


	cerrarSecion
}