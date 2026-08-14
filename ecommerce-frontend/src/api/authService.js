import api from "./api";

export const login = (loginData) => {
    
    return api.post("/api/auth/login", loginData);
};

export const register = (registerData) => {
    return api.post("/api/auth/register", registerData);
};