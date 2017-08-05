//modelos

const Persona = require('./modelos/persona')

const Permiso = require('./modelos/permisos')

const Usuario = require('./modelos/usuarios')


/*
	Tablas padres:
		Persona
		Permiso
		Usuario
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

Usuario.sync({force: true}).then((x) => {

  // Table created
  console.log(x)

})
.catch((err) => {

	console.log(err)
	
})

