import { useState } from "react";
import axiosClient from "../Component/axiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const AccountAdd = () => {
    const navigate =  useNavigate();

    const [account, setAccount] = useState([]);


    const handleChange = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setAccount(prev =>({...prev, [name]: value}));
    }


    const handleSubmit = (e)=>{
        e.preventDefault();
        const accountdata = {
            LastName: account.LastName,
            FirtName: account.FirtName,
            Address: account.Address,
            username: account.Username,
            password: account.PasswordHash,
            email: account.Email,
            phoneNumber: account.phoneNumber,
          };
          // Chuyển đổi đối tượng thành chuỗi tham số
    const accountParams = Object.keys(accountdata)
    .map(key => `${key}=${encodeURIComponent(accountdata[key])}`)
    .join('&');
        axiosClient.post(`/Users/register?${accountParams}`)
            .then(() => navigate('/admin/account'));
    }
    return ( 
        <>
        <div className=" form-container  align-items-center  mt-3">
        <h3 className="ml-3 ">Thêm tài khoản mới</h3>
        <Form className="col-md-6">
             <Form.Group className="mb-3">
                <Form.Label>Họ:</Form.Label>
                <Form.Control type="text" name="LastName" value={account.LastName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Tên:</Form.Label>
                <Form.Control type="text" name="FirtName" value={account.FirtName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Tên tài khoản:</Form.Label>
                <Form.Control type="text" name="Username" value={account.Username} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Mật khẩu:</Form.Label>
                <Form.Control type="text" name="PasswordHash" value={account.PasswordHash} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="Email" value={account.Email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Số điện thoại:</Form.Label>
                <Form.Control type="text" name="phoneNumber" value={account.phoneNumber} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Địa chỉ:</Form.Label>
                <Form.Control type="text" name="Address" value={account.Address} onChange={handleChange} />
            </Form.Group>
            
            <Button type="submit" variant="success" onClick={handleSubmit}>
                <FontAwesomeIcon icon={faCheck} /> Cập nhật
            </Button>
        </Form>
    </div>
        </> );
}
 
export default AccountAdd;