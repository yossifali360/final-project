import * as Yup from "yup"
export const LoginSchema = Yup.object().shape({
    email : Yup.string().email("Email Should be valid").required("Email is required"),
    password:Yup.string().required("Password is required").min(8,"Passord Must be at lest 8 characters or numbers"),
})