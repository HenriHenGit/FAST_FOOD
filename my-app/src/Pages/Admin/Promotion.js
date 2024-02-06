import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faCheck, faEdit, faPlus, faTimes, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';
import axiosClient from "../Component/axiosClient";
import Invoice from "./Invoice";
const Promotion = () => {
    var i = 1;
    const [promotion, setPromotion] =useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState({});
    useEffect(() =>{
        axiosClient.get(`/Promotions`)
             .then(res =>setPromotion(res.data));
    },[]);
    const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = (id) => {
        setSelectedPromotion(promotion.find(a => a.id === id));
        setShowDelete(true);
    }
    const handleCloseDelete = () => setShowDelete(false);

 // format ngày 
    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    };
    const handleDelete = () => {
        axiosClient.delete(`/Promotions/${selectedPromotion.id}`);
        let list = promotion;
        list.splice(promotion.findIndex(a => a.id === selectedPromotion.id), 1);
        setPromotion(list);
        setShowDelete(false);
    }
    return ( 
        <>
        <Link to="/admin/promotion/create" className="btn btn-success mb-1 mt-3 ml-1">
        <FontAwesomeIcon icon={faPlus} /> Thêm
    </Link>
    <Table >
        <thead >
            <tr>
                <th>STT</th>
                <th>Tên khyến mãi</th>
                <th>Mô tả</th>
                <th>Mức khuyến mãi </th>
                <th>Ngày bắt đầu </th>
                <th>Ngày kết thúc </th>
                <th>Chức năng</th>
            </tr>
        </thead>
        <tbody>
            {
                
                promotion.map(item =>
                    <tr className="align-middle">
                    <td>{i++}</td>
                        <td>{item.promotionName}</td>
                        <td>{item.description}</td>
                        <td>{item.promotionValue}%</td>
                        <td>{formatDate(item.startDate)}</td>
                        <td>{formatDate(item.endDate)}</td>

                        <td>

                               
                                <Button variant="warning" style={{ marginRight: "5px" }}><Link to={`edit/${item.id}`}  >
                                <FontAwesomeIcon icon={faEdit} />
                            </Link> </Button>
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
    <Modal.Body>Bạn có chắc muốn xóa sản phẩm <span style={{ fontWeight: "bold" }}>{selectedPromotion.name}</span>?</Modal.Body>
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
 
export default Promotion;