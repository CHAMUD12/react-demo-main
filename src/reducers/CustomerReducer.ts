import {Customer} from "../models/Customer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState : Customer[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/customer"
})

export const saveCustomer  = createAsyncThunk(
    'customer/saveCustomer',
    async (customer : Customer) => {
        try {
            const response = await api.post('/add',customer)
            return response.data;
        }catch (err) {
            console.log(err)
        }
    }
)

export const getCustomers = createAsyncThunk(
    'customer/getCustomers',
    async ()=>{
        try{
            const response = await api.get('/view');
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
)

const customerSlice = createSlice({
    name : 'customer',
    initialState,
    reducers:{
        // addCustomer(state, action:PayloadAction<Customer>){
        //     state.push(action.payload);
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveCustomer.pending, (state) => {
                console.log("Saving customer...");
            })
            .addCase(saveCustomer.fulfilled, (state, action) => {
                console.log("Customer saved successfully");
                state.push(action.payload); // Add the new customer to the state
            })
            .addCase(saveCustomer.rejected, (state, action) => {
                console.error("Failed to save customer:", action.payload);
            })

            .addCase(getCustomers.pending, (state) => {
                console.log("Getting customer...");
            })
            .addCase(getCustomers.fulfilled, (state, action) => {
                console.log("Customer Getting successfully");
                return action.payload
            })
            .addCase(getCustomers.rejected, (state, action) => {
                console.error("Failed to get customer:", action.payload);
            })
    }
});

// export const {addCustomer}  = customerSlice.actions;
export default customerSlice.reducer;