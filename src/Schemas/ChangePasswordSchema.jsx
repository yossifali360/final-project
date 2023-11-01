import * as Yup from "yup"
export const ChangePasswordSchema = Yup.object().shape({
    password:Yup.string().required("Password is required").min(8,"Passord Must be at lest 8 characters or numbers"),
    confirmPassword:Yup.string().required().oneOf([Yup.ref("password")], "Password don't Match")
})