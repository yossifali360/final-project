import * as Yup from "yup"
export const ForgetPasswordSchema = Yup.object().shape({
    user_email : Yup.string().email("Email Should be valid").required("Email is required"),
})