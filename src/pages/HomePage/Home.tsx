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
        <div className="col-lg-4 col-md-5 col-ms-8" key={index}>
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
                  Xem Chi Ti???t
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
          <div>
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
            </div>
          </div>
        </section>
        <div className="container wrapper">
          <p className="title">Nh???ng kho?? h???c n???i b???t</p>
          <p className="sub-title">
            C??c kh??a h???c tr???c tuy???n t???t nh???t cho b???n. T????ng t??c v???i c??c chuy??n
            gia h??ng ?????u v?? kh??m ph?? nh???ng b?? m???t ???????c l??u gi??? c???a th??? gi???i c??ng
            ngh???.
          </p>
          <div className="main">
            <picture>
              <div className="course-list">{renderProduct()}</div>
            </picture>
          </div>

          <div className="footer-btn">
            <button className="btn btn-primary">
              Xem th??m nhi???u kho?? h???c
            </button>
          </div>
        </div>
        <section className="count section" style={{ padding: "50px 0" }}>
          <div className="container">
            <h3 className="text-center" style={{ padding: '20px 0' }}>Th???ng K?? Th??nh T???u ?????t ???????c</h3>
            <div className="count__content grid">
              <div className="count__item">
                <div className="item__icon icon">
                  <i className="fa fa-book" />
                </div>
                <p><span className="counter">15,100</span></p>
                <p>Kho?? H???c</p>
              </div>
              <div className="count__item">
                <div className="item__icon icon">
                  <i className="fa fa-user-graduate" />
                </div>
                <p><span className="counter">19,256</span></p>
                <p>H???c Vi??n</p>
              </div>
              <div className="count__item">
                <div className="item__icon icon">
                  <i className="fa-solid fa-building" />
                </div>
                <p><span className="counter">12,100</span></p>
                <p>Vi???c L??m</p>
              </div>
              <div className="count__item">
                <div className="item__icon icon">
                  <i className="fa fa-chalkboard-teacher" />
                </div>
                <p><span className="counter">10,560</span></p>
                <p>Gi???ng Vi??n</p>
              </div>
            </div>
          </div>
        </section>

        <Carousel afterChange={onChange}>
          <section className="testmonial section" style={contentStyle}>
            <div className="container">
              <div className="testimonial__header">
                <h2 className="section__title">C???m Nh???n C???a H???c Vi??n</h2>
              </div>
              <div className="testimonial__content">
                <div className="testimonial__item">
                  <div className="item__content">
                    <a href="#" className="comment-img">
                      <img src="../../assets/img/none-user-avatar.jpg" alt="..." />
                    </a>
                    <div className="quote">
                      <i className="fas fa-quote-left"></i>
                      <span>OMG! I cannot believe. It's Awesome"</span>
                    </div>
                    <span>
                      "H??? th???ng support linh ho???t, h??? tr???, ph???n h???i th???c m???c h???c vi??n nhanh ch??ng."
                    </span>
                    <div className="testimonial__info">
                      <h3>V?? Th??nh ?????t</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="testmonial section" style={contentStyle}>
            <div className="container">
              <div className="testimonial__header">
                <h2 className="section__title">C???m Nh???n C???a H???c Vi??n</h2>
              </div>
              <div className="testimonial__content">
                <div className="testimonial__item">
                  <div className="item__content">
                    <a href="#" className="comment-img">
                      <img src="../../assets/img/none-user-avatar.jpg" alt="..." />
                    </a>
                    <div className="quote">
                      <i className="fas fa-quote-left"></i>
                      <span>OMG! I cannot believe. It's Awesome"</span>
                    </div>
                    <span>
                      "C??c kh??a h???c d??? hi???u, ph?? h???p v???i c??c nhu c???u tuy???n d???ng ng??y nay."
                    </span>
                    <div className="testimonial__info">
                      <h3>Nguy???n T?????ng Giang</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="testmonial section" style={contentStyle}>
            <div className="container">
              <div className="testimonial__header">
                <h2 className="section__title">C???m Nh???n C???a H???c Vi??n</h2>
              </div>
              <div className="testimonial__content">
                <div className="testimonial__item">
                  <div className="item__content">
                    <a href="#" className="comment-img">
                      <img src="../../assets/img/none-user-avatar.jpg" alt="..." />
                    </a>
                    <div className="quote">
                      <i className="fas fa-quote-left"></i>
                      <span>OMG! I cannot believe. It's Awesome"</span>
                    </div>
                    <span>
                      "Nh??? c??c kh??a h???c m?? em b??? sung ???????c nhi???u ki???n th???c ph?? h???p xu h?????ng hi???n nay."
                    </span>
                    <div className="testimonial__info">
                      <h3>Giang ?????c Th???ng</h3>
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
