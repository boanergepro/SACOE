const sequelize = require('sequelize')

 const config = require('./config')

const getConecctionDb = function () {
	
	return new sequelize(config.URI_DB)
}

module.exports = {
	getConecctionDb
}