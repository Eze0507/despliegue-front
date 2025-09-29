// src/hooks/useAuth.js
import { useState } from "react";
import axios from "axios";

/**
 * @param {string} token
 * @returns {object|null} 
 */
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error al decodificar el token:", e);
    return null;
  }
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (username, password) => {
    setLoading(true);
    setError("");
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const baseUrl = apiUrl && apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`;
      const response = await axios.post(`${baseUrl}login/`, {
        username,
        password,
      });
      const { access, refresh } = response.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      
      localStorage.setItem("username", username);
      console.log(`Nombre de usuario '${username}' guardado en localStorage.`);
      
      const userData = parseJwt(access);
      console.log("Datos decodificados del token:", userData);
      
      if (userData && userData.role) {
        localStorage.setItem("userRole", userData.role);
      } else if (userData && userData.groups && userData.groups.length > 0) {
        localStorage.setItem("userRole", userData.groups[0]);
      }

      return true; 
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
