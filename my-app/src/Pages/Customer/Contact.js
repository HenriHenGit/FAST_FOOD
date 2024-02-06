import React from 'react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý submit form ở đây nếu cần
  };
  return (
    <>
      <section className="breadcrumb-section set-bg" data-setbg="/Assets/Images/breadcrumb.jpg" style={{ backgroundImage: 'url("/Assets/Images/breadcrumb.jpg")' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Liên hệ</h2>
                <div className="breadcrumb__option">
                  <a href="/">Trang chủ</a>
                  <span>Liên hệ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className="contact__widget">
                <span className="icon_phone"></span>
                <h4>Phone</h4>
                <p>036 430 4226</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className="contact__widget">
                <span className="icon_pin_alt"></span>
                <h4>Address</h4>
                <p>65Đ Huỳnh Thúc Kháng, Bến Nghé, Q1, TP.HCM</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className="contact__widget">
                <span className="icon_clock_alt"></span>
                <h4>Open time</h4>
                <p>10:00 am đến 23:00 pm</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className="contact__widget">
                <span className="icon_mail_alt"></span>
                <h4>Email</h4>
                <p>isrxge@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="map">
        <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.8784834649281!2d106.70032633160932!3d10.771894099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40a3b49e59%3A0xa1bd14e483a602db!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEvhu7kgdGh14bqtdCBDYW8gVGjhuq9uZw!5e0!3m2!1svi!2s!4v1701787635028!5m2!1svi!2s"
        height="500"
        style={{ border: 0 }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"></iframe>
        <div className="map-inside">
          <div className="inside-widget">
            <h4>Cao Đẳng Kỹ Thuật Cao Thắng</h4>
            <ul>
              <li>Điện thoại: 0364304226</li>
              <li>Địa chỉ: 65Đ Huỳnh Thúc Kháng, Bến Nghé, Q1, TP.HCM</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="contact-form spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="contact__form__title">
              <h2>Leave Message</h2>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <input type="text" placeholder="Your name" />
            </div>
            <div className="col-lg-6 col-md-6">
              <input type="text" placeholder="Your Email" />
            </div>
            <div className="col-lg-12 text-center">
              <textarea placeholder="Your message"></textarea>
              <button type="submit" className="site-btn">SEND MESSAGE</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Contact;
