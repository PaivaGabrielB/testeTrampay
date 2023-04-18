import React from 'react';
import LoginForm from '../components/LoginForm';
import axios from 'axios'; 


const Login = () => {
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('/auth/login', values);
            console.log(response);
        } catch (error) { console.error(error); } finally { setSubmitting(false); }
    }; return (<div> <h1>Login</h1>
        <LoginForm onSubmit={handleSubmit} /> </div>);
};

export default Login;