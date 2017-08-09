import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { setCurrentUser } from '../actions/authorizationActions';

export default function ifToken(store) {
    if (localStorage.jwtToken) {
        setAuthorizationToken(localStorage.jwtToken);
        store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
    }
}