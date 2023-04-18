import React from 'react';
import CSVUploadForm from '../components/CSVUploadForm';
import axios from 'axios';

const CSVUpload = () => {
    const handleSubmit = async (values, { setSubmitting }) => {
            const formData = new FormData(); formData.append('file', values.file); 
            
            try {
                const response = await axios.post('/csv/upload', formData,
                    { headers: { 'Content-Type': 'multipart/form-data' }, }); console.log(response);
            } catch (error) { console.error(error); } finally { setSubmitting(false); }
    };
    return (<div> <h1>Upload de CSV</h1> <CSVUploadForm onSubmit={handleSubmit} /> </div>);
};


export default CSVUpload;