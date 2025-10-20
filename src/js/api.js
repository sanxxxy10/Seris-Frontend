// src/api.js

const BASE_URL = "https://seris-backend.onrender.com/"; // change to your render/production backend URL

// Generic POST request
export async function post(endpoint, data) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

// Login
export async function login(email, password) {
    return post("/auth/login", { email, password });
}

// Signup
export async function signup(userData) {
    return post("/auth/signup", userData);
}
