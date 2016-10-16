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
            <h2 onClick={this.handleStudentClick}>{this.props.data.firstName}</h2>
        </div>)
    }
});

var StudentDetail = React.createClass({

    render: function() {
        return(<div>
            <h2>First Name: {this.props.data.firstName}</h2>
            <h2>Last Name: {this.props.data.lastName}</h2>
            <h2>Email: {this.props.data.email}</h2>
            <h2>Age: {this.props.data.age}</h2>
        </div>)
    }

});

var StudentList = React.createClass({

    updateDetail: function(data) {
        this.setState({
            studentDetail: data
        });
    },

   getInitialState: function() {
       return {
           studentList: [],
           studentDetail: {}
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
    render: function() {
        var ReactThis = this;
        if (this.state.studentDetail.firstName) {
            var sdNode = (
                <div>
                    <h1>Student Detail:</h1>
                    <StudentDetail data={this.state.studentDetail}/>
                </div>
            )
        } else {
            var sdNode = "";
        }
       return (
           <div>
           <h1>Student List:</h1>
        {this.state.studentList.map(function(student) {
            return <Student key={student._id} data={student} update={ReactThis.updateDetail} />;
       })}
               {sdNode}
           </div>
        );
    }
});

ReactDOM.render(
    <StudentList/>, document.getElementById('app')
);