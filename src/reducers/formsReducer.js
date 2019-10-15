import { createForms } from "react-redux-form";

const initialProductForm = {
    id: false,
    name: '',
    price: '',
    quantity: ''
}
export default function formsReducer() {
    return createForms({
        productForm: initialProductForm
    })
}