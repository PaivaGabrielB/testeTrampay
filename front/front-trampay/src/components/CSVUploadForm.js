import React from 'react';
import { Formik, Form, } from 'formik';
const CSVUploadForm = ({ onSubmit }) => {
    return (<Formik initialValues={{ file: null }} onSubmit={onSubmit} > {({ setFieldValue, isSubmitting }) =>
        (<Form> <div> <label htmlFor="file">Arquivo CSV</label> <input id="file" name="file" type="file" accept=".csv" onChange={(event) => { setFieldValue('file', event.currentTarget.files[0]); }} /> </div> <button type="submit" disabled={isSubmitting}> Enviar </button> </Form>)} </Formik>);
};

export default CSVUploadForm;