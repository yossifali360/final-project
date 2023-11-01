import * as Yup from "yup"
export const CheckOutSchema = Yup.object().shape({
    AuctionAmount : Yup.number().typeError("Enter a Valid Price").required("Phone Number is required").min(10000, "Auction Amount cannot be less Than 100,000"),
    name : Yup.string().required("Name is required").min(3,"Name Must be at lest 3 characters"),
    Address : Yup.string().required("Address is required").min(3,"Address Must be at lest 3 characters"),
    Country : Yup.string().required("Country is required").min(3,"Country Must be at lest 3 characters"),
    City : Yup.string().required("City is required").min(3,"City Must be at lest 3 characters"),
    phoneNumber : Yup.number().typeError("Enter a Valid Phone Number").required("Phone Number is required"),
    State : Yup.string().required("State is required").min(3,"State Must be at lest 3 characters"),
    zipCode : Yup.string().required("ZipCode is required"),
})