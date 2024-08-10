import { useEffect, useState } from "react";


const useAuth = () =>{
    const [isAutheticated, setIsAuthenticated] = useState(false)

    useEffect(() =>{
        const user = localStorage.getItem("username")
        const token = localStorage.getItem("token")

        if (user !== null && token !== null) {
            setIsAuthenticated(true)
        }

    }, [])

    return {isAutheticated}

}

export default useAuth;