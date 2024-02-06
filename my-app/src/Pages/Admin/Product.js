
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faCheck, faEdit, faPlus, faTimes, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "../Component/axiosClient";
import { baseURL } from "../Component/axiosClient";
const Product = () => {
    var i = 1;
    const [products, setProduct] =useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    useEffect(() =>{
        axiosClient.get(`/Products`)
             .then(res =>setProduct(res.data));
    },[]);
    
   
    const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = (id) => {
        setSelectedProduct(products.find(a => a.id === id));
        setShowDelete(true);
    }
    const handleCloseDelete = () => setShowDelete(false);

   
    

    const handleDelete = () => {
        axiosClient.delete(`/Products/${selectedProduct.id}`);
        let list = products;
        list.splice(products.findIndex(a => a.id === selectedProduct.id), 1);
        setProduct(list);
        setShowDelete(false);
    }

    return ( 
        <>
            <Link to="/admin/product/create" className="btn btn-success mb-1 mt-3 ml-1">
                <FontAwesomeIcon icon={faPlus} /> Thêm
            </Link>
            <Table >
                <thead >
                    <tr>
                        <th>STT</th>
                        <th>Hình</th>
                        <th>Loại sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Mô tả</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        products.map(item =>
                            <tr className="align-middle">
                            <td>{i++}</td>
                                <td><img src={`${baseURL}/Images/${item.images.img}`} alt="" style={{width:"50px"}}/></td>
                                <td>{item.productType.name}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>
                                 <Button variant="info" style={{ marginRight: "5px" }}><FontAwesomeIcon icon={faUser} /></Button>
                                 <Link to={`edit/${item.id}`} className="btn btn-warning" style={{ marginRight: "5px" }}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link>
                                <Button variant="danger" onClick={() => handleShowDelete(item.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                                </td>
                            </tr>
                            )
                    }
                </tbody>
            </Table>

            <Modal show={showDelete} onHide={handleCloseDelete} centered>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xóa</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc muốn xóa sản phẩm <span style={{ fontWeight: "bold" }}>{selectedProduct.name}</span>?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faCheck} /> Đồng ý
                </Button>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    <FontAwesomeIcon icon={faTimes} /> Hủy bỏ
                </Button>
            </Modal.Footer>
        </Modal>
        </> );
}
 
export default Product;
