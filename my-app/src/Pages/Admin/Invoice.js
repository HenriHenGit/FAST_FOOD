import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faCheck, faEdit, faPlus, faTimes, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';
import axiosClient from "../Component/axiosClient";
const Invoice = () => {
    var i = 1;
    const [invoice, setInvoice] =useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState({});
    useEffect(() =>{
        axiosClient.get(`/Invoices`)
             .then(res =>setInvoice(res.data));
    },[]);
    const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = (id) => {
        setSelectedInvoice(invoice.find(a => a.id === id));
        setShowDelete(true);
    }
    const handleCloseDelete = () => setShowDelete(false);
    // format ngày 
    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    };

    const handleDelete = () => {
        axiosClient.delete(`/Invoices/${selectedInvoice.id}`);
        let list = invoice;
        list.splice(invoice.findIndex(a => a.id === selectedInvoice.id), 1);
        setInvoice(list);
        setShowDelete(false);
    }
    return ( 
        <>
        <Link to="/admin/invoice/create" className="btn btn-success mb-1 mt-3 ml-1">
        <FontAwesomeIcon icon={faPlus} /> Thêm
    </Link>
    <Table >
        <thead >
            <tr>
                <th>STT</th>
                <th>Tên người mua</th>
                <th>Tên khuyến mãi</th>
                <th>Ngày tạo hóa đơn</th>
                <th>Địa chỉ giao hàng </th>
                <th>Số điện thoại giao hàng </th>
                <th>Tổng tiền</th>
                <th>Chức năng</th>
            </tr>
        </thead>
        <tbody>
            {
                
                invoice.map(item =>
                    <tr className="align-middle">
                    <td>{i++}</td>
                    
                        <td>{item.promotion.promotionName}</td>
                        <td>{item.user.userName}</td>
                        <td>{formatDate(item.issuedDate)}</td>
                        <td>{item.shippingAddress}</td>
                        <td>{item.shippingPhone}</td>
                        <td>{item.total}</td>
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
    <Modal.Body>Bạn có chắc muốn xóa hóa đơn thứ <span style={{ fontWeight: "bold" }}>{selectedInvoice.name}</span>?</Modal.Body>
    <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
            <FontAwesomeIcon icon={faCheck} /> Đồng ý
        </Button>
        <Button variant="secondary" onClick={handleCloseDelete}>
            <FontAwesomeIcon icon={faTimes} /> Hủy bỏ
        </Button>
    </Modal.Footer>
</Modal>
        </>
        )
}
 
export default Invoice;