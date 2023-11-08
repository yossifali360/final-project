import * as Yup from "yup"
export const ChangePasswordSchema2 = Yup.object().shape({
    currentPassword:Yup.string().required("Old Password is required").min(8,"Passord Must be at lest 8 characters or numbers"),
    newPassword:Yup.string().required("Password is required").min(8,"Passord Must be at lest 8 characters or numbers"),
    confirmNewPassword:Yup.string().required().oneOf([Yup.ref("newPassword")], "Password don't Match")
})