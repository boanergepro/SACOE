const Strategy = require('passport-local').Strategy;

//MODELOS
const Usuario = require('../modelos/usuario')

//Estratgia passport
let estrategia = new Strategy(

	function(username, password, cb) {
		Usuario.find({
			where: {
				username: username
			}
		}).then(usuario => {
			if (usuario){
				if (usuario.password != password){
					return cb(null, false)
				}
			}else{
				return cb(null, false)
			}


			return cb(null, usuario)

		}).catch((err) => {
			if (err) { return cb(err); }
		})
	}
)

function serializador(user, cb) {

	cb(null, user.id)

	
}

function desserializador(id, cb) {

	Usuario.find({
		where: {
			id: id
		}
	}).then(usuario => {
		if (usuario) {
			
			cb(null, usuario);

		}
	}).catch(err => {
		return cb(err)
	})
}

module.exports = {
	estrategia,
	serializador,
	desserializador
}