import * as Yup from "yup"
export const PostsSchema = Yup.object().shape({
    header : Yup.string().required("Header is required").min(3,"Header Must be at lest 3 characters"),
    text : Yup.string().required("text is required").min(10,"Text Must be at lest 3 characters"),
    images : Yup.array().of(Yup.string()).required("Image Link is required")
})