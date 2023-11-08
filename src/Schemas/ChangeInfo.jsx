import * as Yup from "yup"
export const ChangeProfileInfo = Yup.object().shape({
    name : Yup.string().required("Name is required").min(3,"Name Must be at lest 3 characters"),
    email : Yup.string().email("Email Should be valid").required("Email is required"),
})