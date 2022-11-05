import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Component/FooterLayout/Footer";
import Header from "../Component/HeaderLayout/Header";

type Props = {};

export default function HomeTemplate({ }: Props) {
  return (
    <>
      <Header />
      <div className="header_section">
      <header id="header">
        <div className="d-flex flex-column">
          <div className="profile">
            <img
              src="../assets/img/image 3.png"
              alt="..."
              className="img-fluid rounded-circle"
            />
            <h1 className="text-light">
              <a href="index.html">Alex Smith</a>
            </h1>
            <div className="social-links mt-3 text-center">
              <a href="#" className="twitter">
                <i className="bx bxl-twitter" />
              </a>
              <a href="#" className="facebook">
                <i className="bx bxl-facebook" />
              </a>
              <a href="#" className="instagram">
                <i className="bx bxl-instagram" />
              </a>
              <a href="#" className="google-plus">
                <i className="bx bxl-skype" />
              </a>
              <a href="#" className="linkedin">
                <i className="bx bxl-linkedin" />
              </a>
            </div>
          </div>
          <nav id="navbar" className="nav-menu navbar">
            <ul >
              <li className="animate__animated animate__fadeIn">
                <a href="#hero" className=" fs-4 fw-normal isactive active"  aria-curreent="page">
                  <i className="bx bx-home" /> <span>Home</span>
                </a>
              </li>

              <li className="animate__animated animate__fadeIn">
                <a href="#resume" className="nav-link scrollto">
                  <i className="bx bx-file-blank" /> <span>Resume</span>
                </a>
              </li>
              <li className="animate__animated animate__fadeIn">
                <a href="#portfolio" className="nav-link scrollto">
                  <i className="bx bx-book-content" /> <span>Portfolio</span>
                </a>
              </li>
              <li className="animate__animated animate__fadeIn">
                <a href="#services" className="nav-link scrollto">
                  <i className="bx bx-server" /> <span>Services</span>
                </a>
              </li>
              <li className="animate__animated animate__fadeIn">
                <a href="#contact" className="nav-link scrollto">
                  <i className="bx bx-envelope" /> <span>Contact</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      </div>
      {/* <header id="header">
        <div className="d-flex flex-column">
          <div className="profile">
            <img src="assets/img/profile-img.jpg" alt="..." className="img-fluid rounded-circle" />
            <h1 className="text-light"><a href="index.html">Alex Smith</a></h1>
            <div className="social-links mt-3 text-center">
              <a href="#" className="twitter"><i className="bx bxl-twitter" /></a>
              <a href="#" className="facebook"><i className="bx bxl-facebook" /></a>
              <a href="#" className="instagram"><i className="bx bxl-instagram" /></a>
              <a href="#" className="google-plus"><i className="bx bxl-skype" /></a>
              <a href="#" className="linkedin"><i className="bx bxl-linkedin" /></a>
            </div>
          </div>
          <nav id="navbar" className="nav-menu navbar">
            <ul>
              <li><a href="#hero" className="nav-link scrollto active"><i className="bx bx-home" /> <span>Home</span></a></li>

              <li><a href="#resume" className="nav-link scrollto"><i className="bx bx-file-blank" /> <span>Resume</span></a></li>
              <li><a href="#portfolio" className="nav-link scrollto"><i className="bx bx-book-content" /> <span>Portfolio</span></a></li>
              <li><a href="#services" className="nav-link scrollto"><i className="bx bx-server" /> <span>Services</span></a></li>
              <li><a href="#contact" className="nav-link scrollto"><i className="bx bx-envelope" /> <span>Contact</span></a></li>
            </ul>
          </nav>
        </div>
      </header> */}

      <Outlet />
      <Footer />
    </>
  );
}
