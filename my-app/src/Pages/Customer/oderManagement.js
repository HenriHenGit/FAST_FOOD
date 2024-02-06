import { useEffect, useState } from "react";
import axiosClient, { baseURL } from "../Component/axiosClient";
import { useAuth } from "../Component/auth";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Star_Rating from "./Star_Rating";

const OrderManagement =  () => {
      const {userId}  = useAuth();
    const [orderStatus,setOrderStatus] = useState([]);
    const [orderId, setOrderId] = useState(1);
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice]  =useState({});
    const [rating,setRating] = useState([]);
    const israting = ([]);
    
    

    useEffect(() =>{
        const fetch =   (currentOrderID,currentUserId) =>{
             axiosClient.get(`/Invoices/Status`, {
                params: {
                    id : currentOrderID,
                    username: currentUserId
                }
              })
                 .then(res =>setInvoices(res.data));
    
        };
       
            fetch(orderId, userId)
        
        
       
    },[orderId,userId]);

    useEffect(() =>{
      axiosClient.get(`/OrderStatus`)
           .then(res =>setOrderStatus(res.data));
    },[]);
    useEffect(() =>{
      axiosClient.get(`/Ratings`)
           .then(res =>setRating(res.data));
    },[]);
   // format ngày 
   const formatDate = (date) => {
      return moment(date).format('DD/MM/YYYY');
    };
  const handleSelectChange =  async (e) => {
       const orderID = e;
       const updateOrderId = async () =>{
        setOrderId(orderID);
       }
        await updateOrderId();
        
        const fetchData = (currentOrderID) => {
            // Gọi hàm lấy dữ liệu sử dụng giá trị orderID đã được đặt
            axiosClient.get(`/Invoices/Status`, {
              params: {
                id: currentOrderID,
                username: userId,
              },
            })
            .then(res => setInvoices(res.data));
          };
          fetchData(orderID);
    };
    const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = (id) => {
        setSelectedInvoice(invoices.find(a => a.id === id));
        setShowDelete(true);
    }
    const handleCloseDelete = () => setShowDelete(false);

    const hanldeCancelOrder = () => {
      axiosClient.delete(`Invoices/${selectedInvoice.id}`)
      let list = invoices;
      list.splice(invoices.findIndex(a => a.id === selectedInvoice.id), 1);
      setInvoices(list);
      setShowDelete(false);
    }

    return ( <>
        <section
        className="breadcrumb-section set-bg"
        data-setbg="/Assets/Images/breadcrumb.jpg"
        style={{ backgroundImage: 'url("/Assets/Images/breadcrumb.jpg")' }}
        >   
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="breadcrumb__text">
                            <h2>Quản lý đơn hàng</h2>
                            <div className="breadcrumb__option">
                                <a href="/">Trang chủ</a>
                                <span>Quản lý đơn hàng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <selection>
        
        <div className="order-status-buttons">
      {orderStatus.map((type) => (
        <button
          key={type.id}
          className={`order-status-button ${orderId === type.id ? 'selected' : ''}`}
          onClick={() => handleSelectChange(type.id)}
        >
          {type.name}
        </button>
      ))}
    </div>
            
        </selection>
        <section>
        {invoices.map((invoice) => (
          <div key={invoice.id} className="invoice-container" >
            <p className="purchase-date">Ngày mua: {formatDate(invoice.issuedDate)}</p>
            <div className="row">
            {invoice.invoiceDetails.map((detail) => (
              <div key={detail.id} className="product-details col-md-6">
                {detail.product && detail.product.id !== null ? (
                  <>
                    <img className="product-image" src={`${baseURL}/Images/${detail.product.images.img}`} alt={detail.product.name} />
                    <p className="product-name">Tên sản phẩm: {detail.product.name}</p>
                    <p className="product-price">Đơn giá: { Number(detail.product.price || 0).toLocaleString('vi-VN')}₫</p>
                    <p className="product-quantity">Số lượng: {detail.quantity}</p>
                    {orderId === 4 && rating.length === 0 ? (
                      <Star_Rating productId={detail.combo ? detail.combo.id : detail.product.id} 
                                    sku={detail.combo ? detail.combo.sku : detail.product.sku}
                                    idInvoiDetail={invoice.id} isRating={null}/>
                    ) : (
                      rating.some((r) => (
                        r.invoiceDetail && r.invoiceDetail.invoiceId === invoice.id &&
                        orderId === 4 &&
                        ((r.productId === detail.product.id && r.comboId === null) ||
                        (r.comboId === (detail.combo ? detail.combo.id : null) && r.productId === null))
                      )) ? null : (
                        orderId === 4 &&
                        <Star_Rating
                          productId={detail.combo ? detail.combo.id : detail.product.id}
                          sku={detail.combo ? detail.combo.sku : detail.product.sku}
                          idInvoiDetail={invoice.id}
                          isRating={null}
                        />
                      )
                    )}
                  </>

                ) : (
                  <>
                    {detail.combo && (
                      <>
                        <img className="combo-image" src={`${baseURL}/Images/${detail.combo.images.img}`} alt={detail.combo.name} />
                        <p className="combo-name">Tên sản phẩm: {detail.combo.name}</p>
                        <p className="combo-price">Đơn giá: { Number(detail.combo.price || 0).toLocaleString('vi-VN')}₫</p>
                        <p className="combo-quantity">Số lượng: {detail.quantity}</p>
                        {orderId === 4 && rating.length === 0 ? (
                      <Star_Rating productId={detail.combo ? detail.combo.id : detail.product.id} 
                                    sku={detail.combo ? detail.combo.sku : detail.product.sku}
                                    idInvoiDetail={invoice.id} isRating={null}/>
                    ) : (
                      rating.some((r) => (
                        r.invoiceDetail && r.invoiceDetail.invoiceId === invoice.id &&
                        orderId === 4 &&
                        ((r.productId === (detail.combo ? null : detail.product.id) && r.comboId === null) ||
                        (r.comboId === detail.combo.id && r.productId === null))
                      )) ? null : (
                        orderId === 4 &&
                        <Star_Rating
                          productId={detail.combo ? detail.combo.id : detail.product.id}
                          sku={detail.combo ? detail.combo.sku : detail.product.sku}
                          idInvoiDetail={invoice.id}
                          isRating={null}
                        />
                      )
                    )}
                      </>
                    )}
                  </>
                )}
                
              </div> 
            ))}
            </div>
            {invoice.promotion !== null ? (
              <div className="promotion-details">
                <p>Khuyến mãi: {invoice.promotion.promotionName}. Giảm: {invoice.promotion.promotionValue} %</p>
              </div>
            ) : null}
            <p className="total-amount">Tổng tiền: {(Number(invoice.total) || 0).toLocaleString('vi-VN')} ₫</p>
            {orderId === 4 || orderId === 5 ? null : ( <Button variant="danger" onClick={() => handleShowDelete(invoice.id)}>Hủy đơn hàng</Button>)}
          


            <Modal show={showDelete} onHide={handleCloseDelete} centered>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xóa</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc muốn hủy đơn hàng này? <span style={{ fontWeight: "bold" }}></span>?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={hanldeCancelOrder}>
                    <FontAwesomeIcon icon={faCheck} /> Đồng ý
                </Button>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    <FontAwesomeIcon icon={faTimes} /> Hủy bỏ
                </Button>
            </Modal.Footer>
        </Modal>
          </div> 
        ))}
      </section>
      <section>
    
      </section>
        </> );
}
 
export default OrderManagement;