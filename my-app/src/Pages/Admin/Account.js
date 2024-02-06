import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faCheck, faEdit, faPlus, faTimes, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "../Component/axiosClient";
const Account = () => {
    var i = 1;
    const [account, setAccount] =useState([]);
    const [selectedAccount, setSelectedAccount] = useState({});
    useEffect(() =>{
        axiosClient.get(`/Users`)
             .then(res =>setAccount(res.data));
    },[]);
    
        const [showDelete, setShowDelete] = useState(false);
        const handleShowDelete = (id) => {
            setSelectedAccount(account.find(a => a.id === id));
            setShowDelete(true);
        }
        const handleCloseDelete = () => setShowDelete(false);


        const handleDelete = () => {
            axiosClient.delete(`/Users/${selectedAccount.id}`);
            let list = account;
            list.splice(account.findIndex(a => a.id === selectedAccount.id), 1);
            setAccount(list);
            setShowDelete(false);
        }
    
    return ( 
        <>
        <Link to="/admin/account/create" className="btn btn-success mb-1 mt-3 ml-1">
        <FontAwesomeIcon icon={faPlus} /> Thêm
    </Link>
    <Table >
        <thead >
            <tr>
                <th>STT</th>
                <th>Tên tài khoản</th>
                <th>Email</th>
                <th>Số điện thoại </th>
                <th>Chức năng</th>
            </tr>
        </thead>
        <tbody>
            {console.log(account)}
            {
                
                account.map(item =>
                    
                    <tr className="align-middle">
                    <td>{i++}</td>
                        <td>{item.userName}</td>
                        <td>{item.email}</td>
                        <td>{item.phoneNumber}</td>
                        <td>
                         <Button variant="info" style={{ marginRight: "5px" }}><FontAwesomeIcon icon={faUser} /></Button>
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
    <Modal.Body>Bạn có chắc muốn xóa sản phẩm <span style={{ fontWeight: "bold" }}>{selectedAccount.name}</span>?</Modal.Body>
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
 
export default Account;