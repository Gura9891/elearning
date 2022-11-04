import React from "react";
import {NavLink, Outlet} from "react-router-dom";
import Footer from "../Component/FooterLayout/Footer";
import Header from "../Component/HeaderLayout/Header";
import "./Admin.css"


type Props = {};

export default function AdminTemplate({}: Props) {
  return (
    <>
    
     <Header />
     <header id="header">
  <div className="d-flex flex-column">
    <div className="profile">
      <img src="https://w7.pngwing.com/pngs/582/80/png-transparent-e-learning-learning-management-system-educational-technology-marketing-text-service-logo.png" alt="..." className="img-fluid rounded-circle" />
      <h1 className="text-light"><a href="index.html">Elearning</a></h1>
      <div className="social-links mt-3 text-center">
        <a href="#" className="twitter"><i className="fa-brands fa-twitter"></i></a>
        <a href="#" className="facebook"><i className="fa-brands fa-facebook"></i></a>
        <a href="#" className="instagram"><i className="fa-brands fa-instagram"></i></a>
        <a href="#" className="skype-plus"><i className="fa-brands fa-skype"></i></a>
        <a href="#" className="linkedin"><i className="fa-brands fa-linkedin"></i></a>
      </div>
    </div>
    <nav id="navbar" className="nav-menu navbar">
      <ul>
        <li><NavLink to="/admin/" className="nav-link scrollto active"><i className="bx bx-home" /> <span>Trang Chủ</span></NavLink></li>
        
        <li><NavLink to="/admin/course" className="nav-link scrollto"><i className="bx bx-file-blank" /> <span>Danh sách khóa học</span></NavLink></li>
        <li><NavLink to="/admin/user" className="nav-link scrollto"><i className="bx bx-book-content" /> <span>Thành Viên</span></NavLink></li>

      </ul>
    </nav>
  </div>
</header>
     <Outlet />
     <Footer />
    </>
  );
}
