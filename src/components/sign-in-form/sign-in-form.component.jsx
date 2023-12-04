import React, { useState } from 'react';

import { signInWithGooglePopup , createUserDocumentFromAuth ,signInAuthUserWithEmailAndPassword, auth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input-component';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';

const SignInForm = () => {
    const defaultFormFields = {
        email: '',
        password: ''
    };

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    console.log('formFields',formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await signInAuthUserWithEmailAndPassword(email,password);
        console.log('login response',response);
        try{
          resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password' :
                    alert("Incorrect password");
                    break;
                case 'auth/user-not-found' : 
                    alert("No User Associated with the email");
                    break;
                default : 
                    console.log(error);      
            }
            
        }
        
        // Add your form submission logic here
    };

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>SignIn with Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email"  type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password"  type="password" required onChange={handleChange} name="password" value={password} />
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
