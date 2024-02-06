import axiosClient from "../Component/axiosClient";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import $ from 'jquery';
import { useAuth } from '../Component/auth';

const Account = () => {
  const { userId,username } = useAuth();
  const [loginVisible, setLoginVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [account, setAccount] = useState([]);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [EmailRP, setEmailRP] = useState({
    id:'',
    PasswordCheck: '',
    Email: '',
    code: '',
    newPasswordHash: '',
  });

  const navigate = useNavigate();

  const switchToLogin = () => {
    setLoginVisible(true);
  };

  const switchToRegister = () => {
    setLoginVisible(false);
  };

  useEffect(() => {
    axiosClient.get(`/Users/${userId}`)
      .then(res => setAccount(res.data));
  }, [userId]);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setAccount(prev => ({ ...prev, [name]: value }));
  }

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!account.userName.includes('@')){
        if (!account.lastName || !account.firtName || !account.email || !account.phoneNumber || !account.address) {
            alert('Vui lòng nhập đủ thông tin.');
            return;
        }
    }
    else if (account.userName.includes('@')){
        if (!account.lastName || !account.firtName || !account.phoneNumber || !account.address) {
            alert('Vui lòng nhập đủ thông tin.');
            return;
        }
    }

    const accountdata = {
      id: account.id,
      lastName: account.lastName,
      firtName: account.firtName,
      username: account.userName,
      password: account.PasswordHash,
      email: account.email,
      phoneNumber: account.phoneNumber,
      Address: account.address,
      Status : true
    };

    axiosClient.put(`/Users/${account.id}`, accountdata)
    .then(() => {
      alert('Chỉnh sửa thông tin tài khoản thành công!');
      handleCancelEdit();
      navigate('/Shop/account');
    })
    .catch(error => {
      alert('Lỗi: ' + error.response.data);
    });
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

  const handleClosePasswordModal = () => setShowPasswordModal(false);

  

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z\d@$!%*#?&]/.test(EmailRP.newPasswordHash)) {
            alert('Mật khẩu cần chứa ít nhất một kí tự hoa, một số, và một kí tự đặc biệt.');
            return;
    } else{
    const accountdata = {
        id: account.id,
        lastName: account.lastName,
        firtName: account.firtName,
        username: account.userName,
        passwordHash: EmailRP.newPasswordHash,
        email: account.email,
        phoneNumber: account.phoneNumber,
        Address: account.address,
        Status : true
      };

    
    axiosClient.put(`/Users/${account.id}?MKC=${EmailRP.PasswordCheck}`, accountdata)
    .then(() =>alert("Đổi mật khẩu thành công!"), navigate('/Shop/account'))
    .catch((err) => alert(err.response.data));
    setShowPasswordModal(false);
    }
  };

  const [showEmailModal, setShowEmailModal] = useState(false);


  const handleCloseEmailModal = () => setShowEmailModal(false);
  const handleCloseResetPasswordModal = () => setShowResetPasswordModal(false);

  const handleSendResetEmail = async (e) => {
    e.preventDefault();
    // Thực hiện logic gửi email xác nhận
    // ...
    const Emaildata = {
      email: EmailRP.Email,
    };
    // Chuyển đổi đối tượng thành chuỗi tham số
    const accountParams = Object.keys(Emaildata)
    .map(key => `${key}=${encodeURIComponent(Emaildata[key])}`)
    .join('&');
    await axiosClient.post(`/Users/forgot-password?${accountParams}`)
    .then(()=>{alert("Mã số đã được gửi đến email của bạn")})
    .catch(err =>(alert("Mã số đã được gửi đến email của bạn")));
    
    // Sau khi gửi email thành công, mở modal nhập mã và mật khẩu mới
    setShowEmailModal(false);
    setShowResetPasswordModal(true);
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    // Thực hiện logic xác nhận mã và đặt lại mật khẩu mới
    // ...
    const Emaildata = {
      email: EmailRP.Email,
      code: EmailRP.code,
      newPassword: EmailRP.newPasswordHash,
    };
    // Chuyển đổi đối tượng thành chuỗi tham số
    const accountParams = Object.keys(Emaildata)
    .map(key => `${key}=${encodeURIComponent(Emaildata[key])}`)
    .join('&');
    axiosClient.post(`/Users/reset-password?${accountParams}`)
    .then(()=>{alert("Đặt lại mật khẩu thành công")})
    .catch(err =>(alert("Người dùng không tồn tại hoặc Mã số không đúng hoặc đã hết hạn")));
    // Sau khi xác nhận thành công, có thể đóng modal
    setShowResetPasswordModal(false);
    
  };
  console.log('em', EmailRP);
  console.log("acc",account);
  return (
    <>
      <section className="breadcrumb-section set-bg" data-setbg="/Assets/Images/breadcrumb.jpg" style={{ backgroundImage: 'url("/Assets/Images/breadcrumb.jpg")' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Trang cá nhân</h2>
                <div className="breadcrumb__option">
                  <a href="/">Trang chủ</a>
                  <span>Trang cá nhân</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    <h2>Hồ sơ cá nhân</h2>
                    <br></br>
                  </div>
                  <div className="two-input">
                    <div className="input__login">
                      <input type="text" placeholder="LastName" name="lastName" value={account.lastName} onChange={handleChange} readOnly={!editing} />
                      <span>
                        {' '}
                        <i className="fa-solid fa-user"></i>
                      </span>
                    </div>
                    <div className="input__login">
                      <input type="text" placeholder="FirstName" name="firtName" value={account.firtName} onChange={handleChange} readOnly={!editing} />
                      <span>
                        {' '}
                        <i className="fa-solid fa-user"></i>
                      </span>
                    </div>
                  </div>

                  {!username.includes('@') ? (
                    <div className="input__login">
                      <input type="email" placeholder="Email" name="email" value={account.email} onChange={handleChange} readOnly={!editing} />
                      <span>
                        <i className="fa-solid fa-envelope"></i>
                      </span>
                    </div>
                  ) : null}

                  <div className="input__login">
                    <input type="PhoneNumber" placeholder="PhoneNumber" name="phoneNumber" value={account.phoneNumber} onChange={handleChange} readOnly={!editing} />
                    <span>
                      {' '}
                      <i className="fa-solid fa-phone"></i>
                    </span>
                  </div>
                  <div className="input__login">
                    <input type="Address" placeholder="Address" name="address" value={account.address} onChange={handleChange} readOnly={!editing} />
                    <span>
                      {' '}
                      <i className="fa-solid fa-home"></i>
                    </span>
                  </div>

                  <div className="button__login">
                    {!editing ? (
                      null
                    ) : (
                      <>
                        <button herf="/Shop/account" className='btnoflogin' onClick={handleSubmit}>
                          Lưu thông tin
                        </button>
                        <button className='btnoflogin' onClick={handleCancelEdit}>
                          Hủy bỏ
                        </button>
                      </>
                    )}
                  </div>
                  <br></br>
                  <div className="forget__login">
                    <br />
                    {!username.includes('@') ? (
                    <a href="#" onClick={() => setShowPasswordModal(true)}>
                    Đổi mật khẩu
                    </a>
                    ) : null}
                    
                  </div>
                </form>
                {!editing ? (
                    <button className='btnoflogin' onClick={handleEditClick}>
                    Chỉnh sửa thông tin
                    </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <Modal show={showPasswordModal} onHide={handleClosePasswordModal} centered>
          <Modal.Header closeButton>
            <Modal.Title><i className="fa fa-key"></i><b>Đổi Mật Khẩu</b></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formResetCode">
                <Form.Label>Mật khẩu cũ</Form.Label>
                <Form.Control type="text" placeholder="Nhập mật khẩu cũ" value={EmailRP.PasswordCheck} onChange={(e) => setEmailRP({ ...EmailRP, PasswordCheck: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="formResetNewPassword">
                <Form.Label>Mật khẩu mới</Form.Label>
                <Form.Control type="password" placeholder="Nhập mật khẩu mới" value={EmailRP.newPasswordHash} onChange={(e) => setEmailRP({ ...EmailRP, newPasswordHash: e.target.value })} />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handlePasswordSubmit}>
                Xác nhận
              </Button>
              <div className="d-flex justify-content-between">
              <Button variant="danger" type="submit" onClick={() => setShowEmailModal(true)} className="ml-auto">
                Quên mật khẩu
              </Button>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePasswordModal}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEmailModal} onHide={handleCloseEmailModal} centered>
            <Modal.Header closeButton>
              <Modal.Title><i className="fa fa-envelope"></i><b>Gửi Email Đặt Lại Mật Khẩu</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {/* Form gửi email và chuyển sang bước 2 */}
                <Form.Group controlId="formResetEmail">
                  <Form.Label>Email của bạn</Form.Label>
                  <Form.Control type="email" placeholder="Nhập email" value={EmailRP.Email} onChange={(e) => setEmailRP({ ...EmailRP, Email: e.target.value })} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSendResetEmail}>
                  Gửi email đặt lại mật khẩu
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEmailModal}>
                Đóng
              </Button>
            </Modal.Footer>
          </Modal>

      <Modal show={showResetPasswordModal} onHide={handleCloseResetPasswordModal} centered>
        <Modal.Header closeButton>
          <Modal.Title><i className="fa fa-key"></i><b>Xác Nhận Đặt Lại Mật Khẩu</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Form nhập mã và mật khẩu mới */}
            <Form.Group controlId="formResetCode">
              <Form.Label>Mã xác nhận</Form.Label>
              <Form.Control type="text" placeholder="Nhập mã xác nhận" value={EmailRP.code} onChange={(e) => setEmailRP({ ...EmailRP, code: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formResetNewPassword">
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control type="password" placeholder="Nhập mật khẩu mới" value={EmailRP.newPasswordHash} onChange={(e) => setEmailRP({ ...EmailRP, newPasswordHash: e.target.value })} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleResetPasswordSubmit}>
              Xác nhận đặt lại mật khẩu
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseResetPasswordModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
};

export default Account;
