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



export const editmodalschema = Yup.object({

    usernamef: Yup.string().min(3, '*minimum 3 characters required').max(15, '*must be less 15 characters').required('*this field is required')
        .matches(/^\S+$/, '*whitespace is not allowede'),

    fristnamef: Yup.string().min(3, '*minimum 3 characters required').max(20, '*must be less 20 characters').required('*this field is required')
        .matches(/^[^\s]+(\s[^\s]+)*$/, '*extra whitespace is not allowed'),

    lastnamef: Yup.string()
        .matches(/^[^\s]+(\s[^\s]+)*$/, '*extra whitespace is not allowed').min(3, '*minimum 3 characters required').max(20, '*must be less 20 characters').required('*this field is required'),

    sexf: Yup.string().nullable(),
    phonef: Yup.number().nullable().integer().min(1000000000, '*please enter a valide phone no').max(9999999999, '*must be less or equal to 10 digits'),
    biof: Yup.string().min(3, '*minimum 3 characters required').nullable().max(10).max(250, '*must be less 250 characters'),
    livesinf: Yup.string().min(3, '*minimum 3 characters required').nullable().max(100, '*must be less 100 characters'),
    worksAtf: Yup.string().min(3, '*minimum 3 characters required').nullable().max(100, '*must be less 100 characters'),
    relationshipf: Yup.string().min(3, '*minimum 3 characters required').nullable().max(20, '*must be less 20 characters')


})