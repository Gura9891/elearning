import { Button, Modal } from "antd";
import React, { ChangeEvent, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import { UserAdmin } from "../../redux/reducers/userReducerAdmin";

import {
  Courses,
  DanhMuc,
  createCourseAdminApi,
  CourseAdmin,
  updateCourseAdminApi,
} from "../../redux/reducers/productReducerAdmin";

type Props = {
  course?: Courses;
};

export default function ModalCourseAdmin({ course }: Props) {
  const [image, setImage] = React.useState<FileList | null>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { arrDirectoryCourses } = useSelector(
    (state: RootState) => state.productReducerAdmin
  );

  const { arrUser, userLogin } = useSelector(
    (state: RootState) => state.userReducerAdmin
  );

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      maKhoaHoc: course?.maKhoaHoc || "",
      biDanh: course?.biDanh || "",
      tenKhoaHoc: course?.tenKhoaHoc || "",
      moTa: course?.moTa || "",
      luotXem: course?.luotXem || 0,
      danhGia: 0,
      hinhAnh: course?.hinhAnh || "",
      maNhom: "GP01",
      ngayTao: course?.ngayTao || "",
      maDanhMucKhoaHoc: course?.danhMucKhoaHoc.maDanhMucKhoahoc || "DiDong",
      taiKhoanNguoiTao: course?.nguoiTao.taiKhoan || userLogin.taiKhoan || "",
      image: "",
    },
    validationSchema: Yup.object().shape({
      maKhoaHoc: Yup.string().required("Mã khóa học không được bỏ trống"),
      tenKhoaHoc: Yup.string().required("Tên khóa học không được bỏ trống"),
      moTa: Yup.string().required("Mô tả không được để trống"),
      ngayTao: Yup.string().required("Ngày tạo không được để trống"),
      image: Yup.string().required("Hình ảnh không được bỏ trống"),
    }),

    onSubmit: (values) => {
      console.log(values);
      const data = new FormData();
      data.append("file", values.image);
      data.append("tenKhoaHoc", values.tenKhoaHoc);
      let formData = {
        maKhoaHoc: values.maKhoaHoc,
        biDanh: values.biDanh,
        tenKhoaHoc: values.tenKhoaHoc,
        moTa: values.moTa,
        luotXem: values.luotXem,
        danhGia: values.danhGia,
        hinhAnh: values.hinhAnh,
        maNhom: values.maNhom,
        ngayTao: values.ngayTao,
        maDanhMucKhoaHoc: values.maDanhMucKhoaHoc,
        taiKhoanNguoiTao: values.taiKhoanNguoiTao,
      };
      if (course) {
        dispatch(updateCourseAdminApi(formData, data));
      } else {
        dispatch(createCourseAdminApi(formData, data));
      }
      setLoading(true);
      setTimeout(() => {
        form.resetForm();
        setLoading(false);
        setOpen(false);
      }, 2000);
    },
  });

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    form.handleSubmit();
  };

  const handleCancel = () => {
    form.resetForm();
    setOpen(false);
  };

  return (
    <>
      {course ? (
        <Button
          className="blue-button p-2 mx-2 h-100"
          type="primary"
          onClick={showModal}
        >
          <i className="fa-solid fa-file-pen"></i>
        </Button>
      ) : (
        <Button
          className="green-button fs-4 py-4 h-100 w-25"
          type="primary"
          onClick={showModal}
        >
          {" "}
          Thêm khóa học
        </Button>
      )}
      <Modal
        open={open}
        title={course ? "Sửa khóa học" : "Thêm khóa học"}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          course
            ? [
                <Button danger key="back" onClick={handleCancel}>
                  Trở lại
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={handleOk}
                >
                  Cập nhật
                </Button>,
              ]
            : [
                <Button danger key="back" onClick={handleCancel}>
                  Trở lại
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={handleOk}
                >
                  Thêm
                </Button>,
              ]
        }
      >
        <div className="paper">
          <form className="row" onSubmit={form.handleSubmit}>
            <div className="form-item col-6 mb-4">
              <p>Mã khóa học</p>
              <input
                type="text"
                id="maKhoaHoc"
                name="maKhoaHoc"
                value={form.values.maKhoaHoc}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                disabled={course ? true : false}
              />
              {form.errors.maKhoaHoc && form.touched.maKhoaHoc ? (
                <div className="text-danger position-absolute">
                  {form.errors.maKhoaHoc}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-item col-6 mb-4">
              <p>Đánh giá</p>
              <input
                type="text"
                id="danhGia"
                name="danhGia"
                value={form.values.danhGia}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </div>
            <div className="form-item col-6 mb-4">
              <p>Tên khóa học</p>
              <input
                type="text"
                id="tenKhoaHoc"
                name="tenKhoaHoc"
                value={form.values.tenKhoaHoc}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.tenKhoaHoc && form.touched.tenKhoaHoc ? (
                <div className="text-danger position-absolute">
                  {form.errors.tenKhoaHoc}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-item col-6 mb-4">
              <p>Lượt xem</p>
              <input
                type="text"
                id="luotXem"
                name="luotXem"
                value={form.values.luotXem}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </div>
            <div className="form-item col-6 mb-4">
              <p>Người tạo</p>
              <select
                name="taiKhoanNguoiTao"
                id="taiKhoanNguoiTao"
                defaultValue={form.values.taiKhoanNguoiTao}
                onChange={form.handleChange}
              >
                {arrUser
                  .filter((e) => e.maLoaiNguoiDung === "GV")
                  .map((item, index) => {
                    return (
                      <option key={index} value={item.taiKhoan}>
                        {item.taiKhoan}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-item col-6 mb-4">
              <p>Hình ảnh</p>
              <img src={form.values.hinhAnh} alt="" style={{ width: 100 }} />
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => {
                  form.setFieldValue("image", e.target.files?.[0]);
                  form.setFieldValue(
                    "hinhAnh",
                    e.currentTarget.files?.[0].name
                  );
                }}
                onBlur={form.handleBlur}
              />
              {form.errors.image && form.touched.image ? (
                <div className="text-danger position-absolute">
                  {form.errors.image}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-item col-6 mb-4">
              <p>Ngày tạo</p>
              <input
                type={course ? "text" : "date"}
                id="ngayTao"
                name="ngayTao"
                value={form.values.ngayTao}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.ngayTao && form.touched.ngayTao ? (
                <div className="text-danger position-absolute">
                  {form.errors.ngayTao}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-item col-6 mb-4">
              <p>Danh mục khóa học</p>
              <select
                name="madanhMucKhoaHoc"
                id="madanhMucKhoaHoc"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                defaultValue={form.values.maDanhMucKhoaHoc}
              >
                {arrDirectoryCourses.map((item: DanhMuc, index: number) => {
                  return (
                    <option value={item.maDanhMuc} key={index}>
                      {item.tenDanhMuc}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-item col-12 mb-4">
              <p>Mô tả</p>
              <textarea
                name="moTa"
                id="moTa"
                rows={20}
                className="w-100"
              ></textarea>
              {form.errors.moTa && form.touched.moTa ? (
                <div className="text-danger position-absolute">
                  {form.errors.moTa}
                </div>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
