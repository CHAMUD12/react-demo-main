import {useNavigate} from "react-router";
import {useState} from "react";
import {Customer} from "../models/Customer";
import {Modal} from "../components/Modal";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store";
import {saveCustomer} from "../reducers/CustomerReducer";

export function AddCustomer() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    function handleSubmit() {
        const newCustomer = new Customer(name, email, phone);
        dispatch(saveCustomer(newCustomer)).unwrap();
        navigate('/');
    }

    return (
        <>
            <header><h2>Add Customer</h2></header>
            <br/>

            <Modal handleSubmit={handleSubmit} setName={setName} setEmail={setEmail} setPhone={setPhone} >Add Customer</Modal>
        </>
    );
}