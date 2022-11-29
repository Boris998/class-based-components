import {Component, Fragment} from 'react';
import classes from './UserFinder.module.css';
import Users from './Users';
import ErrorBoundary from './ErrorBoundary';
import UsersContext from "../store/users-context";

class UserFinder extends Component {
    static contextType = UsersContext;


    constructor() {
        super();
        this.state = {
            filteredUsers: [],
            searchTerm: '',
        };
    }

    componentDidMount() {
        //send http req
        this.setState({filteredUsers: this.context.users});
        console.log('didMount');
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.setState({
                filteredUsers: this.context.users.filter((user) =>
                    user.name.includes(this.state.searchTerm)
                ),
            });
        }
        console.log('didU');
    }

    searchChangeHandler(e) {
        this.setState({searchTerm: e.target.value});
    }

    render() {
        return (
            <Fragment>
                <div className={classes.finder}>
                    <input type='search' onChange={this.searchChangeHandler.bind(this)}/>
                </div>
                <ErrorBoundary>
                    <Users users={this.state.filteredUsers}/>
                </ErrorBoundary>
            </Fragment>
        );
    }

}

export default UserFinder;

