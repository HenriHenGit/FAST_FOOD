import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { faCheck, faEdit, faPlus, faTimes, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "../Component/axiosClient";

const ProdcutType = () => {
    var i = 1;
    const navigate = useNavigate();
    const [productType, setProductType] =useState([]);
    const [selectedProductType, setSelectedProductType] = useState({});
    useEffect(() =>{
        axiosClient.get(`/ProductTypes`)
             .then(res =>setProductType(res.data));
    },[]);
    
    const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = (id) => {
        setSelectedProductType(productType.find(a => a.id === id));
        setShowDelete(true);
    }
    const handleCloseDelete = () => setShowDelete(false);

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        axiosClient.delete(`/ProductTypes/${selectedProductType.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
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
        let list = productType;
        list.splice(productType.findIndex(a => a.id === selectedProductType.id), 1);
        setProductType(list);
        setShowDelete(false);
    }
    return ( 
        <> 
        <Link to="/admin/productType/create" className="btn btn-success mb-1 mt-3 ml-1">
        <FontAwesomeIcon icon={faPlus} /> Thêm
    </Link>
    <Table >
        <thead >
            <tr>
                <th>STT</th>
                <th>Tên loại sản phẩm</th>
                <th>Chức năng</th>
            </tr>
        </thead>
        <tbody>
            {
                
                productType.map(item =>
                    <tr className="align-middle">
                    <td>{i++}</td>
                        
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.description}</td>
                        <td>
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
    <Modal.Body>Bạn có chắc muốn xóa loại sản phẩm  <span style={{ fontWeight: "bold" }}>{selectedProductType.name} không?</span>?</Modal.Body>
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
 
export default ProdcutType;