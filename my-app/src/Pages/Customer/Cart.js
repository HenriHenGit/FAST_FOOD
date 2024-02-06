import { Button, Modal, Table } from "react-bootstrap";
import axiosClient, { baseURL } from "../Component/axiosClient";
import { useEffect, useState } from "react";
import { useAuth  } from '../Component/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
const Cart = () => {
    const [quantity, setQuantity] = useState(1);
    const {userId}  =useAuth();
    const [cart, setCart] = useState([]);
    const [selectedCart, setSelectedCart] = useState({});
    const [sumPrice, setSumPrice] = useState(0);
    const [disabled, setDisabled] = useState(true);
    //Xử lý sửa số lượng sản phẩm 

   

// Update giỏ hàng và lưu vào `localStorage` khi có thay đổi
const updateCartAndLocalStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
};
    const handleQuantityChange = (id, newQuantity) => {
        const updatedCart = cart.map(item => {
          if (item.id === id) {
            return { ...item, quantity: parseInt(newQuantity, 10) || 0 }; // Đảm bảo giá trị là một số nguyên không âm
          }
          return item;
        });
      
        setCart(updatedCart);
      };
    //xử lý tăng giảm số luonghwj sản phẩm 
    const handleIncrease = (id) => {
         // Tìm sản phẩm trong giỏ hàng với id tương ứng
    const updatedCart = cart.map((item) => {
        if (item.id === id) {
            // Tạo một bản sao của đối tượng để tránh thay đổi trực tiếp trên state
            const updatedCartItem = { ...item };
            // Tăng số lượng sản phẩm trong giỏ hàng
            updatedCartItem.quantity += 1;
            return updatedCartItem;
        }
        return item;
    });

    // Cập nhật state giỏ hàng
    updateCartAndLocalStorage(updatedCart);
      const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          const cartArray = JSON.parse(storedCart);

          const total = cartArray.reduce((acc, item) => {//đây 
            // Kiểm tra nếu item là Combo
            if (item.combo) {
              return acc + item.combo.price * item.quantity;
            }
          
            // Nếu không phải Combo, giả sử là sản phẩm
            return acc + item.product.price * item.quantity;
          }, 0);//đây 
          if (total !== sumPrice) {
            setSumPrice(total);
        }
      }

        };
    
      const handleDecrease = (id) => {
         // Tìm sản phẩm trong giỏ hàng với id tương ứng
    const updatedCart = cart.map((item) => {
        if (item.id === id) {
            // Tạo một bản sao của đối tượng để tránh thay đổi trực tiếp trên state
            const updatedCartItem = { ...item };
            // Giamr số lượng sản phẩm trong giỏ hàng
            if(updatedCartItem.quantity > 1)
            {
                updatedCartItem.quantity -= 1;
                return updatedCartItem;
            }

           
        }
        return item;
    });


    updateCartAndLocalStorage(updatedCart);
    //xử lý  cập nhật tổng tiền 
    const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const cartArray = JSON.parse(storedCart);

        const total = cartArray.reduce((acc, item) => {//đây 
          // Kiểm tra nếu item là Combo
          if (item.combo) {
            return acc + item.combo.price * item.quantity;
          }
        
          // Nếu không phải Combo, giả sử là sản phẩm
          return acc + item.product.price * item.quantity;
        }, 0);//đây 
        if (total !== sumPrice) {
          setSumPrice(total);
      }
    }
       
      };
      const handleUnloads = async () => {
        try {
          // Lấy giỏ hàng từ localStorage
          const storedCart = localStorage.getItem('cart');
          if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
    
            // Duyệt qua từng phần tử trong giỏ hàng và gửi lên server
            await parsedCart.map(async (item) => {
              const  id  = item.id;
              console.log('idCart',id)
              try {
                // Gửi dữ liệu lên server để cập nhật số lượng
                await axiosClient.put(`/Carts/${id}`, item)
                .then(res => console.log('datarespe',res.data))
              } catch (error) {
                console.error(`Lỗi khi cập nhật sản phẩm ${id}:`, error);
              }
            });
            console.log('sotre',storedCart)
            console.log('sotrejson',parsedCart)
            updateCartAndLocalStorage(cart);

          }
        } catch (error) {
          console.error('Lỗi khi xử lý giỏ hàng:', error);
        }
      };
      //xử lý lưu giỏ hàng vào csdl khi load lại trang hoặc chuyển trang
      useEffect(() => {
        const handleUnload = async () => {
          try {
            // Lấy giỏ hàng từ localStorage
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
              const parsedCart = JSON.parse(storedCart);
      
              // Duyệt qua từng phần tử trong giỏ hàng và gửi lên server
              await parsedCart.map(async (item) => {
                const  id  = item.id;
                console.log('idCart',id)
                try {
                  // Gửi dữ liệu lên server để cập nhật số lượng
                  await axiosClient.put(`/Carts/${id}`, item)
                  .then(res => console.log('datarespe',res.data))
                } catch (error) {
                  console.error(`Lỗi khi cập nhật sản phẩm ${id}:`, error);
                }
              });
              console.log('sotre',storedCart)
              console.log('sotrejson',parsedCart)
              updateCartAndLocalStorage(cart);
  
            }
          } catch (error) {
            console.error('Lỗi khi xử lý giỏ hàng:', error);
          }
        };
      
        // Gắn sự kiện 'beforeunload' để thực hiện cập nhật khi trang đóng
        // window.addEventListener('beforeunload', handleUnload);
        window.addEventListener('beforeunload', async (event) => {
            await handleUnload();
      

          });
      
        // Cleanup sự kiện khi component unmount
        return () => {
          window.removeEventListener('beforeunload', handleUnload);
        };
      }, []);
    
      //lấy dữ liệu giỏ hàng từ server
      useEffect(() => {
       
        const fetchData = async () => {
            const storedCart = localStorage.getItem('cart');
            
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
      // Tính tổng giá khi danh sách sản phẩm thay đổi
      useEffect(() => {//đây 
        // const storedCart = localStorage.getItem('cart');
        // if (storedCart) {
        //   const cartArray = JSON.parse(storedCart);
      
        const total = cart.reduce((acc, item) => {
          // Kiểm tra nếu item là Combo
          if (item.combo) {
            return acc + item.combo.price * item.quantity;
          }
        
          // Nếu không phải Combo, giả sử là sản phẩm
          return acc + item.product.price * item.quantity;
        }, 0);
      //đây 
        if (total !== sumPrice) {
          setSumPrice(total);
        //}//đây 
        }
      }, [cart]);//đây 
      // Xử lý xóa giỏ hàng
      const [showDelete, setShowDelete] = useState(false);
      const handleShowDelete = (id) => {
          setSelectedCart(cart.find(a => a.id === id));
          setShowDelete(true);
      }
      const handleCloseDelete = () => setShowDelete(false);
  
  
      const handleDelete = () => {
          axiosClient.delete(`/Carts/${selectedCart.id}`);
          let list = cart;
          list.splice(cart.findIndex(a => a.id === selectedCart.id), 1);
          setCart(list);
          setShowDelete(false);
          handleDecrease()
      }
      console.log('cart',cart);
      
      let isCartEmpty = cart.length === 0;
      console.log('dis',isCartEmpty)
     
      
     
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
                            <h2>Giỏ hàng</h2>
                            <div className="breadcrumb__option">
                                <a href="/">Trang chủ</a>
                                <span>Giỏ hàng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <Table>
                <thead>
                <tr></tr>
                <tr></tr>
                </thead>
                <tbody>
                   {
                    cart.map(item => (
                        <tr key={item.id}> 
                        
                            <td className="td_Cart_render" >
                            <div className="div_Cart_render" >
                              {/* <img src={`${baseURL}/Images/${item.product.images.img }`} alt="" style={{width:"110px"}}/>
                              <h3 >{console.log(item.product.images.img)}{item.product.name}</h3> */}
                              {/* //đây  */}<img src={`${baseURL}/Images/${item.combo ? item.combo.images.img : item.product.images.img}`} alt="" style={{ width: "110px" }} />
                              {/* //đây  */}<h3>{item.combo ? item.combo.name : item.product.name}</h3>
                            </div>
                            <div className="div_Cart_render" style={{ marginLeft: '20px' }}>
                            {/* //đây  */}<span className="Cart_price"> {item.combo ? (item.combo.price * item.quantity).toLocaleString('vi-VN') : (item.product.price * item.quantity).toLocaleString('vi-VN')}₫</span>
                           
                        </div>
                            </td>
                            <td>
                            <div className="quality_cart">
                                <Button variant="danger" onClick={() => handleDecrease(item.id)} >-</Button>
                                <input className="input_quanlity_Cart" 
                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                    value={item.quantity} />
                                <Button variant="danger" onClick={() => handleIncrease(item.id)}  >+</Button>

                                <Button  style={{marginLeft:'40px'}}variant="danger" onClick={() => handleShowDelete(item.id)}> <FontAwesomeIcon icon={faTrashCan} /></Button>
                            </div>    
                           
                             
                   
                            
                            </td> 
                        </tr>
                       
                    ))}
                </tbody>
            </Table>
            <div className="toPay">
            <div className="sum_price_container">
              <h3 className="Cart_price Sum_price">Tổng tiền : {sumPrice.toLocaleString('vi-VN')} ₫</h3>
            </div>
            <div className="pay_button_container">
              <Button  className="pay_button" disabled = {isCartEmpty}   style={{backgroundColor: '#FF6600'}}>
              {
                isCartEmpty ? 
                (<Link style={{color:'#ffff'}} >Thanh toán</Link>) :
                (<Link style={{color:'#ffff'}} onClick={() => {
                  handleUnloads()}} to={`/Shop/topay`} >Thanh toán</Link>)
              }
              
               </Button>
            </div>
            
            </div>

            <Modal show={showDelete} onHide={handleCloseDelete} centered>
              <Modal.Header >
                  <Modal.Title>Xác nhận xóa</Modal.Title>
              </Modal.Header>
              <Modal.Body>Bạn có chắc muốn xóa sản phẩm <span style={{ fontWeight: "bold" }}></span>?</Modal.Body>
              <Modal.Footer>
                  <Button variant="danger" onClick={handleDelete}>
                      <FontAwesomeIcon icon={faCheck} /> Đồng ý
                  </Button>
                  <Button variant="secondary" onClick={handleCloseDelete}>
                      <FontAwesomeIcon icon={faTimes} /> Hủy bỏ
                  </Button>
              </Modal.Footer>
            </Modal>
        </section>
        </> );
}
 
export default Cart;