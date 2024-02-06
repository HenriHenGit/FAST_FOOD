import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../Component/axiosClient";

const ProductEdit = () => {
    const navigate = useNavigate();

    var { id } = useParams();

    const [products, setProduct] =useState([]);
    const [productTypes, setProductType] =useState([]);
    const handleCheck = (e) => {
        let name = e.target.name;
        let value = e.target.checked;
        setProduct(prev => ({ ...prev, [name]: value }));
    }
    useEffect(() =>{
        axiosClient.get(`/Products/${id}`)
             .then(res =>setProduct(res.data));
    },[]);
    useEffect(() =>{
        axiosClient.get(`/ProductTypes`)
             .then(res =>setProductType(res.data));
    },[]);
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setProduct(prev => ({ ...prev, [name]: value }));
    }
    const handleChangeSelect = (event) => {
        setProduct(event.target.value);
      }


    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        axiosClient.put(`/Products/${id}`, products, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(() => navigate('/product'));
    }
    return ( 
        <>
            <div className=" form-container  align-items-center  mt-3">
                <h3 className="ml-3 ">Sửa thông tin sản phẩm</h3>
                <Form className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label>Tên sản phẩm:</Form.Label>
                        <Form.Control type="text" name="name" value={products.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Giá</Form.Label>
                        <Form.Control type="number" name="price" value={products.price} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả:</Form.Label>
                        <Form.Control type="text" name="description" value={products.description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mã sản phẩm:</Form.Label>
                        <Form.Control type="text" name="sku" value={products.sku} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Sự lựa chọn:</Form.Label>
                        <Form.Select value={products} onChange={handleChangeSelect}>
                            <option value={products.productTypeId}>{products.name}</option>
                            {
                                productTypes.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả:</Form.Label>
                        <Form.Control as="textarea" name="description" value={products.description} onChange={handleChange} />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Ảnh đại diện:</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type="switch" label="Còn hoạt động" name="status" onChange={handleCheck} checked={products.status} />
                    </Form.Group>
                    <Button type="submit" variant="success" onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faCheck} /> Cập nhật
                    </Button>
                </Form>
            </div>
            
        </> );
}
 
export default ProductEdit;