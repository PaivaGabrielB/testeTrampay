import React from 'react';
import { Formik, Form, Field } from 'formik';
const PasswordRecoveryForm = ({ onSubmit }) => {
    return (<Formik initialValues={{ email: '' }}
        onSubmit={onSubmit} > {({ isSubmitting }) => (<Form> <div> <label htmlFor="email">E-mail</label>
            <Field id="email" name="email" type="email" /> </div> <button type="submit" disabled={isSubmitting}> Recuperar senha </button> </Form>)} </Formik>);
};


export default PasswordRecoveryForm;