import { Col, Row } from "antd";
import { Tabs } from "antd";
import { Button, message, Space } from "antd";

import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { addCart, ProductModel } from "../../redux/reducers/productProducer";

type Props = {
  detailProduct: ProductModel;
};

export default function DetailProduct({ detailProduct }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCart = () => {
    const causer = detailProduct;
    console.log({ causer });
    dispatch(addCart([causer]));
  };

  const success = () => {
    message.success("Thêm vào giỏ hàng thành công !");
  };

  return (
    <div>
      <div className="BodyDetail">
        <div className="container">
          <div className="d-flex content-backgroud">
            <div className="content-left">
              <div className="course-content">
                <h1 className="course-name">{detailProduct.tenKhoaHoc}</h1>
                
                  <span>Đánh giá khóa học</span>
                  <i className="fa-solid fa-star ml-2" style={{color:'yellow'}}></i>
                  <i className="fa-solid fa-star" style={{color:'yellow'}}></i>
                  <i className="fa-solid fa-star" style={{color:'yellow'}}></i>
                  <i className="fa-solid fa-star" style={{color:'yellow'}}></i>
                  <i className="fa-solid fa-star" style={{color:'yellow'}}></i>
                
                <div className="button">
                  <button
                    style={{backgroundColor: '#002333',color:'#fff'}}
                    className="btn"
                    onClick={(detailProduct) => {
                      navigate("/cart");
                      handleCart();
                      success();
                    }}
                  >
                    Đăng Kí
                  </button>
                </div>
              </div>
            </div>
            <div className="content-right">
              <div className="course-image div-6">
                <img src={detailProduct.hinhAnh} alt="" />
              </div>
            </div>
          </div>
          <div className="content mt-3 p-4">
            <h3>Mô tả khoá học :</h3>
            <p>{detailProduct.moTa}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
