import axiosClient from "../Component/axiosClient";
import { useNavigate,Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
 

const DangKy = () => {
    const [loginVisible, setLoginVisible] = useState(false);

    const switchToLogin = () => {
      setLoginVisible(true);
    };
  
    const switchToRegister = () => {
      setLoginVisible(false);
    };
  
    const togglePasswordVisibility = () => {
      const passwordInput = document.getElementById('password');
      const eyeIcon = document.getElementById('bg');
  
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.style.color = 'white';
      } else {
        passwordInput.type = 'password';
        eyeIcon.style.color = 'black';
      }
    };

    const navigate =  useNavigate();

    const [account, setAccount] = useState([]);


    const handleChange = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setAccount(prev =>({...prev, [name]: value}));
    }


    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log('account',account);
        if (!account.userName || !account.passwordHash || !account.lastName || !account.firtName || !account.Address || !account.email || !account.phoneNumber) {
            
            alert('Vui lòng nhập đủ thông tin.');  
            return;
        } else if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z\d@$!%*#?&]/.test(account.passwordHash)) {
            //const passwordRegex = ;
            alert('Mật khẩu cần chứa ít nhất một kí tự hoa, một số, và một kí tự đặc biệt.');
            return;
        }
        
    
        // Check if the password contains at least one uppercase letter, one number, and one special character
        

        const accountdata = {
            LastName: account.lastName,
            FirtName: account.firtName,
            username: account.userName,
            password: account.passwordHash,
            email: account.email,
            phoneNumber: account.phoneNumber,
            Address: account.Address,
          };
          // Chuyển đổi đối tượng thành chuỗi tham số
    const accountParams = Object.keys(accountdata)
    .map(key => `${key}=${encodeURIComponent(accountdata[key])}`)
    .join('&');
        axiosClient.post(`/Users/register?${accountParams}`)
        .then(() => navigate('/NguoiDung/DangNhap',alert('Đăng ký tài khoản thành công!')))
        .catch(error => {alert(error.response.data);});
    }
  
    useEffect(() => {
      const st = { current: false };
  
      const showHint = () => {
        const passwordInput = document.getElementById('password');
        const eyeIcon = document.getElementById('bg');
  
        if (st.current) {
          passwordInput.setAttribute('type', 'password');
          eyeIcon.style.color = 'black';
          st.current = false;
        } else {
          passwordInput.setAttribute('type', 'text');
          eyeIcon.style.color = 'white';
          st.current = true;
        }
      };
  
      $('#loginbtn').on('click', switchToLogin);
      $('#registerbtn').on('click', switchToRegister);
      $('#bg').on('click', showHint);
  
      return () => {
        $('#loginbtn').off('click', switchToLogin);
        $('#registerbtn').off('click', switchToRegister);
        $('#bg').off('click', showHint);
      };
    }, [loginVisible]);

  return (
    <div className="page-container">
      <div className="container">
                <div className="form__login">
                <div className="login__login">
                    <div
                        className="right__login"
                        style={{ right: loginVisible ? '-390px' : '1px', opacity: loginVisible ? 0 : 1 }}
                    >
                        <form>
                        <div className="top__login">
                            <p>
                            Bạn đã có có tài khoản đăng nhập?{' '}
                            <Link to="/NguoiDung/DangNhap" onClick={switchToLogin}>
                                Đăng Nhập
                            </Link>
                            </p>
                            <h2>Đăng Kí</h2>
                        </div>
                        <div className="two-input">
                            <div className="input__login">
                            <input type="text" placeholder="LastName" name="lastName" value={account.lastName} onChange={handleChange}/>
                            <span>
                                {' '}

                            </span>
                            </div>
                            <div className="input__login">
                            <input type="text" placeholder="FirstName" name="firtName" value={account.firtName} onChange={handleChange}/>
                            <span>
                                {' '}

                            </span>
                            </div>
                        </div>
                        <div className="two-input">
                        <div className="input__login">
                            <input type="userName" placeholder="UserName" name="userName" value={account.userName} onChange={handleChange}/>
                            <span>
                            <i className="fa-solid fa-user"></i>
                            </span>
                        </div>
                        <div className="input__login">
                            <input
                            type="password"
                            name="passwordHash" value={account.passwordHash} onChange={handleChange}
                            id="password"
                            placeholder="Mật Khẩu"
                            required
                            />
                            <span>
                            <i
                                className="fa-solid fa-eye"
                                id="bg"
                                onClick={togglePasswordVisibility}
                                aria-hidden="true"
                            ></i>
                            </span>
                        </div>    
                        </div>                   
                        <div className="input__login">
                            <input type="email" placeholder="Email" name="email" value={account.email} onChange={handleChange}/>
                            <span>
                            <i className="fa-solid fa-envelope"></i>
                            </span>
                        </div>
                        <div className="input__login">
                            <input type="phoneNumber" placeholder="PhoneNumber" name="phoneNumber" value={account.phoneNumber} onChange={handleChange}/>
                            <span>
                                {' '}
                                <i className="fa-solid fa-phone"></i>
                            </span>
                        </div>
                        <div className="input__login">
                            <input type="Address" placeholder="Address" name="Address" value={account.Address} onChange={handleChange}/>
                            <span>
                                {' '}
                                <i className="fa-solid fa-home"></i>
                            </span>
                        </div>
                        <div className="button__login">
                            <button className='btnoflogin' onClick={handleSubmit}>Đăng kí</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DangKy;
