import {Customer} from "../models/Customer";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getCustomers} from "../reducers/CustomerReducer";

export function Dashboard() {

    const dispatch = useDispatch();

    const customers = useSelector((state)=>state.customer);

    useEffect(() => {
        dispatch(getCustomers())
    },[dispatch])

    return (
        <>
            Dashboard
            {customers.map((customer: Customer) => (<div key={customer.email}>{customer.name + ' '+ customer.email + ' '+ customer.phone }</div>))}
        </>
    );
}