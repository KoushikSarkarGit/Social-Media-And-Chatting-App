import * as Yup from 'yup'


export const signupschema = Yup.object({
    firstname: Yup.string().min(3).required('Please Enter Your Firstname'),
    lastname: Yup.string().min(3).required('Please Enter Your Lastname'),
    username: Yup.string().min(3).required('Please Enter Your Preferred Username'),
    email: Yup.string().email().required('Please Enter Valid Email Address'),
    password: Yup.string().min(3).required('Password Is Required'),
    confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password Must Match')

})