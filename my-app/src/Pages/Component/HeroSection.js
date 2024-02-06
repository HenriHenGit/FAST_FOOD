import { useEffect,useState } from 'react';
import _ from 'lodash';
import axiosClient from '../Component/axiosClient';
import {baseURL} from '../Component/axiosClient';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Component/auth';


const HeroSection = () => {
      const [ProductTypes, setProductTypes] = useState([]);
      const [Products, setProduct] = useState([]);
      const [Combos, setCombos] = useState([]);//đây 
      const navigate =  useNavigate();
      const {  userId } = useAuth();
      const [cart, setCart] = useState([]);
      
      useEffect(() => {
          axiosClient.get(`/ProductTypes`)
          .then(res =>setProductTypes(res.data));
          axiosClient.get(`/Products`)
          .then(res => {
            setProduct(res.data);
          });//đây 
          axiosClient.get(`/Comboes`).then((res) => {
            setCombos(res.data);
          });//đây 
          
          $('.set-bg').each(function () {
              var bg = $(this).data('setbg');
              $(this).css('background-image', 'url(' + bg + ')');
          });
          
          $(".humberger__open").on('click', function () {
              $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
              $(".humberger__menu__overlay").addClass("active");
              $("body").addClass("over_hid");
          });
      
          $(".humberger__menu__overlay").on('click', function () {
              $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
              $(".humberger__menu__overlay").removeClass("active");
              $("body").removeClass("over_hid");
          });
          $('.hero__categories__all').on('click', function(){
              $('.hero__categories ul').slideToggle(400);
          });
      
        },[]);
        const allItems = [...Products, ...Combos];//đây 
        const shuffledProducts = _.shuffle(allItems);//đây 
        const selectedProducts = shuffledProducts.slice(0, 1);
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
      }, [userId]);
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
      return (
        <section className="hero">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="hero__categories">
                  <div className="hero__categories__all">
                    <i className="fa fa-bars"></i>
                    <span>Thực đơn</span>
                  </div>
                  <ul>
                  
                    {ProductTypes.map
                    ((producttypes,index) =>(
                      <li key={index}><a href={`/Shop/categori/${producttypes.id}`}> {producttypes.name}</a></li>
                    ))
                    }
                  </ul>
                </div>
              </div>
              {selectedProducts.map
                ((product,index) =>(
                <div key={index} className="col-lg-9">
                  <div className="hero__item set-bg" data-setbg={`${baseURL}/Images/${product.images.img}`}
                      style={{width:'100%', backgroundImage: `url(${baseURL}/Images/${product.images.img})` }}>
                    <div className="hero__text">
                    <span>Đặt Món Nhanh</span>
                      <h2>{product.name}</h2>
                      <p>Giá {product.price.toLocaleString('vi-VN')} vnđ</p>
                      <a href="/Shop/topay" onClick={() => handleAddToCart(product.id,product.sku)} className="primary-btn">Đặt món ngay</a>
                    </div>
                  </div>
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      );
    };
    
    export default HeroSection;

// import { useEffect,useState } from 'react';
// import _ from 'lodash';
// import axios from 'axios';
// import $ from 'jquery';


// const HeroSection = () => {
//     const [ProductTypes, setProductTypes] = useState([]);
//     const [Products, setProduct] = useState([]);
//     const [isDataLoaded, setIsDataLoaded] = useState(false);
//     useEffect(() => {
//         axios.get(`${baseURL}/api/ProductTypes`)
//         .then(res =>setProductTypes(res.data));
//         axios.get(`${baseURL}/api/Products`)
//         .then(res => {
//           setProduct(res.data);
//           setIsDataLoaded(true);
//         });
//         $('.set-bg').each(function () {
//             var bg = $(this).data('setbg');
//             $(this).css('background-image', 'url(' + bg + ')');
//         });
        
//         $(".humberger__open").on('click', function () {
//             $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
//             $(".humberger__menu__overlay").addClass("active");
//             $("body").addClass("over_hid");
//         });
    
//         $(".humberger__menu__overlay").on('click', function () {
//             $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
//             $(".humberger__menu__overlay").removeClass("active");
//             $("body").removeClass("over_hid");
//         });
//         $('.hero__categories__all').on('click', function(){
//             $('.hero__categories ul').slideToggle(400);
//         });
    
//       },[isDataLoaded]);
//       let shuffledProducts = _.shuffle(Products);

//   // Chọn 8 sản phẩm đầu tiên
//       let selectedProducts = shuffledProducts.slice(0, 1);
//       if (isDataLoaded) {
//       const shuffledProducts = _.shuffle(Products);

//       // Chọn 8 sản phẩm đầu tiên
//       const selectedProducts = shuffledProducts.slice(0, 1);
//       }
//     return (
//       <section className="hero">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-3">
//               <div className="hero__categories">
//                 <div className="hero__categories__all">
//                   <i className="fa fa-bars"></i>
//                   <span>Thực đơn</span>
//                 </div>
//                 <ul>
                
//                   {ProductTypes.map
//                   ((producttypes,index) =>(
//                     <li key={index}><a href={`/Shop/MATheothucdon/${producttypes.id}`}> {producttypes.name}</a></li>
//                   ))
//                   }
//                 </ul>
//               </div>
//             </div>
//             {selectedProducts.map
//                   ((product,index) =>(
//             <div key={index} className="col-lg-9">
//               <div className="hero__item set-bg" data-setbg={`${baseURL}/Images/${product.images.img}`}
//                   style={{width:'100%', backgroundImage: `url(${baseURL}/Images/${product.images.img})` }}>
//                 <div className="hero__text">
//                   <span>Đặt Món Nhanh</span>
//                   <h2>{product.name}</h2>
//                   <p>Giá {product.price.toLocaleString('vi-VN')} vnđ</p>
//                   <a href="/Shop" className="primary-btn">ĐẶT MÓN NGAY</a>
//                 </div>
//               </div>
//             </div>
//             ))
//             }
//           </div>
//         </div>
//       </section>
//     );
//   };
  
//   export default HeroSection;