var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('statics'));

mongoose.connect('mongodb://localhost/webdxd');

var studentSchema = {
    firstName: String,
    lastName: String,
    age: Number,
    email: String
};

var Student = mongoose.model('Student', studentSchema, 'students');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/students', function (req, res) {
    Student.find().exec(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
            // res.render('index', { title: 'WebDxD Students', students: doc});
        }
    });
});

app.delete('/api/student/:id', function(req, res) {
    var studentId = req.params.id;
    Student.findOneAndRemove({_id: studentId}, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    });
});

app.get('/api/student/:id', function(req, res) {
    var studentId = req.params.id;
    Student.findById(studentId, function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            res.send(doc);
        }
    });
});

app.get('/student', function (req, res) {
   res.send('Student List!');
});

app.get('/student/:id' ,function (req, res) {
    var studentId = req.params.id;
    Student.findById(studentId, function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            res.render('student',{ student: doc});
        }
    });
});

app.post('/student', function(req, res) {
    var updateStudent = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email
    };
    Student.findOneAndUpdate({_id: req.body.id}, updateStudent, {new: true}, function(err, doc){
       res.send(doc);
    });
});

app.post('/api/student/new', function(req, res) {
    if (req.body._id) {
        // Update student
        Student.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, function (err, doc) {
           res.send(doc);
        });

    } else {
        // Create new student
        var newStudent = new Student(req.body);
        newStudent.save(function(err, doc) {
            if (err) {
                console.log(err);
            } else {
                res.send(doc);
            }
        });
    }
});

app.get('/chat', function(req, res) {
    res.render('chat', {});
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!');
// });

http.listen(3000, function(){
    console.log('Server listening on *:3000');
});