var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

/* Home page. list all todos */
router.get('/', function(req, res, next) {
    Todo.find().sort('-updated_at').exec(function(err, todos) {
        if (err) return next(err);
        res.render('index', {
            title: 'Todo via Node.js & Express',
            todos: todos
        });
    });
});

/* edit todo */
router.get('/edit/:id', function(req, res, next) {
    Todo.find().sort('-updated_at').exec(function(err, todos) {
        if (err) return next(err);
        res.render('edit', {
            title: 'Todo via Node.js & Express',
            todos: todos,
            current: req.params.id
        });
    });
});


/* 新增 todo 後, redirect to / */
router.post('/create', function(req, res, next) {
    new Todo({
        content: req.body.content,
        updated_at: Date.now()
    }).save(function(err, todo, count) {
        if (err) return next(err);
        res.redirect('/');
    });
});


/* 更新 message 後, redirect to / */
router.post('/update/:id', function(req, res, next) {
    Todo.findById(req.params.id).exec(function(err, todo) {
        if (err) return next(err);
        todo.content = req.body.content;
        todo.updated_at = Date.now();
        todo.save(function(err, todo, count) {
            res.redirect('/');
        });
    });
});

/* 刪除 todo 後, redirect to / */
router.get('/destory/:id', function(req, res, next) {
    Todo.findById(req.params.id, function(err, todo) {
        todo.remove(function(err, todo) {
            if (err) return next(err);
            res.redirect('/');
        });
    });
});


module.exports = router;
