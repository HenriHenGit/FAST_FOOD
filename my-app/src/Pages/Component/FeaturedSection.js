import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import { useEffect,useState } from 'react';
import _ from 'lodash';
import axiosClient from '../Component/axiosClient';
import {baseURL} from '../Component/axiosClient';
import { useAuth } from './auth';

const FeaturedSection = () => {
  const navigate =  useNavigate();
  const [Products, setProduct] = useState([]);
  const [Combos, setCombos] = useState([]);//đây 
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [cart, setCart] = useState([]);
  const {  userId } = useAuth();
  useEffect(() => {
    axiosClient.get(`/Products`)
      .then(res => {
        setProduct(res.data);
        setIsDataLoaded(true);
      });
      axiosClient.get(`/Comboes`).then((res) => {//đây 
        setCombos(res.data);
      });//đây 
      $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
      }); 
  },[]);
   // lấy dữ liệu giỏ hàng
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
  const allItems = [...Products, ...Combos];//đây 
  let shuffledProducts = _.shuffle(allItems);//đây 

  // Chọn 8 sản phẩm đầu tiên
  let selectedProducts = shuffledProducts.slice(0, 8);
  
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
    <section className="featured spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Món ăn nổi bật</h2>
            </div>
          </div>
        </div>
        <div className="row featured__filter">
        
          {selectedProducts.map((product,index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
              <div className="featured__item">
                <div className="featured__item__pic set-bg" data-setbg={`${baseURL}/Images/${product.images.img}`}
                  style={{ backgroundImage: `url(${baseURL}/Images/${product.images.img})` }}>
                  <ul className="featured__item__pic__hover">
                    <li><Link to={`/Shop/product/detail/${product.productType.name == "ComBo" ?//đây 
                                                            product.id+"&productTypeId="+product.productType.id :
                                                            product.id}`}><i className="fa fa-eye"></i></Link></li>
                    {/* //đây  */}<li><Link  onClick={() => handleAddToCart(product.id,product.sku)} ><i className="fa fa-shopping-cart"></i></Link></li>
                  </ul>
                </div>
                <div className="featured__item__text">
                  <h6><Link to="#">{product.name}</Link></h6>
                  <h5>{product.price.toLocaleString('vi-VN')} vnđ</h5>
                </div>
              </div>
            </div>
            
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
