var host = 'http://localhost:3000/api/';

var Student = React.createClass({
    handleStudentClick: function() {
        var ReactThis = this;
        axios.get(host + 'student/' + this.props.data._id)
            .then(function(response) {
                ReactThis.props.update(response.data);
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    render: function() {
        return (<div>
            <h1 onClick={this.handleStudentClick}>{this.props.data.firstName}</h1>
        </div>)
    }
});

var StudentDetail = React.createClass({

    render: function() {
        return(<div className="student-detail">
            <span>First Name</span>
            <p>{this.props.data.firstName}</p>
            <span>Last Name</span>
            <p>{this.props.data.lastName}</p>
            <span>Age</span>
            <p>{this.props.data.email}</p>
            <span>Email</span>
            <p>{this.props.data.age}</p>
        </div>)
    }

});

var StudentForm = React.createClass({
    submitForm: function() {
        var newStudent = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            age: document.getElementById('age').value,
            email: document.getElementById('email').value
        };
        var ReactThis = this;
        axios.post(host + 'student/new', newStudent)
            .then(function(response) {
                ReactThis.props.insert(response.data);

            })
            .catch(function(err) {
                console.log(err);
            })

    },
    render: function() {
        return (
            <div>
                <input type="text" placeholder="first name" id="firstName"/>
                <input type="text" placeholder="last name" id="lastName"/>
                <input type="text" placeholder="age" id="age"/>
                <input type="text" placeholder="email" id="email"/>
                <button onClick={this.submitForm}>Submit</button>
            </div>
        )
    }
});

var StudentList = React.createClass({

    insertStudent: function(data) {
        var tempStudent = this.state.studentList;
        tempStudent.push(data);
        this.setState({
            studentList: tempStudent,
            showForm: false
        });

    },

    updateDetail: function(data) {
        this.setState({
            studentDetail: data
        });
    },

    getInitialState: function() {
        return {
            studentList: [],
            studentDetail: {},
            showForm: false,
        }
    },
    componentWillMount: function() {

        var ReactThis = this;

        axios.get(host + 'students')
            .then(function(response) {
                ReactThis.setState({
                    studentList: response.data
                });
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    showAddNewForm: function() {
        this.setState({
            showForm: true
        });
    },
    render: function() {
        var ReactThis = this;
        if (this.state.studentDetail.firstName) {
            var sdNode = <StudentDetail data={this.state.studentDetail}/>
        } else {
            var sdNode = "";
        }
        return (
            <div>
                <div className="student-list">
                    {this.state.studentList.map(function(student) {
                        return <Student key={student._id} data={student} update={ReactThis.updateDetail} />;
                    })}

                    <div onClick={this.showAddNewForm}>
                        <h1 className="add-new">Add New</h1>
                    </div>
                </div>
                {sdNode}

                { this.state.showForm ? <StudentForm insert={this.insertStudent}/> : ""}
            </div>
        );
    }
});

ReactDOM.render(
    <StudentList/>, document.getElementById('app')
);