import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalUserAdmin from "../../../Component/Modal/ModalUserAdmin";

import { AppDispatch, RootState } from "../../../redux/configStore";
import { getArrCourseApi, getDirectoryCourseApi } from "../../../redux/reducers/productReducerAdmin";

import {
  getArrUserApi,
  logoutAction,
} from "../../../redux/reducers/userReducerAdmin";
import {
  ACCESS_TOKEN,
  deleteCookie,
  deleteStore,
  getStoreJson,
  USER_LOGIN,
} from "../../../util/setting";


export default function HomeAdmin() {
  const { userLogin, arrUser } = useSelector(
    (state: RootState) => state.userReducerAdmin
  );

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getArrUserApi());
    dispatch(getArrCourseApi());
    dispatch(getDirectoryCourseApi());
  }, []);
  return (
    <section className="h-100 gradient-custom-2">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9 col-xl-7">
            <div className="card">
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: "#000", height: 200 }}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: 150 }}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image"
                    className="img-fluid img-thumbnail mt-4 mb-2"
                    style={{ width: 150, zIndex: 1 }}
                  />
                  <button
                    
                  >
                    <ModalUserAdmin user={userLogin} />
                  </button>
                </div>
                <div className="ms-3" style={{ marginTop: 130 }}>
                  <h5 className="text-white">Xin chào {userLogin.hoTen}</h5>
                  <button //dang xuat
                    className="w-100 bg-dark
    "
                    onClick={() => {
                      deleteCookie(ACCESS_TOKEN);
                      deleteStore(ACCESS_TOKEN);
                      deleteStore(USER_LOGIN);
                      dispatch(logoutAction(getStoreJson(USER_LOGIN)));
                      navigate("/admin");
                      message.success("Đăng xuất thành công");
                    }}
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <p className="mb-1 h5">253</p>
                    <p className="small text-muted mb-0">Photos</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-1 h5">1026</p>
                    <p className="small text-muted mb-0">Followers</p>
                  </div>
                  <div>
                    <p className="mb-1 h5">478</p>
                    <p className="small text-muted mb-0">Following</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-4 text-black">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
   
                </div>
                <div className="col">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                    alt="image 1"
                    className="w-100 rounded-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
