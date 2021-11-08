import React from "react";
import { Link } from "react-router-dom";

export const RegisterScreen = () => {
    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form>
                <input className="auth__input" type="text" placeholder="Nombre" name="name" autoComplete="off"></input>
                <input className="auth__input" type="text" placeholder="Email" name="email" autoComplete="off"></input>
                <input className="auth__input" type="password" placeholder="Contraseña" name="password"></input>
                <input className="auth__input" type="password" placeholder="Repetir Contraseña" name="password2"></input>


                <button className="btn btn-primary btn-block mb-1" type="submit">Registrarse</button>
                <Link className="link" to="/auth/login">Iniciar sesión</Link>
            </form>
        </>
    )
}