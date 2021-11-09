import React from "react";
import validator from "validator";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setError, unsetError } from "../../actions/ui";
import { emailPassRegister } from "../../actions/auth";

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: 'Carlos', 
        email: 'carlos@gmail.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) dispatch(emailPassRegister(email, password, name));
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('El nombre es requerido'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('EL email no es válido'));
            return false;
        } else if (password !== password2 || password.length < 5) {
            dispatch(setError('La contraseña no coincide o tiene menos de 5 caracteres'));
            return false;
        }
        dispatch(unsetError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={handleRegister}>
                {
                    msgError && 
                    (
                        <div className="auth__alert-error"> { msgError } </div>
                    )
                }
                <input className="auth__input" type="text" placeholder="Nombre" name="name" value={name} onChange={handleInputChange} autoComplete="off"></input>
                <input className="auth__input" type="text" placeholder="Email" name="email" value={email} onChange={handleInputChange} autoComplete="off"></input>
                <input className="auth__input" type="password" placeholder="Contraseña" name="password" value={password} onChange={handleInputChange}></input>
                <input className="auth__input" type="password" placeholder="Repetir Contraseña" name="password2" value={password2} onChange={handleInputChange}></input>


                <button className="btn btn-primary btn-block mb-1" type="submit">Registrarse</button>
                <Link className="link" to="/auth/login">Iniciar sesión</Link>
            </form>
        </>
    )
}