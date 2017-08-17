//Destinado a las funciones concernientes al contacto con las personas ganadas

//Modelos
const Persona = require('../modelos/persona')
const Llamadas = require('../modelos/fase_ganar_llamadas')
const Visitas = require('../modelos/fase_ganar_visitas')

//Base de datos
const db = require('../db')
const conexionDB = db.getConecctionDb();


function addResultLlamada (req, res) {

	let userLoget = req.user
	//id de la persona a la que se esta accediendo
	let id_persona = req.params.id

	//Buscar datos de la persona
	Persona.findAll({
		where: {
			id: id_persona
		}
	}).then(persona => {

		res.render('persona/contacto/addLlamada',{user: userLoget, datos: persona[0]})

	}).catch(err => {
		console.log(err)
	})
}

function saveResultLlamada (req, res) {

	let id_persona  = req.params.id
	let id_user = req.user.id

	
	dataLlamada = {
		persona_id: id_persona,
		descripcion: req.body.resultado,
		operador: req.body.operador,
		estado_fase_ganar_llamadas: 'a'
	}

	Llamadas.create(dataLlamada).then(() => {
		res.redirect(`/persona/${id_user}`)
	})
	
}


function addResultVisita (req, res) {

	let userLoget = req.user
	//id de la persona a la que se esta accediendo
	let id_persona = req.params.id

	//Buscar datos de la persona
	Persona.findAll({
		where: {
			id: id_persona
		}
	}).then(persona => {

		res.render('persona/contacto/addVisita',{user: userLoget, datos: persona[0]})

	}).catch(err => {
		console.log(err)
	})

}

function saveResultVisita (req, res) {

	let id_persona  = req.params.id
	let id_user = req.user.id

	
	dataVisita = {
		persona_id: id_persona,
		descripcion: req.body.resultado,
		operador: req.body.visitante,
		estado_fase_ganar_visitas: 'a'
	}

	Visitas.create(dataVisita).then(() => {
		res.redirect(`/persona/${id_user}`)
	})

}

module.exports = {
	addResultLlamada,
	saveResultLlamada,
	addResultVisita,
	saveResultVisita
}