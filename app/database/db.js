const mysql = require('promise-mysql')

module.exports= {
	connection: function(database){
		const db_config = {
		    host: database.host,
		    user: database.user,
		    password: database.password,
		    database: database.databaseName,
		    connectionLimit: 100
		};	
		
		return mysql.createPool(db_config);	
	}
}