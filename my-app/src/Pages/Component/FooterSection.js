
const Footer = () => {
  return (
    <footer className="footer spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer__about">
              <div className="footer__about__logo">
                <a href="/">
                  <img src="/Assets/Images/logoFastFood.png" alt="" style={{ height: '55px', width: '119px' }} />
                </a>
              </div>
              <ul>
                <li>Địa chỉ: 65Đ Huỳnh Thúc Kháng, Bến Nghé, Q1, TP.HCM</li>
                <li>Điện thoại: 036 430 4226</li>
                <li>Email: fsatfoodldh@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
            <div className="footer__widget">
              <h6>Liên kết</h6>
              <ul>
                <li><a href="#">Về chúng tôi</a></li>
                <li><a href="#">Về Fastfood</a></li>
                <li><a href="#">Đặt món tiện lợi</a></li>
                <li><a href="#">Thông tin giao hàng</a></li>
                <li><a href="#">Chính sách bảo mật</a></li>
                <li><a href="#">Điều khoản</a></li>
              </ul>
              <ul>
                <li><a href="#">Sứ mệnh</a></li>
                <li><a href="#">Dịch vụ</a></li>
                <li><a href="#">Món ăn</a></li>
                <li><a href="#">Liên hệ</a></li>
                <li><a href="#">Sự đổi mới</a></li>
                <li><a href="#">Chứng thực</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="footer__widget">
              <h6>Cập nhật thông tin mới nhất về Fastfood</h6>
              <p>Nhận thông tin mới nhất qua email về cửa hàng và những ưu đãi đặc biệt.</p>
              <form action="#">
                <input type="text" placeholder="Điền email vào đây" />
                <button type="submit" className="site-btn">Đăng ký</button>
              </form>
              <div className="footer__widget__social">
                <a href="#"><i className="fa fa-facebook"></i></a>
                <a href="#"><i className="fa fa-instagram"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-pinterest"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
