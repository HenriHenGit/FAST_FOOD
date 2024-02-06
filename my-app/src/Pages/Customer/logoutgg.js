import {GoogleLogout} from "react-google-login";
import { Link } from 'react-router-dom';
const clientIdd = "1085312430219-c71srj538d5vi4qnh901p0l9bef1dtpt.apps.googleusercontent.com"

const Logoutgg = () =>{

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = `http://localhost:3000/NguoiDung/DangNhap`;  
    }
    const onSuccess = () => {
        console.log("LogoutSuccess");
        handleLogout();
    }


    return (
        <Link id="signOutButton">
            <GoogleLogout
            clientId={clientIdd}
            buttonText="Đăng xuất"
            onLogoutSuccess={onSuccess}
            icon={false}
            
            
            />
        </Link>
    )
    
}

export default Logoutgg;