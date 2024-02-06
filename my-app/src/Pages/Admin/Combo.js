import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faCheck, faEdit, faPlus, faTimes, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "../Component/axiosClient";
import { baseURL } from "../Component/axiosClient";
const Combo = () => {
    var i = 1;
    const [comboes, setComboes] =useState([]);
    const [selectedComBo, setSelectedCombo] = useState({});
    useEffect(() =>{
        axiosClient.get(`/Comboes`)
             .then(res =>setComboes(res.data));
    },[]);
    
   
    const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = (id) => {
        setSelectedCombo(comboes.find(a => a.id === id));
        setShowDelete(true);
    }
    const handleCloseDelete = () => setShowDelete(false);

   
    

    const handleDelete = () => {
        axiosClient.delete(`/Comboes/${selectedComBo.id}`);
        let list =comboes;
        list.splice(comboes.findIndex(a => a.id === selectedComBo.id), 1);
        setComboes(list);
        setShowDelete(false);
    }

    return ( 
        <>
            <Link to="/admin/combo/create" className="btn btn-success mb-1 mt-3 ml-1">
                <FontAwesomeIcon icon={faPlus} /> Thêm
            </Link>
            <Table >
                <thead >
                    <tr>
                        <th>STT</th>
                        <th>Hình</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        comboes.map(item =>
                            <tr className="align-middle">
                            <td>{i++}</td>
                                <td><img src={`${baseURL}/Images/${item.images.img}`} alt="" style={{width:"50px"}}/></td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
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
            <Modal.Body>Bạn có chắc muốn xóa sản phẩm <span style={{ fontWeight: "bold" }}>{selectedComBo.name}</span>?</Modal.Body>
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
 
export default Combo;