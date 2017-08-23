module.exports = {
	port: process.env.PORT || 3001,
	URI_DB : process.env.DATABASE_URL || 'postgres://postgres:123456@localhost:5432/sacoeDB'
}