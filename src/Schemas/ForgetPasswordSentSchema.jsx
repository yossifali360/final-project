import * as Yup from "yup"
export const ForgetPasswordSchema = Yup.object().shape({
    code : Yup.number().required("Code is required"),
})