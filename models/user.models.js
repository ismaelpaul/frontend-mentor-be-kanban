const db = require('../db/connection');

exports.selectUsers = () => {
	return db.query(`SELECT * FROM users`).then((result) => result.rows);
};

exports.insertUser = (first_name, last_name, email, password) => {
	return db
		.query(
			`INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING users.user_id, users.first_name, users.last_name, users.email, users.avatar;`,
			[first_name, last_name, email, password]
		)
		.then((result) => {
			return result.rows[0];
		});
};
