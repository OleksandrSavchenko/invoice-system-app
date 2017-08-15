import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { setCurrentUser } from '../actions/authorizationActions';
import { browserHistory } from 'react-router';

export default (store) => {
    if (localStorage.jwtToken) {
        setAuthorizationToken(localStorage.jwtToken);
        store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
    } else {
        browserHistory.push('/login');
    }
}