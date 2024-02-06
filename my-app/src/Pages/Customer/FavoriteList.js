import { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row, Table } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { faCheck, faEdit, faEye, faPlus, faShoppingBag, faShoppingCart, faTimes, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "../Component/axiosClient";
import { useAuth  } from '../Component/auth';
import { baseURL } from "../Component/axiosClient";
const FavoriteList = () => {
    var i = 1;
    // lấy thông tin tài khoản
    const navigate =  useNavigate();
    const { isLoggedIn, username, isAdmin, userId } = useAuth();
    const [favorite, setFavorite] =useState([]);
    const [selectedFavorite, setSelectedFavorite] = useState({});
  
    const [showDelete, setShowDelete] = useState(false);
    const [findProductCart, setFindProductCart] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const favoriteResponse = await axiosClient.get(`/Favorites/userId`, {
                    params: { userId: encodeURIComponent(userId) }
                });
                setFavorite(favoriteResponse.data);
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
    }, [userId]);
    console.log('uid',userId)
    console.log('username',username)
    console.log('list',favorite)
    console.log('cart',cart)
    const handleViewDetails = () => {
        console.log('Xem Thông Tin:');
      };
    
        // xử lý thêm sản phẩm vào giỏ hàng ( có thêm phâm quyền)
    const handleAddToCart =  (productId,productSku) => {
      const token = localStorage.getItem('token');
  
      //const cartItem = cart.find(a => a.product.id === productId);
      //const foundCartItem = cart.find(a => a.product.id === productId && a.combo.productType.name === comboName);
      
      let cartItem = null;
      if(productSku === undefined){
        cartItem = cart.find(a => a.comboId === productId);
      }else{
        cartItem = cart.find(a => a.productId === productId);
      }
      console.log('cartItem',cartItem)
  
      let foundProduct = false;
      
      if (cartItem) {
        
       //Tạo biến gán id của các sản phẩm, combo và của giỏ hàng
          let idP = cartItem.productId;
          let idC = cartItem.comboId;
          let id  = cartItem.id;

          if(idP  === productId && productSku !== undefined || productSku !== null) //kiểm tra sản (product) có tồn tại ở giỏ hàng chưa
          {
            foundProduct =true;
            const updateItem = { ...cartItem, quantity: cartItem.quantity  + 1}; // số lượng sản phẩm  có id trùng với sản phẩm muốn thêm +1
            try{
                // thay đổi số lượng , gửi thêm token để xác nhận quyền
                axiosClient.put(`/Carts/${id}`, updateItem, {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    // Các headers khác nếu cần thiết
                  },})
                  .then(response => {
                      // Xử lý kết quả từ API
                      console.log(response.data);
                      // Chuyển hướng đến trang productType sau khi thành công
                      navigate('/Shop/cart');
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
            }
            catch
            {
              console.log('lỗi khi thêm vào giỏ hàng')
            }
            
          }else if(idC  === productId && productSku === undefined || productSku !== null)//kiểm tra sản (combo) có tồn tại ở giỏ hàng chưa
          {
            foundProduct =true;
            const updateItem = { ...cartItem, quantity: cartItem.quantity  + 1};
            try{
              //gửi thêm token để xác nhận quyền
                axiosClient.put(`/Carts/${id}`, updateItem, {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    // Các headers khác nếu cần thiết
                  },})
                  .then(response => {
                      // Xử lý kết quả từ API
                      console.log(response.data);
                      // Chuyển hướng đến trang productType sau khi thành công
                      navigate('/Shop/cart');
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
            }
            catch
            {
              console.log('lỗi khi thêm vào giỏ hàng')
            }
          }
        }
  // trường hợp không tìm thấy sản phẩm (product, combo) trong giỏ hàng thì tạo ra một thông tin mới cho gỏ hàng vào tạo và giỏ hàng
          if (!foundProduct) {
            const cart = {
              userId: userId,
              productId: productSku !== undefined ? productId : null,
              ComboId: productSku !== undefined ? null :productId,
              quantity: 1
            };
         //gửi thêm token để xác nhận quyền
            axiosClient.post(`/Carts`, cart, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                // Các headers khác nếu cần thiết
              },})
              .then(response => {
                  // Xử lý kết quả từ API
                  console.log(response.data);
                  // Chuyển hướng đến trang productType sau khi thành công
                  navigate('/Shop/cart');
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
          }
      };
      
      const handleShowDelete = (id,producttypeName) => {
        producttypeName === undefined 
        ? setSelectedFavorite(favorite.find(a => a.comboId === id && a.combo.sku === undefined))
        : setSelectedFavorite(favorite.find(a => a.productId === id && a.product.sku === producttypeName));
          setShowDelete(true);
      }
      const handleCloseDelete = () => setShowDelete(false);
  
      const handleDelete = () => {
        // thêm xử lý gửi dữ liệu token để kiểm tra quyền truy cập
        const token = localStorage.getItem('token');
  
          axiosClient.delete(`/Favorites/${selectedFavorite.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              // Các headers khác nếu cần thiết
            },})
            .then(response => {
                // Xử lý kết quả từ API
                console.log(response.data);
                // Chuyển hướng đến trang productType sau khi thành công
                navigate(`/Shop/favoriteList/${userId}`);
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
          
          let list = favorite;
          list.splice(favorite.findIndex(a => a.id === selectedFavorite.id), 1);
          setFavorite(list);
          setShowDelete(false);
      }
    
    console.log('favorite', favorite);
    console.log('favoriteselect', selectedFavorite);
    let Nameprodct ='';
    if (selectedFavorite && selectedFavorite.combo && selectedFavorite.combo.name) {
      Nameprodct = selectedFavorite.combo.name;
      console.log('ComboName is ',Nameprodct);
    } else {
      // Kiểm tra từng cấp độ để xác định vấn đề là ở đâu
      if (!selectedFavorite) {
        console.log('selectedFavorite is undefined or null.');
      } else if (!selectedFavorite.combo) {
        console.log('Combo is undefined or null.');
      } else {
        console.log('Combo name is undefined or not available.');
      }
    }
    if (selectedFavorite && selectedFavorite.product && selectedFavorite.product.name) {
      Nameprodct = selectedFavorite.product.name;
    } else {
      // Kiểm tra từng cấp độ để xác định vấn đề là ở đâu
      if (!selectedFavorite) {
        console.log('selectedFavorite is undefined or null.');
      } else if (!selectedFavorite.product) {
        console.log('Combo is undefined or null.');
      } else {
        console.log('Combo name is undefined or not available.');
      }
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
                          <h2>Sản phẩm yêu thích</h2>
                          <div className="breadcrumb__option">
                              <a href="/">Trang chủ</a>
                              <span>Sản phẩm yêu thích</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
        <section>
        <div className="container">
        <Row>
      {favorite.map((item, index) => (
        <Col key={index} md={4}>
          <Card style={{ width: '18rem', margin: '10px' }}>
            <Card.Img variant="top" src={`${baseURL}/Images/${item.combo ? item.combo.images.img : item.product.images.img}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>{item.combo ? item.combo.name : item.product.name}</Card.Title>
              <Card.Text>
                {/* Các thông tin khác về sản phẩm */}
              </Card.Text>
              <Button variant="primary">
                <Link className="ButtonLink" to={`/Shop/product/detail/${item.combo ?
                                                            item.combo.id+"&productTypeId="+item.combo.productType.id :
                                                            item.product.id}`}>
                <FontAwesomeIcon icon={faEye} className="eye-icon" />
                </Link>
            </Button>
              <Button variant="success add_wishList_Cart" 
              onClick={() => handleAddToCart(item.combo ? item.combo.id : item.product.id,
                                             item.combo ? item.combo.productType.name : item.product.productType.name,
                                             item.combo ? item.combo.sku : item.product.sku)} 
                                             style={{ marginLeft: '10px' , position: 'relative' }}>
              <FontAwesomeIcon icon={faShoppingBag}  />
              <span style={{ marginRight: '5px', position: 'absolute', top: 0, right: 0 }} >+</span>
              </Button>
              <Button variant="danger"  onClick={() => handleShowDelete(item.combo ? item.comboId : item.productId,
                                             item.combo ? item.combo.sku : item.product.sku)} style={{ marginLeft: '10px' }}>
              <FontAwesomeIcon icon={faTrash}  />
            </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
        </div>
        <Modal show={showDelete} onHide={handleCloseDelete} centered>
        {/* {console.log('select',selectedFavorite.combo.name)} */}
        <Modal.Header closeButton>
            <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xóa sản phẩm yêu thích <span style={{ fontWeight: "bold" }}>{Nameprodct} không</span>?</Modal.Body>
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
 
export default FavoriteList;
 // <Link
                        //   to="/GioHang/ThemGioHang?iMaMon=10&amp;strURL=https%3A%2F%2Flocalhost%3A44362%2F"
                        // >