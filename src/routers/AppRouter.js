import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { firebase } from '../firebase/firebase-config';

import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { login } from "../actions/auth";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

import { startLoadingNotes } from "../actions/notes";



export const AppRouter = () => {

    const dispatch = useDispatch();
    const [ checking, setChecking ] = useState(true);
    const [ isLogged, setIsLogged ] = useState(false);

    useEffect( () => {
        firebase.auth().onAuthStateChanged( ( async (user)  => {
            if (user?.multiFactor.user.uid) {
                dispatch( login(user.multiFactor.user.uid, user.multiFactor.user.displayName) );
                setIsLogged(true);
                dispatch(startLoadingNotes(user.multiFactor.user.uid));
            } else {
                setIsLogged(false);
            }
            setChecking(false);
        }));
    }, [dispatch, setChecking, setIsLogged]);

    if (checking) return ( <h1>Espere...</h1> )

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" component={AuthRouter} isAuthenticated={isLogged} />
                    <PrivateRoute exact isAuthenticated={isLogged} path="/" component={JournalScreen} />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
    
}