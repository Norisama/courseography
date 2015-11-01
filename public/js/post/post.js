var CourseCode = React.createClass({
    getInitialState: function() {
        return {
            selected: false,
            infoOpened: false
        }
    },

    componentWillMount: function() {
        this.setState({selected: getCookie(this.props.courseIDs[0]) === 'active'});
    },

    toggleFullInfo: function() {
        this.setState({infoOpened: !this.state.infoOpened});
    },

    getCategoryName: function() {
        var categoryName = '';

        var editedCourseNames = this.props.courseIDs.map(function (course) {
            return course.toUpperCase() + 'H';
        });

        if (this.props.courseIDs[0] === 'mat135') {
            // special case for calculus requirement since it doesn't fit the same pattern
            return '(MAT135H and MAT136H) or MAT137Y or MAT157Y';
        } else { 
            return editedCourseNames.join(" or ");
        }
    },

    render: function() {

        var classes = 'course';
        var infoClasses = 'more-info';

        if (this.state.selected) {
            classes += " selected";
        }

        if (this.state.infoOpened) {
            infoClasses += ' info_opened'
        }

        return (
            <div id ={this.props.courseIDs[0]} className={classes}>
                <p className="code" onClick={this.toggleFullInfo}> {this.getCategoryName()} </p>
                <div id = {this.props.courseIDs[0] + '_info'} className={infoClasses}>
                    {this.props.courseIDs.map(function (course) {
                         return <p className="full_name"> {getCourseTitle(course)} </p>
                    })}
                </div>
            </div>
        );
    }
})

var MultipleCourseCode = React.createClass({
    getInitialState: function() {
        return {
            completed: false,
            completedTextBoxes: 0,
            infoOpened: false
        }
    },
    
    toggleFullInfo: function() {
        this.setState({infoOpened: !this.state.infoOpened});
    },

    checkIfCompleted: function() {
       this.setState({completed: this.state.completedTextBoxes === this.props.data.textBoxNumber});
    },

    handleKeyDown: function(e) {
        if (e.keyCode === 13) {
            if (this.state.completedTextBoxes < this.props.data.textBoxNumber) {
                 this.setState({completedTextBoxes: this.state.completedTextBoxes +=1})
            }

            this.checkIfCompleted();
        }  
    },

    render: function() {

        var classes = 'course';
        var infoClasses = 'more-info';

        if (this.state.completed) {
            classes += " .selected";
        }

        if (this.state.infoOpened) {
            infoClasses += ' info_opened'
        }

        var me = this;

        return (
            <div id={this.props.courseID} className={classes}>
                <p className="code" onClick={this.toggleFullInfo}> {this.props.data.categoryName} </p>
                <div id = {'spec' + this.props.courseID.substring(5, this.props.courseID.length)} className={infoClasses}>
                    <p className="full_name"> 
                        {Array.apply(0, Array(this.props.data.textBoxNumber)).map(function (x, i) {
                            return <input type='text' onKeyDown={me.handleKeyDown} />;
                        })}
                    </p>
                </div>
            </div>
        );
    }
})


var SpecialistPost = React.createClass({
    getInitialState: function() {
        return {
            selected: true
        }
    },

    componentWillMount: function() {
        this.setState({selected: getCookie('specialist') === 'active'});
    },

    render: function() {

        var firstYearCourses = [['csc108'], ['csc148'], ['csc165', 'csc236'], ['mat135', 'mat136']];
        var secondYearCourses = [['csc207'], ['csc209'], ['csc236', 'csc240'], ['csc258'], ['csc263', 'csc265'], ['mat221', 'mat223', 'mat240'], 
                                ['sta247', 'sta255', 'sta257']];
        var laterYearCourses = [['csc369'], ['csc373']];

        return (
            <div id="specialist_window">
                <h2> First Year </h2>
                {firstYearCourses.map(function (courses) {
                    return <CourseCode id={courses[0]} courseIDs={courses} />;
                })}
                <h2> Second Year </h2>
                {secondYearCourses.map(function (courses) {
                    return <CourseCode id={courses[0]} courseIDs={courses} />;
                })}
                <h2> Later Years </h2>
                {laterYearCourses.map(function (courses) {
                    return <CourseCode  id={courses[0]} courseIDs={courses} />;
                })}
                <MultipleCourseCode courseID='spec_400' data={{textBoxNumber: 3, 
                    categoryName: 'Any 400-level CSC course, BCB410H, BCB420H, BCB430Y, ECE489H (1.5 FCEs)'}} />
                <MultipleCourseCode courseID='spec_300' data={{textBoxNumber: 3, 
                    categoryName: 'Any 300+ level CSC course, BCB410H, BCB420H, BCB430Y, ECE385H, ECE489H (1.5 FCEs)'}} />
                <MultipleCourseCode courseID="spec_extra" data={{textBoxNumber: 4, 
                    categoryName: 'Any of the following: 300+ level CSC course; MAT: 235/237/257, any 300+ \
                                     except for 329, 390, & 391; STA: 248, 261, any 300+; ECE: 385H/489H; \
                                     BCB: 410H/420H/430Y (2.0 FCEs)'}} />
                <MultipleCourseCode courseID="spec_inq" data={{textBoxNumber: 1, 
                    categoryName: 'Any from this list: CSC301H, CSC318H, CSC404H, CSC411H, CSC418H, CSC420H, \
                    CSC428H, CSC454H, CSC485H, CSC490H, CSC491H, CSC494H, or PEY (0.5 FCEs) \
                    ** Note: Type "PEY" for Check my POSt to recognize it **'}} />
                <h2> Notes </h2>
                <p id='notes'> - No more than 1.0 FCE from CSC490H1, CSC491H1, CSC494H1, CSC495H1, BCB430Y1 may be used to fulfill program requirements </p>
            </div>
        );
    }
})


React.render(<SpecialistPost />, document.getElementById('div_specialist'));