import * as Yup from "yup"
export const AuctionsSchema = Yup.object().shape({
    title : Yup.string().required("title is required").min(3,"title Must be at lest 3 characters"),
    desc : Yup.string().required("desc is required").min(10,"desc Must be at lest 10 characters"),
    NameOfCurrentWinner : Yup.string(),
    EnterPrice : Yup.number().typeError("Enter a Valid Enter Price"),
    CurrentPrice : Yup.number().typeError("Enter a Valid Current Price"),
    images : Yup.array().of(Yup.string()).required("Image Link is required")
})