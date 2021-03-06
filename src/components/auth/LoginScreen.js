import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { emailPassLogin, googleLogin } from "../../actions/auth";

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        email: 'carlos@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(emailPassLogin(email, password));
    }

    const handleGoogleLogin = () => {
        dispatch(googleLogin());
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={handleLogin} className="animate__animated animate__fadeIn">
                <input className="auth__input" type="text" placeholder="Email" name="email" value={email} onChange={handleInputChange} autoComplete="off"></input>
                <input className="auth__input" type="password" placeholder="Contraseña" name="password" value={password} onChange={handleInputChange}></input>

                <button className="btn btn-primary btn-block" type="submit" disabled={ loading }>Login</button>
                <div className="auth__social-networks">
                    <p>Login Social Networks</p>
                    <div className="google-btn" onClick={handleGoogleLogin}>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text"><b>Sign in with google</b></p>
                    </div>
                </div>

                <Link className="link" to="/auth/register">Registrarse</Link>
            </form>
        </>
    )
}