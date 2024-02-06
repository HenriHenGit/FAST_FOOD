import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axiosClient, { baseURL } from "../Component/axiosClient";
import { useAuth } from "../Component/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ToPay = () => {
    const {userId,LastName,FirtName}  =useAuth();
    const [cart, setCart] = useState([]);
    const [sumPrice, setSumPrice] = useState(0);
    const [account, setAccount] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [Promotions, setPromotion] = useState([]);
    const [promotionValue, setPromotionValue] = useState(0);
    const [total, setTotal] = useState(sumPrice);
    const [promotionId, setPomotionId] = useState(0);
   
    // const [shippingInfo, setShippingInfo] = useState({
    // });
    useEffect(() =>{
      axiosClient.get(`/Promotions`)


           .then(res =>setPromotion(res.data));
  },[]);
     //lấy dữ liệu giỏ hàng từ server
     useEffect(() => {
       
        const fetchData = async () => {         
                try {
                    const cartResponse = await  axiosClient.get(`/Carts/userId`, {
                        params: { userId: encodeURIComponent(userId) }
                    })
                    
                    setCart(cartResponse.data);
                } catch (error) {
                    console.error('Lỗi khi lấy dữ liệu:', error);
                }      
        };
         // Gọi hàm fetchData khi component được mount
         fetchData();
        },[userId]);
        useEffect(() => {
           
          const total = cart.reduce((acc, item) => {
            // Kiểm tra nếu item là Combo
            if (item.combo) {
              return acc + item.combo.price * item.quantity;
            }
          
            // Nếu không phải Combo, giả sử là sản phẩm
            return acc + item.product.price * item.quantity;
          }, 0);
              if (total !== sumPrice) {
                setSumPrice(total);
                setTotal(total)
          }
        }, [cart]);
        const handleChange = (e) =>{
          let name = e.target.name;
          let value = e.target.value;
          setAccount(prev =>({...prev, [name]: value}));
      }
        useEffect(() =>{
            axiosClient.get(`/Users/${userId}`)
                 .then(res =>setAccount(res.data));
                },[userId]);
        console.log('cart',cart)
        console.log('account',account)
        const handleToPay = () => {
          const token = localStorage.getItem('token');
  
          // Thông tin hóa đơn
          const invoicedata = {
            promotionId: (promotionId === 0 ? null :promotionId),
            userId: userId,
            issuedDate: new Date(),
            shippingAddress: account.address,
            shippingPhone: account.phoneNumber,
            total: total,
            OrderStatusId: 1,
            status: true
          };
          console.log('dta',invoicedata);
        
          // Thêm hóa đơn
          axiosClient.post(`/Invoices`, invoicedata,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              // Các headers khác nếu cần thiết
            },})
            .then(response => {
              console.log('Hóa đơn đã được thêm:', response.data);

              // Thêm chi tiết hóa đơn cho từng sản phẩm trong giỏ hàng
              const invoiceId = response.data.id;
              const detailPromises = cart.map(item => {
                const payload = {
                  invoiceId: invoiceId,
                  productId: item.comboId !== null ? null :item.productId,
                  ComboId: item.comboId !== null ? item.comboId :null,
                  quantity: item.quantity,
                  unitPrice: item.comboId !== null ? item.combo.price :item.product.price
                };
                console.log("check data",payload);
                return axiosClient.post(`/InvoiceDetails`, null, {
                  params: payload,
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json',
                      // Các headers khác nếu cần thiết
                  },
              })
                  .then(detailResponse => {
                      console.log(`Chi tiết hóa đơn cho sản phẩm ${item.productId} đã được thêm:`, detailResponse.data);
                      return detailResponse; // Trả về để sử dụng trong Promise.all
                  })
                  .catch(detailError => {
                      console.error(`Lỗi khi thêm chi tiết hóa đơn cho sản phẩm ${item.productId}:`, detailError);
                      throw detailError; // Chuyển lỗi để dừng Promise.all
                  });
              });

              // Đợi tất cả các Promise của việc thêm chi tiết hóa đơn hoàn thành
              handleDelete();
              return Promise.all(detailPromises);
            })
            .then(detailResponses => {
              console.log('Chi tiết hóa đơn đã được thêm:', detailResponses);
              setShowModal(true)
              // Nếu cần thêm bất kỳ xử lý sau khi thêm chi tiết hóa đơn, bạn có thể thực hiện ở đây
            })
            .catch(error => {
              console.error('Lỗi khi thêm hóa đơn hoặc chi tiết hóa đơn:', error);
            });
        };
        const handleSelectChange = (event) => {
          const selectedValue = event.target.value;
          const selectedOption = event.target.options[event.target.selectedIndex];
          const promotionId = selectedOption.getAttribute("data-id");
          setPomotionId(promotionId);
          if (selectedValue != 0) {
            setTotal(sumPrice - (sumPrice * (parseFloat(selectedValue) / 100)));
          } else {
            setTotal(sumPrice);
          }
          setPromotionValue(selectedValue);
        };
        console.log('promotion',Promotions)
        console.log('promotionvalue',promotionValue)
        console.log('total',total);
        console.log('promotionID',promotionId);

        const handleDelete = () => {
          const token = localStorage.getItem('token');
  
            cart.map((item)=>{
              axiosClient.delete(`/Carts/${item.id}`,{
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  // Các headers khác nếu cần thiết
                },});
                
            });
        }
    return ( 
        <>
        <section
        className="breadcrumb-section set-bg"
        data-setbg="/Assets/Images/breadcrumb.jpg"
        style={{ backgroundImage: 'url("/Assets/Images/breadcrumb.jpg")' }}
        >   
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="breadcrumb__text">
                            <h2>Thanh toán</h2>
                            <div className="breadcrumb__option">
                                <a href="/">Trang chủ</a>
                                <span>Thanh toán</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
        <div className="app-container">
        <div className="user-info">
        <label>Họ và Tên người nhận hàng:</label>
          <input
            type="text"
             value={LastName+" "+FirtName}
             name="lastName"
            onChange={handleChange}
          />
          <label>Số Điện thoại:</label>
          <input
            type="text"
            value={account.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
          />
  
          <label>Địa chỉ:</label>
          <input
            type="text"
            value={account.address}
            name="address"
            onChange={handleChange}
          />
  
          <label>Email:</label>
          <input
            type="email"
            value={account.email}
            name="email"
            onChange={handleChange}
          />
          <select  onChange={handleSelectChange} value={promotionValue} >
         
          <option  value={0} >Chọn khuyến mãi(Nếu có)</option>
          {
            
            Promotions.map((type) => (
              <option key={type.id} value={type.promotionValue} data-id={type.id}>{type.promotionName} {type.promotionValue} %</option>
          ))}

          </select>
          <div className="pay_button_container">
              <Button className="pay_button topay" onClick={handleToPay} style={{backgroundColor: '#FF6600'}} >Thanh toán</Button>
            </div>
        </div>
  
        <div className="product-list">
          <h2>Danh sách sản phẩm</h2>
          <ul>
           
            {cart.map((item) => (
              <li key={item.id}> <img src={`${baseURL}/Images/${item.combo ? item.combo.images.img : item.product.images.img}`} alt="" style={{width:"110px"}}/>
              <b>Tên:</b> {item.combo ? item.combo.name : item.product.name}. 
              <b>Giá:</b> {item.combo ? item.combo.price.toLocaleString('vi-VN') : item.product.price.toLocaleString('vi-VN')} đồng. 
              <b>Số lượng:</b> {item.quantity}</li>
            ))}
            
          </ul>
          <div className="sum_price_container_topay">
          {
            promotionValue != 0 ? (<><h3 className="Cart_price Sum_price" style={{marginBottom:'10px', textDecoration:'line-through'}}>Giá gốc : {sumPrice } ₫</h3>
            <h3 className="Cart_price Sum_price">Tổng tiền : {total.toLocaleString('vi-VN')}  ₫</h3> </>): 
            (<h3 className="Cart_price Sum_price" style={{marginBottom:'10px'}}>Giá gốc : {total.toLocaleString('vi-VN') } ₫</h3>)
          }
              
            </div>
        </div>
      </div>
        </section>
        <Modal show={showModal}  centered>
    <Modal.Header closeButton>
        <Modal.Title>Xác nhận xóa</Modal.Title>
    </Modal.Header>
    <Modal.Body>Bạn đã thanh toán thành công! </Modal.Body>
    <Modal.Footer>
        <Button variant="danger" ><Link to='/Shop'><FontAwesomeIcon icon={faCheck} /> Tiếp tục mua sắm </Link>
            
        </Button>
       
    </Modal.Footer>
</Modal>
        </> );

}
 
export default ToPay;
 