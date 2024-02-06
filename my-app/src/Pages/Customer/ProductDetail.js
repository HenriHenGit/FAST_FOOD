import React, { useEffect, useState } from 'react';
import axiosClient from '../Component/axiosClient';
import { baseURL } from '../Component/axiosClient';
import { useNavigate, useParams } from "react-router-dom";
import Star_Rating from './Star_Rating';
import { useAuth  } from '../Component/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setFavorite, setFindProduct } from './favoriteActions';
import moment from 'moment';


const ProductDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [Product, setProduct] = useState({});
    const [account, setAccount] = useState([]);
    const [cart, setCart] = useState([]);
    const [isLinkDisabled, setisLinkDisabled] = useState();
    const dispatch = useDispatch();
    const { favorite, findProduct } = useSelector(state => state.favorite);
    const [Combodetai, setCombodetai] = useState([]);
    let [idcbb] = [''];
    const [Rating, setRating] = useState([]);
  
    

    // Thông tin đăng nhập và userName
  const { isLoggedIn, username, userId } = useAuth();
  const [dataLoading, setDataLoading] = useState(true);

    
//   useEffect(() => {
//     axiosClient.get(`/Products/${id}`)
//     .then(res => setProduct(res.data));
//   },[]);

    // useEffect(()=>{
    //     axiosClient.get
    // },[Rating]);
    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
      };

    useEffect(() =>{
        axiosClient.get(`/Ratings`).then((response) => {
            setRating(response.data)
        })
    },[]);
    console.log('rating', Rating);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const productsResponse = await axiosClient.get(`/Products/${id}`);
                // setProduct(productsResponse.data);
               

                // const favoriteResponse = await axiosClient.get(`/Favorites/userId`, {
                //     params: { userId: encodeURIComponent(userId) }
                // });
                // console.log('Favorite Response:', favoriteResponse.data);
                // dispatch(setFavorite(favoriteResponse.data));
                // dispatch(setFindProduct(favorite.find(a => a.productId === parseInt(id))));
                
                
                // const state = {
                //     favorite: favoriteResponse.data,
                //     findProduct: favorite.find(a => a.productId === parseInt(id)),
                // };
                // localStorage.setItem('reduxState', JSON.stringify(state));

                //kiểm tra đường dẫn có phần id của combo hay không
                if (id.includes('&') && id.includes('=')){
                    const matchResult = id.toString().match(/(\d+)&productTypeId=(\d+)/);// biến id thành chuỗi, và lấy các số id và productDetail
                    let [, idcb, productTypeIdcb] = (''); // tạo biến để lấy id của combo và productdetail của combo
                    // kiểm tra kết quả của  matchResult nếu có giá trị khác null hoặc undefine
                    // thì biến nó thành số và gán cho biến vừa tạo
                    if (matchResult) {
                        [, idcb, productTypeIdcb] = matchResult.map(Number);
                        idcbb = idcb;
                    }
                    await Promise.all([
                        axiosClient.get(`/Comboes/${idcb}?productTypeId=${productTypeIdcb}`).then((response) => {
                          setProduct(response.data);
                        }),
                        axiosClient.get(`/ComboDetails`).then((response) => {
                            setCombodetai(response.data);
                        }),
                        axiosClient.get(`/Favorites/userId`, {
                          params: { userId: encodeURIComponent(userId) },
                        }).then((response) => {
                          dispatch(setFavorite(response.data));
                          dispatch(setFindProduct(response.data.find((a) => a.comboId === parseInt(idcb) && a.combo.productTypeId === productTypeIdcb)));
                        }),
                      ]);
                   
                        setDataLoading(false);
                }else{
                    await Promise.all([
                    
                        axiosClient.get(`/Products/${id}`).then((response) => {
                          setProduct(response.data);
                        }),
                        axiosClient.get(`/Favorites/userId`, {
                          params: { userId: encodeURIComponent(userId) },
                        }).then((response) => {
                          dispatch(setFavorite(response.data));
                          dispatch(setFindProduct(response.data.find((a) => a.productId === parseInt(id))));
                        }),
                      ]);
                   
                        setDataLoading(false);
                }
                // const usersResponse = await axiosClient.get(`/Users`);
                // setAccount(usersResponse.data);
                // console.log('userdata', usersResponse.data);

                
                // setFindProduct(favorite.find(a => a.productId === parseInt(id)))
                
                // console.log('favorite', favorite);
                // console.log('productData',findProduct)
                 // Lưu dữ liệu vào localStorage
                //  localStorage.setItem('findProduct', JSON.stringify(findProduct));
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchData();
    }, [id,dispatch,  userId]); 

   
    console.log('fetchData',Rating)
    // console.log('favorite', favorite);
    // console.log('productData',findProduct )
    // console.log('productID', id);
    console.log('PRODICT',Product)
    //xử lý ẩn nút thêm vào wishList

    const handleButtonClick = () => {
        const matchResult = id.toString().match(/(\d+)&productTypeId=(\d+)/);
                    let [, idcb, productTypeIdcb] = ('');
                    if (matchResult) {
                        [, idcb, productTypeIdcb] = matchResult.map(Number);
                    
        const favorite = {
            
            ProductId :Product.sku ? id : null,
            ComboId :id.includes('&') && id.includes('=') ? idcb : null,
            userId :userId

        }
        console.log('favoritelocal',favorite)
        console.log('uế',userId)
        axiosClient.post(`/Favorites`, favorite)
        // .then(() => navigate(id.includes('&') && id.includes('=')
        // ?`/Shop/product/detail/${idcb}&productTypeId=${productTypeIdcb}` : `/Shop/product/detail/${id}`));
        
        setisLinkDisabled(true);
        }else{
            const favorite = {
            
                ProductId :Product.sku ? id : null,
                ComboId :id.includes('&') && id.includes('=') ? idcb : null,
                userId :userId
    
            }
            console.log('favoritelocal',favorite)
            console.log('uế',userId)
            // thêm token để kiểm tra quyền
            const token = localStorage.getItem('token');
            axiosClient.post(`/Favorites`, favorite, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  // Các headers khác nếu cần thiết
                },})
               
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

      useEffect(() => {
        setisLinkDisabled(findProduct ? true : false);
      }, [findProduct]);
    
    
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
                    //alert("Thêm vào giỏ hàng thành");
                    //window.location.reload();
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
    console.log('Combodetail',Combodetai);
    return (
        <>
        {dataLoading ? (
            <p>Loading...</p>
          ) : (
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
                                <h2>Thông tin chi tiết</h2>
                                <div className="breadcrumb__option">
                                    <a href="/">Trang chủ</a>
                                    <span>Thông tin chi tiết</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="product-details spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__pic">
                                <div className="product__details__pic__item">
                                    <img className="product__details__pic__item--large" src={`${baseURL}/Images/${Product.images.img}`} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__text">
                            <h3>
                            {Product.name}{' '}
                            {/* Thêm biểu tượng trái tim */}
                            <span role="img" aria-label="heart" style={{ color: findProduct ? 'red' :'white', marginLeft: '5px' }}>
                              &#10084;
                            </span>
                            </h3>
                                <div className="product__details__rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half-o"></i>
                                </div>
                                <div className="product__details__price">
                                    {Product.price && Product.price.toLocaleString('vi-VN')} vnđ
                                </div>
                                
                                { id.includes('&') && id.includes('=') ? (
                                (() => {
                                    const matchResult = id.toString().match(/(\d+)&productTypeId=(\d+)/);
                                    if (matchResult) {
                                    let [, idcb, productTypeIdcb] = matchResult.map(Number);
                                    return Combodetai.map((item) => (
                                        item.comboId === idcb ? <p key={item.id}>{item.description}</p> : null
                                    ));
                                    }
                                    return null;
                                })()
                                ) : (
                                <p>{Product.description}</p>
                                )}
                                
                                <a onClick={() => handleAddToCart(Product.id,Product.sku)} className="primary-btn">THÊM VÀO GIỎ HÀNG</a>
                                <a onClick={() => handleAddToCart(Product.id,Product.sku)} className="primary-btn">Mua hàng</a>
                                {isLoggedIn ? (<>  <a href={(id.includes('&') && id.includes('=')
                                ?`/Shop/product/detail/${Product.id}&productTypeId=${Product.productTypeId}` : `/Shop/product/detail/${id}`)}
                                disabled={findProduct? true : false} onClick={findProduct ? null : handleButtonClick} 
                                className={`wishListAdd-btn ${isLinkDisabled ? 'disabled' : ''}`}> Thêm vào wishlist </a></>): null }
                               
                                <ul>
                                    <li><b>Giao hàng</b> <span>Miễn phí giao hàng hóa đơn trên 350k</span></li>
                                    <li>
                                        <b>Chia sẻ</b>
                                        <div className="share">
                                            <a href="#"><i className="fa fa-facebook"></i></a>
                                            <a href="#"><i className="fa fa-twitter"></i></a>
                                            <a href="#"><i className="fa fa-instagram"></i></a>
                                            <a href="#"><i className="fa fa-pinterest"></i></a>
                                        </div>
                                    </li>
                                </ul>
                                
                            </div>
                            {Rating.length !== 0 &&
                            <div className='Product__Rating__detail'>
                                    <h3><b>Đánh giá:</b></h3>
                                    {Rating.map((rating) => (
                                        rating.productId !== null && rating.comboId === null && 
                                        <div className='Rating__product' style={{top: '30px'}} key={rating.id}>
                                            {console.log('nnnn', id, rating.productId)}
                                            {rating.productId === parseInt(id) ? (
                                                <>
                                                    <span> Ngày đánh giá: {formatDate(rating.ratingTime)}</span>
                                                    <div className="user-profile">
                                                    <i className="fa fa-user"></i><b> {rating.user.lastName} {rating.user.firtName}</b>
                                                    </div>
                                                    <span>Số sao: </span>
                                                    <span className='StarRating'> {'★'.repeat(rating.score)}</span>
                                                    <div>
                                                    <span>Nhận xét: {rating.comment}</span>
                                                    </div>
                                                    
                                                    

                                                    {/* Thêm các thông tin khác của đánh giá bạn muốn hiển thị */}
                                                </>
                                            ) : null}
                                        </div>
                                        || rating.productId === null && rating.comboId !== null && 
                                        <div className='Rating__product' key={rating.id}>
                                            {console.log('nnnn', id, rating.productId)}
                                            {rating.comboId === parseInt(id) ? (
                                                <>
                                                    <span> Ngày đánh giá: {formatDate(rating.ratingTime)}</span>
                                                    <div className="user-profile">
                                                    <i className="fa fa-user"></i><b> {rating.user.lastName} {rating.user.firtName}</b>
                                                    </div>
                                                    <span>Số sao: </span>
                                                    <span className='StarRating'> {'★'.repeat(rating.score)}</span>
                                                    <div>
                                                    <span>Nhận xét: {rating.comment}</span>
                                                    </div>
                                                </>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                                }
                        </div>
                    </div>
                </div>
                
            </section>
            </>
            )}
        </>
    );
}

export default ProductDetail;
