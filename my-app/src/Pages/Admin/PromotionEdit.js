import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../Component/axiosClient";
const PromotionEdit = () => {
    const navigate = useNavigate();

    var { id } = useParams();
    const [promotion, setPromtoion] = useState([]);

    const handleChange = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setPromtoion(prev =>({...prev, [name]: value}));
    }
    const handleCheck = (e) => {
        let name = e.target.name;
        let value = e.target.checked;
        setPromtoion(prev => ({ ...prev, [name]: value }));
    }
    useEffect(() =>{
        axiosClient.get(`/Promotions/${id}`)
             .then(res =>setPromtoion(res.data));
            }, []);
     const handleSubmit = (e) => {
        e.preventDefault();
        axiosClient.put(`/Promotions/${id}`, promotion)
                .then(() => navigate('/admin/promotion'));
        }

    return ( 
        <>
        <div className=" form-container  align-items-center  mt-3">
        <h3 className="ml-3 ">Sửa thông tin khuyến mãi</h3>
        <Form className="col-md-6">
        <Form.Group className="mb-3">
            <Form.Label>Tên khuyến mãi:</Form.Label>
            <Form.Control type="text" name="promotionName" value={promotion.promotionName} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control type="text" name="description" value={promotion.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Mức giảm giá(%):</Form.Label>
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
 
export default PromotionEdit;