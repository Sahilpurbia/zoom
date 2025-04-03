import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const WithAuth = (WrappedComponent) =>{
    let AuthComponent = (props) => {
        let router = useNavigate();

       const isAuthenticated = () => {
        if(localStorage.getItem("token")){
            return true;
        }
         return false;
       }

       useEffect(()=>{
        if(!isAuthenticated()){
            router("/auth");
        }
       },[])
       return <WrappedComponent {...props} />
    } 
    return AuthComponent
}

export default WithAuth;