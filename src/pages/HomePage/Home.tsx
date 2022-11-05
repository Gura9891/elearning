import { Carousel } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { history } from "../..";
import Product from "../../Component/Product/Product";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  getProductApi,
  ProductModel,
} from "../../redux/reducers/productProducer";

type Props = {
  title?: string;
};
const navigate = useNavigate;

export default function Home({ title }: Props) {
  const { arrProduct } = useSelector(
    (state: RootState) => state.productProducer
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    //callapi action thunk
    const actionApi = getProductApi();
    dispatch(actionApi);
  }, []);

  const renderProduct = () => {
    return arrProduct.map((prod: ProductModel, index: number) => {
      return (
        <div className="col-4" key={index}>
          <Product product={prod} />
        </div>
      );
    });
  };

  const handleChange = (value: string) => {
    return history.push(`/course/${value}`);
  };

  // ----
  const renderSplice = () => {
    return arrProduct.map((item: ProductModel, index: number) => {
      if (index === 0 || arrProduct.length === 1) {
        return (
          <div className="carousel-item active" key={index}>
            <div className="carousel-item-content">
              <div className="carousel-left">
                <img src={item.hinhAnh} alt={item.tenKhoaHoc} />
              </div>
              <div className="carousel-right">
                <h2>{item.tenKhoaHoc}</h2>
                <p>{item.moTa.slice(0, 100) + "..."}</p>
                <NavLink className="btn" to={`/detail/${item.maKhoaHoc}`}>
                  View detail
                </NavLink>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="carousel-item" key={index}>
            <div className="carousel-item-content">
              <div className="carousel-left">
                <img src={item.hinhAnh} alt={item.tenKhoaHoc} />
              </div>
              <div className="carousel-right">
                <h2>{item.tenKhoaHoc}</h2>
                <p>{item.moTa.slice(0, 100) + "..."}</p>
                <NavLink className="btn" to={`/detail/${item.maKhoaHoc}`}>
                  Xem Chi Tiết
                </NavLink>
              </div>
            </div>
          </div>
        );
      }
    });
  };

  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    // background: '#364d79',
  };
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <>
      <div className="showing">
        <section className="slider">
          <div className="container">
            <div className="video_carousel">
              <video className="img-fluid" autoPlay loop muted>
                <source
                  src="https://mdbcdn.b-cdn.net/img/video/Tropical.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="gray_overlay"></div>
            </div>
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div id="product-carousel" className="carousel-inner">
                {renderSplice()}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </section>
        <div className="container wrapper">
          <p className="title">Những khoá học nổi bật</p>
          <p className="sub-title">
            Các khóa học trực tuyến tốt nhất cho bạn. Tương tác với các chuyên
            gia hàng đầu và khám phá những bí mật được lưu giữ của thế giới công
            nghệ.
          </p>
          <div className="main">
            <div className="course-list">{renderProduct()}</div>
          </div>

          <div className="footer-btn">
            <button className="btn btn-primary" onClick={() => navigate()}>
              Xem thêm nhiều khoá học
            </button>
          </div>
        </div>
        <section className="count section" style={{padding:"50px 0"}}>
          <div className="container">
            <h3 className="text-center" style={{padding:'20px 0' }}>Thống Kê Thành Tựu Đạt Được</h3>
            <div className="count__content grid">
              <div className="count__item">
                <div className="item__icon icon">
                  <i className="fa fa-book" />
                </div>
                <p><span className="counter">15,100</span></p>
                <p>Khoá Học</p>
              </div>
              <div className="count__item">
                <div className="item__icon icon">
                  <i className="fa fa-user-graduate" />
                </div>
                <p><span className="counter">19,256</span></p>
                <p>Học Viên</p>
              </div>
              <div className="count__item">
                <div className="item__icon icon">
                  <i className="fa-solid fa-building" />
                </div>
                <p><span className="counter">12,100</span></p>
                <p>Việc Làm</p>
              </div>
              <div className="count__item">
                <div className="item__icon icon">
                  <i className="fa fa-chalkboard-teacher" />
                </div>
                <p><span className="counter">10,560</span></p>
                <p>Giảng Viên</p>
              </div>
            </div>
          </div>
        </section>

        <Carousel afterChange={onChange}>
          <section className="testmonial section" style={contentStyle}>
            <div className="container">
              <div className="testimonial__header">
                <h2 className="section__title">Cảm Nhận Của Học Viên</h2>
              </div>
              <div className="testimonial__content">
                <div className="testimonial__item">
                  <div className="item__content">
                    <a href="#" className="comment-img">
                      <img src="../../assets/img/dat.png" alt="..." />
                    </a>
                    <div className="quote">
                      <i className="fas fa-quote-left"></i>
                      <span>OMG! I cannot believe. It's Awesome"</span>
                    </div>
                    <span>
                      "Hệ thống support linh hoạt, hỗ trợ, phản hồi thắc mắc học viên nhanh chóng."
                    </span>
                    <div className="testimonial__info">
                      <h3>Vũ Thành Đạt</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="testmonial section" style={contentStyle}>
            <div className="container">
              <div className="testimonial__header">
                <h2 className="section__title">Cảm Nhận Của Học Viên</h2>
              </div>
              <div className="testimonial__content">
                <div className="testimonial__item">
                  <div className="item__content">
                    <a href="#" className="comment-img">
                      <img src="../../assets/athang.png" alt="..." />
                    </a>
                    <div className="quote">
                      <i className="fas fa-quote-left"></i>
                      <span>OMG! I cannot believe. It's Awesome"</span>
                    </div>
                    <span>
                      "Các khóa học dễ hiểu, phù hợp với các nhu cầu tuyển dụng ngày nay."
                    </span>
                    <div className="testimonial__info">
                      <h3>Nguyễn Tường Giang</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="testmonial section" style={contentStyle}>
            <div className="container">
              <div className="testimonial__header">
                <h2 className="section__title">Cảm Nhận Của Học Viên</h2>
              </div>
              <div className="testimonial__content">
                <div className="testimonial__item">
                  <div className="item__content">
                    <a href="#" className="comment-img">
                      <img src="../../assets/img/avatar2.jpg" alt="..." />
                    </a>
                    <div className="quote">
                      <i className="fas fa-quote-left"></i>
                      <span>OMG! I cannot believe. It's Awesome"</span>
                    </div>
                    <span>
                      "Nhờ các khóa học mà em bổ sung được nhiều kiến thức phù hợp xu hướng hiện nay."
                    </span>
                    <div className="testimonial__info">
                      <h3>Giang Đức Thắng</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Carousel>

      </div>
    </>
  );
}
