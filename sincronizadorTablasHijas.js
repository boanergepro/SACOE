const FaseGanar = require('./modelos/fase_ganar')

const FaseGanarLlamadas = require('./modelos/fase_ganar_llamadas')

const FaseGanarVisitas = require('./modelos/fase_ganar_visitas')

const Usuario = require('./modelos/usuario')

/*
	Tablas hijas:
		FaseGanar
		FaseGanarLlamadas
		FaseGanarVisitas
		Usuarios

*/

FaseGanar.sync({force: true}).then((x) => {

  // Table created
  console.log(x)

})
.catch((err) => {

	console.log(err)
	
})

FaseGanarLlamadas.sync({force: true}).then((x) => {

  // Table created
  console.log(x)

})
.catch((err) => {

	console.log(err)
	
})

FaseGanarVisitas.sync({force: true}).then((x) => {

  // Table created
  console.log(x)

})
.catch((err) => {

	console.log(err)
	
})


Usuario.sync({force: true}).then((x) => {

  // Table created
  console.log(x)

})
.catch((err) => {

	console.log(err)
	
})