import React from 'react'

type Props = {}

function Footer({ }: Props) {
  return (
    <div>
      <footer className="footer footer__section">
        <div className="container">
          <div className="footer__content">
            <div className="footer__row">
              <div className="footer__col">
                <h2 className="footer__logo">
                  <a href="#">Elanning</a>
                </h2>
                <p>
                  Elanning cung cấp các khóa học về lập trình với hệ thống hiện đại, hỗ trợ học viên 24/7.Chương trình giảng dạy năng đông, linh hoạt phù hợp với thời đại 4.0 hiện nay.Đặc biệt kết nối học viên với các doanh nghiệp tuyển dụng.
                </p>
                <div className="footer__social">
                  <a href="#"><i className="fab fa-facebook" /></a>
                  <a href="#"><i className="fab fa-twitter" /></a>
                  <a href="#"><i className="fab fa-instagram" /></a>
                  <a href="#"><i className="fab fa-linkedin" /></a>
                </div>
              </div>
              <div className="footer__col">
                <h2 className="footer__title">Danh Mục</h2>
                <ul className="footer__menu">
                  <li className="footer__link">
                    <a href="#">Trang Chủ</a>
                  </li>
                  <li className="footer__link">
                    <a href="#">Trang Cá Nhân</a>
                  </li>
                  <li className="footer__link">
                    <a href="#">Danh Sách Khoá Học</a>
                  </li>
                </ul>
              </div>
              <div className="footer__col">
                <h2 className="footer__title">Tổng Đài Hỗ Trợ</h2>
                <ul className="footer__menu">
                  <li className="footer__link">
                    <a href="#">Đat: 0922973414</a>
                  </li>
                  <li className="footer__link">
                    <a href="#">Giang: 0373894058</a>
                  </li>
                  <li className="footer__link">
                    <a href="#">Thắng: 0909783098 </a>
                  </li>
                  
                </ul>
              </div>
              <div className="footer__col">
                <h2 className="footer__title">Theo Dõi Bản Tin</h2>
                <p>
                Nhập email của bạn và nhận tin tức, cập nhật mới nhất và các ưu đãi đặc biệt từ chúng tôi.
                </p>
                <div className="footer__subscibe">
                  <input type="text" placeholder="Địa chỉ email của bạn" />
                  <button className="btn btn-primary btn-subscibe">
                      Gửi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <div className="copyright__content">
              <p>
                © 2022 Elanning. All rights reserved. Design by <a href="#">Tường Giang & Đức Thắng & Thành Đạt</a>
              </p>
              <div className="copyright-right">
                <a href="#">Careers</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Contact us</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer