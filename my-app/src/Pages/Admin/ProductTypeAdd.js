import { useEffect, useState } from "react";
import axiosClient from "../Component/axiosClient";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const ProductTypeAdd = () => {
    
    const navigate = useNavigate();
    const [productType, setProductType] =useState([]);
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setProductType(prev => ({ ...prev, [name]: value }));
    }
    const handleCheck = (e) => {
        let name = e.target.name;
        let value = e.target.checked;
        setProductType(prev => ({ ...prev, [name]: value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        console.log('token', token);
             axiosClient.post(`/ProductTypes`, productType, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  // Các headers khác nếu cần thiết
                },})
                .then(response => {
                    // Xử lý kết quả từ API
                    console.log(response.data);
                    // Chuyển hướng đến trang productType sau khi thành công
                    navigate('/admin/productType');
                  })
                  .catch(error => {
                    // Xử lý lỗi
                    console.error('Error:', error);
                
                    // Kiểm tra xem lỗi có mã là 4xx hay không
                    if (error.response && error.response.status >= 400 && error.response.status < 500) {
                      // Nếu là lỗi 4xx, chuyển hướng đến trang đăng nhập
                      navigate('/NguoiDung/DangNhap');
                    } else {
                      // Xử lý các loại lỗi khác nếu cần thiết
                    }
                  });
      }
    return ( 
        <>
        <div className=" form-container  align-items-center  mt-3">
                <h3 className="ml-3 ">Thêm thông tin loại sản phẩm</h3>
                <Form className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label>Tên loại sản phẩm:</Form.Label>
                        <Form.Control type="text" name="name" value={productType.name} onChange={handleChange} />
                    </Form.Group>
                   
                    <Form.Group className="mb-3">
                        <Form.Check type="switch" label="Còn hoạt động" name="status" onChange={handleCheck} checked={productType.status} />
                    </Form.Group>
                    <Button type="submit" variant="success" onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faCheck} /> Cập nhật
                    </Button>
                </Form>
            </div>
        </> );
}
 
export default ProductTypeAdd;