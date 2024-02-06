import { useState } from "react";
import axiosClient from "../Component/axiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const PromotionAdd = () => {
    const navigate = useNavigate();

    const [promotion, setPromotion] =useState([]);

    const handleChange = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setPromotion(prev =>({...prev, [name]: value}));
    }
    const handleCheck = (e) => {
        let name = e.target.name;
        let value = e.target.checked;
        setPromotion(prev => ({ ...prev, [name]: value }));
    }


    const handleSubmit = (e)=>{
        e.preventDefault();
        axiosClient.post(`/Promotions`, promotion)
            .then(() => navigate('/admin/promotion'));
    }
    return ( 
        <>
        <div className=" form-container  align-items-center  mt-3">
        <h3 className="ml-3 ">Thêm tài khoản mới</h3>
        <Form className="col-md-6">
            <Form.Group className="mb-3">
                <Form.Label>Tên khuyến mãi:</Form.Label>
                <Form.Control type="text" name="promotionName" value={promotion.promotionName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Mô tả:</Form.Label>
                <Form.Control type="text" name="description" value={promotion.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Mức khuyến mãi</Form.Label>
                <Form.Control type="number" name="promotionValue" value={promotion.promotionValue} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Ngày bắt đầu khuyến mãi:</Form.Label>
                <Form.Control type="date" name="startDate" value={promotion.startDate} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Ngày kết thúc khuyến mãi:</Form.Label>
                <Form.Control type="date" name="endDate" value={promotion.endDate} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check type="switch" label="Còn hoạt động" name="status" onChange={handleCheck} checked={promotion.status} />
            </Form.Group>
            
            <Button type="submit" variant="success" onClick={handleSubmit}>
                <FontAwesomeIcon icon={faCheck} /> Cập nhật
            </Button>
        </Form>
    </div>
        </> );
}
 
export default PromotionAdd;