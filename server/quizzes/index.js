const fs = require('fs');
// biblioteca que gera valores aleatorios
const { faker } = require('@faker-js/faker');
let db;

function getLevel(number) {
	return number % 2 == 0 ? 'easy' : 'hard';
}

module.exports = function (server, bodyParser) {
	try {
		db = require('./db.json');
	} catch (error) {
		// only will enter here if there is no db.json file
		const json = {
			data: Array.from(Array(10).keys()).map(() => ({
				id: faker.random.alphaNumeric(5),
				title: faker.lorem.sentence(),
				level: getLevel(faker.random.numeric(2)),
				time: faker.random.numeric(2),
				description: faker.lorem.sentence(),
				createdAt: faker.date.between(),
				updatedAt: faker.date.between(),
				answer: faker.lorem.sentence(),
			})),
		};

		fs.writeFileSync(`${__dirname}/db.json`, JSON.stringify(json));
		db = require('./db.json');
	}

	server.get('/quizzes', function (req, res) {
		data = db.data;

		// if quizs not found return error
		if (data.length == 0) {
			res.status(404).send('Not found');
		}

		res.jsonp(db.data);
	});

	server.get('/quizzes/:id', function (req, res) {
		const id = req.params.id;

		const quiz = db.data.find((q) => q.id === id);

		// if quiz not found return error
		if (!quiz) {
			res.status(404).jsonp({ error: 'quiz not found' });
		}

		res.jsonp(quiz);
	});

	server.use(bodyParser);
	server.post('/quizzes', function (req, res) {
		// create a new quiz
		const quiz = {
			id: faker.random.alphaNumeric(5),
			...req.body,
			updatedAt: new Date(),
			createdAt: new Date(),
		};

		// add quiz to db
		db.data.push(quiz);

		// overwrite db.json file
		fs.writeFileSync(`${__dirname}/db.json`, JSON.stringify(db));

		// return quiz to client
		res.status(201).jsonp(quiz);
	});

	server.use(bodyParser);
	server.put('/quizzes/:id', function (req, res) {
		const id = req.params.id;
		// find quiz in db
		const quiz = db.data.find((q) => q.id === id);

		// if quiz not found return error
		if (!quiz) {
			res.status(404).jsonp({ error: 'quiz not found' });
		}

		// update quiz
		const updatedquiz = { ...quiz, ...req.body, updatedAt: new Date() };

		// update db
		const index = db.data.indexOf(quiz);

		// replace quiz data in db
		db.data[index] = updatedquiz;

		// overwrite db.json file
		fs.writeFileSync(`${__dirname}/db.json`, JSON.stringify(db));

		// return quiz to client
		res.status(200).jsonp(updatedquiz);
	});

	server.delete('/quizzes/:id', function (req, res) {
		const id = req.params.id;

		// find quiz in db
		const quiz = db.data.find((q) => q.id === id);

		// if quiz not found return error
		if (!quiz) {
			res.status(404).jsonp({ error: 'quiz not found' });
		}

		// remove quiz from db
		db.data.splice(db.data.indexOf(quiz), 1);

		// overwrite db.json file
		fs.writeFileSync(`${__dirname}/db.json`, JSON.stringify(db));

		// return quiz to client
		res.status(200).jsonp(quiz);
	});
};
