
var Student = React.createClass({
    render: function() {
        return (<div>
            <h1>First Name</h1>
        </div>)
    }
});

var StudentList = React.createClass({
   getInitialState: function() {
       return {
           studentList: []
       }
   },
    componentWillMount: function() {

      var ReactThis = this;

        axios.get('http://localhost:3000/api/students')
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
       return (
           <div>
           <h1>Student List:</h1>
        {this.state.studentList.map(function(student) {
            return <Student/>;
       })}
           </div>
        );
    }
});

ReactDOM.render(
    <StudentList/>, document.getElementById('app')
);