const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const auth = require("./auth.json");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))

const MongoClient = require('mongodb').MongoClient

MongoClient.connect(auth.url, { useNewUrlParser: true }, (err, database) => {
	
	if (err) return console.log(err);
	
	db = database.db('todo-list');

	app.listen(3000, () => {
		console.log('listening on 3000');
		
	});
});

app.get('/', (req, res) => {

	db.collection('tasks').find().toArray(function(err, result) {
		if (err) return console.log(err);

		res.render('index.ejs', {tasks: result});
	});
});

app.post('/tasks', (req, res) => {
	db.collection('tasks').save(req.body, (err, result) => {
		if (err) return console.log(err)

		console.log('saved to database')

		res.redirect('/')
	})
});