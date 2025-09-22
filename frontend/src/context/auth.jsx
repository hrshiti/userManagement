import { createContext, useContext, useState } from "react";


export const AuthContext = createContext()


export const AuthProvider = ({children})=>{
    const [token,setToken] = useState(localStorage.getItem("token"))

    const storetokenInLs = (serverToken) => {
        localStorage.setItem("token", serverToken);
        setToken(serverToken); // ✅ update the state
      };

    let isLoggedIn = !!token;

    const LogoutUser = ()=>{
        setToken("")
        return localStorage.removeItem("token")
    }

    return <AuthContext.Provider value={{isLoggedIn, storetokenInLs,LogoutUser}}>
        {children}
    </AuthContext.Provider>   

}

export const useAuth = ()=>{
    return useContext(AuthContext)
}