import React from 'react';
import { Formik, Form, Field } from 'formik';


const LoginForm = ({ onSubmit }) => {
    return (<Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit} > {({ isSubmitting }) =>
        (<Form> <div> <label htmlFor="email">E-mail</label> <Field id="email" name="email" type="email" /> </div>
            <div> <label htmlFor="password">Senha</label> <Field id="password" name="password" type="password" /> </div>
            <button type="submit" disabled={isSubmitting}> Entrar </button> </Form>)} </Formik>);
}; 

export default LoginForm;