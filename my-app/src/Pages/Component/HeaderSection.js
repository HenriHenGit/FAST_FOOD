import {useEffect, useState} from 'react';
import {useLocation,useNavigate,Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { isEmpty, set } from 'lodash';
import { Button, Col, Modal, Row} from "react-bootstrap";
import { faCheck, faEdit, faPlus, faTimes, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "../Component/axiosClient";
import { useAuth  } from '../Component/auth';
import Logoutgg from '../Customer/logoutgg';



const HeaderSection = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn,LastName,FirtName, username, isAdmin, userId} = useAuth();
  const [selectedProductType, setSelectedProductType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [NameSearch, setNameSearch] = useState('');
  const [showDFilter, setShowFilter] = useState(false);
  const [ProductTypes, setProductTypes] = useState([]);
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [CountCartValue, setCountCartValue] = useState(0);
  const [favoritevalue, setFavoritevalue] =useState(0);





  useEffect(() => {
    // Fetch the cart data from the server or use local storage
    const fetchCartData = async () => {
      try {
        const favoriteResponse = await axiosClient.get(`/Favorites/userId`, {
          params: { userId: encodeURIComponent(userId) }
        });
        setFavoritevalue(favoriteResponse.data.length);
        // Fetch the cart data from the server
        const response = await axiosClient.get('/Carts/userId', {
          params: { userId: encodeURIComponent(userId) },
        });
        setCountCartValue(response.data.length)
        // Calculate the total cart value
        const total = response.data.reduce((acc, item) => {
          if (item.combo) {
            return acc + item.combo.price * item.quantity;
          }
          return acc + item.product.price * item.quantity;
        }, 0);

        // Set the total cart value to the state
        setTotalCartValue(total);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    // Call the fetchCartData function
    fetchCartData();
  })
  



    


  // Kiểm tra nếu URL chứa "/shop" thì hiển thị breadcrum
  
  const menuItems = [
    { to: "/", label: "Trang chủ" },
    { to: "/Shop", label: "Thực đơn" },
    { to: "/Contact", label: "Liên hệ" },
    { label: "Tài khoản" },
  ];
  const [account, setAccount] =useState([]);
  const [selectedAccount, setSelectedAccount] = useState({});
  useEffect(() =>{
    axiosClient.get(`/Users`)
         .then(res =>setAccount(res.data));
},[isLoggedIn, username]);
  const [showDProfile, setShowProfile] = useState(false);
    const handleShowProfile = (username) => {
      setSelectedAccount(account.find(a => a.userName === username));
        setShowProfile(true);
    }
  const handleCloseProfile = () => setShowProfile(false);

  const handleLogout = () => {
      localStorage.removeItem('token');
      window.location.href = `http://localhost:3000/NguoiDung/DangNhap`;  
  }
  useEffect(()=>{
    axiosClient.get(`/ProductTypes`)
          .then(res =>setProductTypes(res.data));
  },[]);
  useEffect(() => {
    // Tìm menuItem dựa trên location.pathname
    const currentMenuItem = menuItems.find(item => item.to === location.pathname);

    // Nếu tìm thấy, cập nhật document.title
    if (currentMenuItem) {
      document.title = currentMenuItem.label;
    }
  }, [location.pathname]);

  const handleSearch = () => {
    console.log('selectedProductType:', selectedProductType);
    console.log('minPrice:', minPrice);
    console.log('maxPrice:', maxPrice);

    if(NameSearch !== undefined || NameSearch !== null) {
    let searchParams = `/Shop?search=${encodeURIComponent(NameSearch)}`;
    

    if (selectedProductType) {
      searchParams += `&selectedProductType=${selectedProductType}`;
    }
  
    if (minPrice) {
      searchParams += `&minPrice=${minPrice}`;
    }
  
    if (maxPrice) {
      searchParams += `&maxPrice=${maxPrice}`;
    }

      navigate(searchParams);

    }
  };

  const handleShowFilter = () => {
    setShowFilter(true);
  }

  const handleCloseShowFilter = () => setShowFilter(false);

  const handleResetShowFilter = () => {
    console.log('Reset button clicked');
    setSelectedProductType(''); // Đặt lại giá trị cho select Loại thức ăn
    setMinPrice(''); // Đặt lại giá trị cho select Giá tiền từ
    setMaxPrice(''); // Đặt lại giá trị cho select Giá tiền đến
  }
  return (<>
    <header className="header">
      {/* Top Header */}
      <div className="header__top">
        <div className="container">
          <div className="row">
            {/* Left Section */}
            <div className="col-lg-6 col-md-6">
              <div className="header__top__left">
                <ul>
                  <li><i className="fa fa-envelope"></i> fsatfoodldh@gmail.com</li>
                  <li>Miễn phí giao hàng hóa đơn 350k trở lên</li>
                </ul>
              </div>
            </div>
            {/* Right Section */}
            <div className="col-lg-6 col-md-6">
              <div className="header__top__right">
                {/* Social Icons */}
                <div className="header__top__right__social">
                  <a href="#"><i className="fa fa-facebook"></i></a>
                  <a href="#"><i className="fa fa-instagram"></i></a>
                  <a href="#"><i className="fa fa-twitter"></i></a>
                  <a href="#"><i className="fa fa-pinterest"></i></a>
                </div>
                {/* Language Selector */}
                <div className="header__top__right__language">
                  <img src="img/language.png" alt="" />
                  <div>Tiếng Việt</div>
                  <span className="arrow_carrot-down"></span>
                  <ul>
                    <li><a href="/">Tiếng Việt</a></li>
                    <li><a href="#">Tiếng Anh</a></li>
                  </ul>
                </div>
                {/* Authentication */}
                <div className="header__top__right__auth">
                {isLoggedIn ? (
                  <div className="user-profile">
                  <i className="fa fa-user"></i>
                    <span>{LastName+" "+FirtName}</span>
                    <ul className="header__menu_atuh__dropdown" >
                      {/* Các menu tài khoản nếu đăng nhập thành công */}

                      <li><Logoutgg/></li>
                      
                        
                    </ul>
                  </div>
                ) : (
                  <Link to="/NguoiDung/DangNhap"><i className="fa fa-user"></i>Đăng nhập</Link>
                )}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="center-container">
          <div className="Search_Product">
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
              <input
                onChange={(e) => setNameSearch(e.target.value)}
                style={{ border: '3px solid #333333', width: '400px' }}
                type="text"
                placeholder="Tìm sản phẩm"
              />
              <button type="submit" className="site-btn">
                Tìm kiếm
              </button> 
              
              <a onClick={() => handleShowFilter()}><i className="fa fa-filter"></i></a>
              
            </form>
          </div>
          
        </div>
      {/* Main Header */}
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="header__logo">
              <a href="/"><img src="/Assets/Images/logoFastFood.png" alt="" style={{ height: '55px', width: '119px' }} /></a>
            </div>
          </div>
          <div className="col-lg-6">
            {/* Navigation Menu */}
            <nav className="header__menu">
            <ul>
              {menuItems.map((menuItem, index) => (
                <li key={index} className={location.pathname === menuItem.to ? 'active' : ''}>
                  <Link to={menuItem.to}>{menuItem.label}</Link>
                  {isLoggedIn ? (
                  <>
                  {menuItem.label === "Tài khoản" && ( 
                  <ul className="header__menu__dropdown" >
                      {/* Các menu tài khoản nếu đăng nhập thành công */}
                      <li ><Link to="/Shop/account"  >Trang Cá Nhân</Link></li>
                      <li ><Link to="/Shop/account/orderManagement"  >Quản lý đơn hàng</Link></li>
                      <li ><Link to={`/Shop/favoriteList/${userId}`} >Món ăn yêu thích</Link></li>
                      <li><Logoutgg/></li>
                    </ul>
                   )}
                    </>
                ) : (
                  <>
                  {menuItem.label === "Tài khoản" && ( 
                    <ul className="header__menu__dropdown">
                      <li>
                      <Link to="/NguoiDung/DangKy">Đăng ký</Link>
                      </li>
                      <li>
                      <Link to="/NguoiDung/DangNhap">Đăng nhập</Link>
                      </li>
                    </ul>
                    )}
                  </>
                )}
                 </li>
                
              ))}
            </ul>
            </nav>
          </div>
          <div className="col-lg-3">
            {/* Cart Section */}
            {isLoggedIn ? (<>  <div className="header__cart">
            <ul>
              <li><a href={`/Shop/favoriteList/${userId}`}><i class="fa fa-heart"></i><span>{favoritevalue}</span></a></li>
              <li><a href="/Shop/cart"><i className="fa fa-shopping-bag"></i> <span>{CountCartValue}</span></a></li>
            </ul>
            <div className="header__cart__price">Tổng tiền <span>{totalCartValue.toLocaleString('vi-VN')} vnđ</span></div>
          </div></>) : null}
           
          </div>
        </div>
        {/* Mobile Menu Icon */}
        <div className="humberger__open">
          <i className="fa fa-bars"></i>
        </div>
      </div>
      
    </header>
    {/* <Modal show={showDProfile} onHide={handleCloseProfile} centered>
    <Modal.Header closeButton>
        <Modal.Title>Thông tin tài khoản</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Row>
    <Col md={4}>
    <i className="fas fa-user"></i> 
    </Col>
    <Col md={4}>
        <dl>
            <dt>Tên đăng nhập:</dt>
            <dd>{selectedAccount.userName}</dd>

            <dt>Email:</dt>
            <dd>{selectedAccount.email}</dd>

            <dt>SĐT:</dt>
            {selectedAccount.phoneNumber ? selectedAccount.phoneNumber : 'Không có thông tin'}
        </dl>
    </Col>
    <Col md={4}>
        <dl>
            <dt>Họ tên:</dt>
            <dd>{selectedAccount.normalizedUserName} </dd>

            <dt>Loại tài khoản:</dt>
            <dd>{isAdmin ? "Quản trị viên" : "Thành viên"}</dd>
        </dl>
    </Col>
</Row>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="warning" style={{ marginRight: "5px" }}><Link to={`/admin/account/edit/${selectedAccount.id}`}  >
    <FontAwesomeIcon icon={faEdit} />
</Link> </Button>
        <Button variant="secondary" onClick={handleCloseProfile}>
            <FontAwesomeIcon icon={faTimes} /> Hủy bỏ
        </Button>
    </Modal.Footer>
</Modal> */}

<Modal show={showDFilter} onHide={handleCloseShowFilter} centered>
    <Modal.Header closeButton>
        <Modal.Title><i className="fa fa-filter"></i><b>Bộ Lọc tìm kiếm</b></Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Row>
    <Col md={4}>
    <dt>Loại thức ăn</dt>
    <dt>Giá tiền</dt>
    </Col>
    <Col md={4}>
    <dl>
            
            <dd>       
            <select value={selectedProductType} onChange={(e) => setSelectedProductType(e.target.value)}>
              <option value="">Chọn loại---</option>
              {ProductTypes.map((productType, index) => (
                <option key={index} value={productType.id}>
                  {productType.name}
                </option>
              ))}
            </select>
            </dd> 
            <dd>
              <select value={minPrice} onChange={(e) => setMinPrice(e.target.value)}>
                <option value="">Giá từ ---</option>
                <option value="0">0</option>
                <option value="30000">30000</option>
                <option value="60000">60000</option>
                <option value="100000">100000</option>
                <option value="200000">200000</option>
                <option value="300000">300000</option>
              </select>
              
              <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
                <option value="">đến ---</option>
                <option value="30000">30000</option>
                <option value="60000">60000</option>
                <option value="100000">100000</option>
                <option value="200000">200000</option>
                <option value="300000">300000</option>
              </select>

              
            </dd>
            
        </dl>
    </Col>
    
</Row>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="warning" style={{ marginRight: "5px" }} onClick={() => {handleResetShowFilter()}} > Thiết lập lại</Button>
        <Button variant="success" onClick={handleCloseShowFilter}>
            <FontAwesomeIcon icon={faPlus} /> Áp dụng
        </Button>
    </Modal.Footer>
</Modal>
    </>
  );
};

export default HeaderSection;
