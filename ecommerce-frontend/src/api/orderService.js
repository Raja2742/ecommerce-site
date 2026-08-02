import api from "./api";

export const checkOut=()=>{
    return api.post("/orders");
}

export const getOrders = () => {

    return api.get("/orders");

};