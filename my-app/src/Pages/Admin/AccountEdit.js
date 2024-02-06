import { useEffect, useState } from "react";
import axiosClient from "../Component/axiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form } from "react-bootstrap";
import { useNavigate,useParams } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AccounttEdit = () => {
    const navigate =  useNavigate();
    var { id } = useParams();
    const [account, setAccount] = useState({});

    const handleChange = (e) =>{
        let name = e.target.name;           
        let value = e.target.value;
        setAccount(prev =>({...prev, [name]: value}));
    }
    // xử lý ẩn hiện mật khẩu

    const [showPassword, setShowPassword] = useState(false);
    const [accountforPassword, setAccountforPassword] = useState({ PasswordHash: '' });
  
    const handleChangePasswword = (e) => {
      const { name, value } = e.target;
      setAccountforPassword({ ...accountforPassword, [name]: value });
    };
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    //lấy thông tin người dùng
    useEffect(() =>{
        axiosClient.get(`/Users/${id}`)
             .then(res =>setAccount(res.data));
            },[]);
            //xử lý gửi dữ liệu về server
    const handleSubmit = (e) => {
        e.preventDefault();
        axiosClient.put(`/Users/${id}`, account)
            .then(() => navigate('/admin/account'));
        }
        console.log('acc', account)
        console.log('id',id);
    return ( 
        <>
        <div className=" form-container  align-items-center  mt-3">
        <h3 className="ml-3 ">Sửa thông tin tài khoản</h3>
        <Form className="col-md-6">
       
        <Form.Group className="mb-3">
            <Form.Label>Mật khẩu:</Form.Label>
                <div className="password-input-container">
                    <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="PasswordHash"
                        value={account.PasswordHash}
                        onChange={handleChange}
                    />
                    <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="password-toggle-icon"
                    onClick={togglePasswordVisibility}
                    />
            </div>
     </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="Email" value={account.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Số điện thoại:</Form.Label>
            <Form.Control type="text" name="phoneNumber" value={account.phoneNumber } onChange={handleChange} />
        </Form.Group>
       
        <Button type="submit" variant="success" onClick={handleSubmit}>
            <FontAwesomeIcon icon={faCheck} /> Cập nhật
        </Button>
    </Form>
    </div>
        </> );
}
 
export default AccounttEdit;