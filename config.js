module.exports = {
	port: process.env.PORT || 3001,
	URI_DB: process.env.DATABASE_URL || 'postgres://postgres:parangaturimicuaro@localhost:5432/sacoeDB',
	token: '416976554:AAFaGFd_3FpW-GEGPrfN98Uze8ThfdJb8NU', //telegram token
	url: 'https://sacoe.herokuapp.com' //url despliegue en heroku
};