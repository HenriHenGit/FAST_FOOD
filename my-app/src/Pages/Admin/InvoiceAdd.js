import { useEffect,useState } from "react";
import axiosClient from "../Component/axiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form } from "react-bootstrap";
import {   useNavigate } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const InvoiceAdd = () => {

    const navigate =  useNavigate();

    const [invoice, setInvoice] = useState([]);
    const [promotion, setPromotion] = useState([]);
    const [user, setUser] = useState([]);



    useEffect(() =>{
        axiosClient.get(`/Promotions`)
             .then(res =>setPromotion(res.data));
    },[]); 
    useEffect(() =>{
        axiosClient.get(`/Users`)
             .then(res =>setUser(res.data));
    },[]); 

    const handleChange = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setInvoice(prev =>({...prev, [name]: value}));
    }
    const handleCheck = (e) => {
        let name = e.target.name;
        let value = e.target.checked;
        setInvoice(prev => ({ ...prev, [name]: value }));
    }
    const handleChangeSelect = (event) => {
        const { name, value } = event.target;
        setInvoice((prev) => ({ ...prev, [name]: value }));
      };

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        console.log(invoice)
        axiosClient.post(`/Invoices`,invoice)
            .then(() => navigate('/admin/invoice'));
    }

    return ( 
        <>
        <div className=" form-container  align-items-center  mt-3">
        <h3 className="ml-3 ">Sửa thông tin sản phẩm</h3>
        <Form className="col-md-6">
            <Form.Group className="mb-3">
                <Form.Label>Chọn khách hàng :</Form.Label>
                <Form.Select name="userId" value={invoice.userId} onChange={handleChangeSelect}>
                    <option value="">Chọn một khách hàng</option>
                    {
                        user.map((type) => (
                            <option key={type.id} value={type.id}>{type.userName}</option>
                        ))
                    }
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Chọn khuyến mãi :</Form.Label>
                <Form.Select name="promotionId" value={invoice.promotionId} onChange={handleChangeSelect}>
                    <option value="">Chọn một khuyến mãi</option>
                    {
                        promotion.map((type) => (
                            <option key={type.id} value={type.id}>{type.promotionName}</option>
                        ))
                    }
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Ngày tạo hóa đơn:</Form.Label>
            <Form.Control type="date" name="issuedDate" value={invoice.issuedDate} onChange={handleChange} />
        </Form.Group>
            <Form.Group className="mb-3">
                    <Form.Label>Địa chỉ giao hàng:</Form.Label>
                <Form.Control type="text" name="shippingAddress" value={invoice.shippingAddress} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Số điện thoại giao hàng:</Form.Label>
                <Form.Control type="text" name="shippingPhone" value={invoice.shippingPhone} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Tổng tiền:</Form.Label>
                <Form.Control type="number" name="total" value={invoice.total} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check type="switch" label="Còn hoạt động" name="status" onChange={handleCheck} checked={invoice.status} />
            </Form.Group>
            <Button type="submit" variant="success" onClick={handleSubmit}>
                <FontAwesomeIcon icon={faCheck} /> Cập nhật
            </Button>
        </Form>
    </div>
        </> );
}
 
export default InvoiceAdd;