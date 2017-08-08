//modelos

const Persona = require('./modelos/persona')

const Permiso = require('./modelos/permiso')

const Heredad = require('./modelos/heredad')

const Fase = require('./modelos/fase')

const Rol = require('./modelos/rol')

/*
	Tablas padres:
		Persona
		Permiso
		Heredad
		Fase
		Rol
*/



Persona.sync({force: true}).then((x) => {

  // Table created
  console.log(x)

})
.catch((err) => {

	console.log(err)
	
});


Permiso.sync({force: true}).then((x) => {

  // Table created
  console.log(x)

})
.catch((err) => {

	console.log(err)
	
});

Heredad.sync({force: true}).then((x) => {

  // Table created
  console.log(x)

})
.catch((err) => {

	console.log(err)
	
})

Fase.sync({force: true}).then((x) => {

  // Table created
  console.log(x)

})
.catch((err) => {

	console.log(err)
	
})

Rol.sync({force: true}).then((x) => {

  // Table created
  console.log(x)

})
.catch((err) => {

	console.log(err)
	
})