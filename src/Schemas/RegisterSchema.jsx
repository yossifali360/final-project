import * as Yup from "yup"
export const RegisterSchema = Yup.object().shape({
    name : Yup.string().required("Name is required").min(3,"Name Must be at lest 3 characters"),
    email : Yup.string().email("Email Should be valid").required("Email is required"),
    password:Yup.string().required("Password is required").min(8,"Passord Must be at lest 8 characters or numbers"),
    confirmPassword:Yup.string().required().oneOf([Yup.ref("password")], "Password don't Match")
})