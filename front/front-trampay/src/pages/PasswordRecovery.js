import React from 'react';
import PasswordRecoveryForm from '../components/PasswordRecoveryForm';
import axios from 'axios';
const PasswordRecovery = () => {
    const handleSubmit = async (values, { setSubmitting }) => {
        try { const response = await axios.post('/auth/recover-password', values); console.log(response); } catch (error) { console.error(error); } finally { setSubmitting(false); }
    }; return (<div> <h1>Recuperação de senha</h1> <PasswordRecoveryForm onSubmit={handleSubmit} /> </div>);
};


export default PasswordRecovery;