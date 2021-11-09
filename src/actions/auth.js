import Swal from 'sweetalert2';
import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { finishLoading, startLoading } from './ui';


export const emailPassLogin = (email, password) => {
        return (dispatch) => {
                dispatch(startLoading());
                firebase.auth().signInWithEmailAndPassword(email, password)
                        .then( ({user}) => {
                                dispatch( login(user.multiFactor.user.uid, user.multiFactor.user.displayName) );
                                dispatch( finishLoading() );
                        }).catch(e => {
                                Swal.fire('Error', e.message, 'error');
                                dispatch( finishLoading() );
                        });
        }
};

export const emailPassRegister = (email, password, name) => {
        return (dispatch) => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then( async ({user}) => {
                                await user.updateProfile({displayName: name});
                                dispatch( login(user.multiFactor.user.uid, user.multiFactor.user.displayName) )
                        }).catch( e => Swal.fire('Error', e.message, 'error'));
        }
};

export const googleLogin = () => {
        return (dispatch) => {
                firebase.auth().signInWithPopup(googleAuthProvider)
                        .then(({user: {multiFactor}}) => {
                                dispatch( login(multiFactor.user.uid, multiFactor.user.displayName) );
                        })
        }
};

export const login = (uid, displayName) => ({
        type: types.login,
        payload: { uid, displayName }
});

export const startLogout = () => {
        return async (dispatch) => {
                await firebase.auth().signOut();
                dispatch( logout() );
        }
}

export const logout = () => ({
        type: types.logout
})