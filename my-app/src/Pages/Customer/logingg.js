import { GoogleLogin } from "react-google-login";
import axiosClient from "../Component/axiosClient";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const clientIdd = "1085312430219-c71srj538d5vi4qnh901p0l9bef1dtpt.apps.googleusercontent.com";

const Logingg = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState([]);

  useEffect(() => {
    axiosClient.get(`/Users`).then((res) => setAccount(res.data));
  }, []);

  const onSuccess = (res) => {
    const userEmail = res?.profileObj?.email?.toLowerCase();
    console.log(userEmail);
    if (userEmail !== null) {
      // Kiểm tra xem người dùng đã tồn tại hay chưa
      const userExists = account.find((user) => user.username === userEmail);
      if (userExists !==null) {
        console.log("User exists. Do something...");
      } else {
        // Nếu người dùng không tồn tại, thêm người dùng mới
        const accountdata = {
          username: userEmail,
          email: userEmail,
          phoneNumber: "1234567890",
        };

        const accountParams = Object.keys(accountdata)
          .map((key) => `${key}=${encodeURIComponent(accountdata[key])}`)
          .join("&");

        axiosClient.post(`/Users/register?${accountParams}`).then(() => navigate(""));
      }
    } else {
      console.error("Email is undefined or null.");
    }
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED! res:", res);
  };

  return (
    <div id="signInButton" style={{position:'relative'}}>
      <GoogleLogin
        clientId={clientIdd}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
};

export default Logingg;
