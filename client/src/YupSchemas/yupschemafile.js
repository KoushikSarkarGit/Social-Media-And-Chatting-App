import * as Yup from 'yup'


export const signupschema = Yup.object({
    firstname: Yup.string().min(3).required('Please Enter Firstname'),
    lastname: Yup.string().min(3).required('Please Enter Lastname'),
    username: Yup.string().min(3, "Please enter at least 3 characters").required('Username is required'),
    email: Yup.string().email().required('Please enter a valid email address'),
    password: Yup.string().min(6, 'minimum 6 characters required').required('Password Is Required'),
    confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match')

})


export const loginschema = Yup.object({

    email: Yup.string().email().required('Please enter a valid email address'),
    password: Yup.string().min(6, 'minimum 6 characters required').required('Password Is Required')


})