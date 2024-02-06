import React, { useEffect, useState } from 'react';
import axiosClient from '../Component/axiosClient';
import {baseURL} from '../Component/axiosClient';
import OwlCarousel from 'react-owl-carousel';
import { Link,useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Component/auth';

const Product = () => {
  const navigate =  useNavigate();
  
  const location = useLocation();
    const [Products, setProducts] = useState([]);
    const [Combos, setCombos] = useState([]);
    const [ProductTypes, setProductTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [cart, setCart] = useState([]);
    const { isLoggedIn,LastName,FirtName, username, isAdmin, userId} = useAuth();



    useEffect(() => {
      axiosClient.get(`/ProductTypes`).then((res) => setProductTypes(res.data));
      axiosClient.get(`/Products`).then((res) => {
        // Kiểm tra nếu có tham số tìm kiếm thì lọc dữ liệu theo tham số
        if (location.search.includes('search')) {
          const searchParam = new URLSearchParams(location.search);
          const searchQuery = searchParam.get('search');
          const selectedProductType = searchParam.get('selectedProductType');
          const minPrice = searchParam.get('minPrice');
          const maxPrice = searchParam.get('maxPrice');
        
          let filteredProducts = res.data.filter(product => {
            const nameMatches = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const typeMatches = selectedProductType ? product.productType.id === parseInt(selectedProductType) : true;
            const priceMatches = (minPrice || maxPrice)
              ? product.price >= parseInt(minPrice) || product.price <= parseInt(maxPrice)
              : true;
        
            return nameMatches && typeMatches && priceMatches;
          });
        
          setProducts(filteredProducts);
          console.log('Filtered Products', filteredProducts);
        } else {
          setProducts(res.data);
        }
        
        setIsDataLoaded(true);
       
      });
      
      axiosClient.get(`/Comboes`).then((res) => {
        if (location.search.includes('search')) {
          const searchParam = new URLSearchParams(location.search);
          const searchQuery = searchParam.get('search');
          const selectedProductType = searchParam.get('selectedProductType');
          const minPrice = searchParam.get('minPrice');
          const maxPrice = searchParam.get('maxPrice');
        
          let filteredProducts = res.data.filter(product => {
            const nameMatches = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const typeMatches = selectedProductType ? product.productType.id === parseInt(selectedProductType) : true;
            const priceMatches = (minPrice || maxPrice)
              ? product.price >= parseInt(minPrice) || product.price <= parseInt(maxPrice)
              : true;
        
            return nameMatches && typeMatches && priceMatches;
          });
        
          setCombos(filteredProducts);
          console.log('Filtered Products', filteredProducts);
        } else {
          setCombos(res.data);
        }
        
        setIsDataLoaded(true);
        
      });
    }, [isDataLoaded, location.search]);

    const allItems = [...Products, ...Combos];
    console.log("produc:",allItems);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allItems.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(allItems.length / productsPerPage);

// Hàm xử lý trang trước
    const handlePrevPage = () => {
      if (currentPage > 1) {
        paginate(currentPage - 1);
      }
    };

    // Hàm xử lý trang sau
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        paginate(currentPage + 1);
      }
    };

// Function to handle next page
    
    
    let carouselOptions = {
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        smartSpeed: 1200,
        autoplay: true,
        settimeout: 1000,
      };
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


 console.log('login',isLoggedIn)
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
              <h2>Kiwi`s Fast food</h2>
              <div className="breadcrumb__option">
                <a href="/">Trang chủ</a>
                <span>Thực đơn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="product spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-5">
            <div className="sidebar">
              <div className="sidebar__item">
                <h4>Thực đơn</h4>
                <ul>
                    {ProductTypes.map
                    ((producttypes,index) =>(
                        <li key={index}>
                          <a href={`/Shop/categori/${producttypes.id}`}>
                            {producttypes.name}
                          </a>
                        </li>
                    ))
                    }
                </ul>
              </div>
              <div className="sidebar__item">
                <div className="latest-product__text">
                  <h4>Cập nhật mới</h4>
                  <OwlCarousel
                        className="latest-product__slider owl-carousel owl-loaded owl-drag"
                        {...carouselOptions}
                    >
                      {/* {console.log(Products)} */}
                        {allItems.map((product, index) => (
                        <div className="latest-prdouct__slider__item">
                            <a href={`/Shop/product/detail/${product.productType.name == "ComBo" ?
                                                            product.id+"&productTypeId="+product.productType.id :
                                                            product.id}`} className="latest-product__item">
                                <div className="latest-product__item__pic">
                                
                                
                                <img src={`${baseURL}/Images/${product.images.img}`} alt="Ảnh minh họa shop"/>
                                    
                                </div>
                                <div className="latest-product__item__text">
                                    <h6>{product.name}</h6>
                                    <span>{product.price.toLocaleString('vi-VN')}</span>
                                </div>
                            </a>
                        </div>
                        
                      ))}
                        
                    </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-7">
            <div className="row">
              {/* Product items */}
              {/* Replace this section with your dynamic product items */}
              {currentProducts.map((product, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-6">
                <div className="product__item">
                  <div
                    className="product__item__pic set-bg"
                    data-setbg={`${baseURL}/Images/${product.images.img}`}
                    style={{ backgroundImage: `url(${baseURL}/Images/${product.images.img})` }}
                  >
                    <ul className="product__item__pic__hover">
                      <li>
                        <Link to={`/Shop/product/detail/${product.productType.name == "ComBo" ?
                                                            product.id+"&productTypeId="+product.productType.id :
                                                            product.id}`}>
                          <i className="fa fa-eye"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                        
                          onClick={() => handleAddToCart(product.id,product.productType.name,product.sku)}
                        >
                          <i className="fa fa-shopping-cart"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6>
                      <Link to="#">{product.name}</Link>
                    </h6>
                    <h5>{product.price.toLocaleString('vi-VN')} vnđ</h5>
                  </div>
                </div>
              </div>
            ))}
              {/* Repeat the above block for other product items */}
            </div>
            <div className="product__pagination">
            <div className="pagination-container">
                <br/><br/>
              <ul className="pagination">
                
              <span className="pagination-container">
                <button className="pagination-button" onClick={handlePrevPage} disabled={currentPage === 1}>
                «
                </button>
                <span className="pagination-info">
                  {currentPage} / {totalPages}
                </span>
                <button className="pagination-button" onClick={handleNextPage} disabled={currentPage === totalPages}>
                »
                </button>
            </span>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>

    </> 
    );
}
 
export default Product;