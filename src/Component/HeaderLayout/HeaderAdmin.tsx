import useSelection from "antd/lib/table/hooks/useSelection";
import { values } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { history } from "../..";
import Login from "../../pages/LoginPage/Login";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  getProductListApi,
  ProductModel,
  DanhMuc,
} from "../../redux/reducers/productProducer";
import { http } from "../../util/setting";

type Props = {};

export default function HeaderAdmin({}: Props) {
  const { arrProductList } = useSelector(
    (state: RootState) => state.productProducer
  );
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const dispatch: AppDispatch = useDispatch();
  console.log(userLogin);
  const renderLoginNavItem = () => {
    if (Object.values(userLogin).length === 0) {
      console.log(123);
      return <NavLink to="/admin/login">Đăng nhập</NavLink>;
    } else {
      return (
        <NavLink to="/profile" style={{ textDecoration: "none" }}>
          <i className="fa-solid fa-user"></i> {userLogin.hoTen}
        </NavLink>
      );
    }
  };
  const renderRegisterNavItem = () => {
    if (Object.values(userLogin).length === 0) {
      console.log(123);
      return <button className="sigup m-2" style={{padding:5 , backgroundColor: 'red', borderRadius:5, fontWeight:600}}><NavLink to="/register">Đăng ký</NavLink></button>;
    } else {
      return 
    
    }
  };

  useEffect(() => {
    const actionCoursesApi = getProductListApi();
    dispatch(actionCoursesApi);
  }, []);



  // --------

  let keywordRef = useRef("");
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    keywordRef.current = e.target.value;
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (keywordRef.current !== "") {
      navigate({
        pathname: "/search",
        search: `?keyword=${keywordRef.current.replace(" ", "+")}`,
      });
    }
  };


  return (
    <div className="container" style={{ padding: 0 }}>
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <a
              className="navbar-brand logo-title"
              href="#"
              onClick={() => {
                navigate("/");
              }}
            >
              CyberSoft Elearning
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active item-nav text-light"
                    aria-current="page"
                    href="#"
                    onClick={() => {
                      navigate("/admin");
                    }}
                  >
                    Trang Chủ
                  </a>
                </li>

     
              </ul>

  

              <ul className="navbar-nav mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active item-nav text-light"
                    aria-current="page"
                    href="#"
                    onClick={() => {
                      navigate("/admin/course");
                    }}
                  >
                    Khóa Học
                  </a>
                </li>

     
              </ul>


              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active item-nav text-light"
                    aria-current="page"
                    href="#"
                    onClick={() => {
                      navigate("/admin/user");
                    }}
                  >
                    Người Dùng
                  </a>
                </li>

     
              </ul>



              <button className="signin">{renderLoginNavItem()}</button>
              {renderRegisterNavItem()}
            </div>
          </div>
        </nav>

 
      </div>
    </div>
  );
}
