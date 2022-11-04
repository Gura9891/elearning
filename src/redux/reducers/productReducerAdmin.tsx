import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { http } from "../../util/setting";
import { AppDispatch } from "../configStore";

export interface Courses {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: number;
  nguoiTao: NguoiTao;
  danhMucKhoaHoc: DanhMucKhoaHoc;
}
export interface NguoiTao {
  taiKhoan: string;
  hoTen: string;
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
}

export interface DanhMucKhoaHoc {
  maDanhMucKhoahoc: string;
  tenDanhMucKhoaHoc: string;
}

export interface DanhMuc {
  maDanhMuc: string;
  tenDanhMuc: string;
}

export interface CourseAdmin {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  danhGia: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  maDanhMucKhoaHoc: string;
  taiKhoanNguoiTao: string;
}

export interface UserRegisterCourse {
  taiKhoan: string;
  hoTen: string;
  biDanh: string;
}
//Userpage
export interface ProductModel {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: number;
  nguoiTao: NguoiTao;
  danhMucKhoaHoc: DanhMucKhoaHoc;
}

const initialState: any = {
  arrCourses: [],
  arrDirectoryCourses: [],
  arrUserWaitingRegisterCourse: [],
  arrUserRegisteredCourse: [],
  arrUserUnRegisterCourse: [],

};

const productReducerAdmin = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getArrCoursesAction: (state, action: PayloadAction<Courses[]>) => {
      state.arrCourses = action.payload;
    },
    getAllCoursesDirectoryAction: (
      state,
      action: PayloadAction<DanhMucKhoaHoc[]>
    ) => {
      state.arrDirectoryCourses = action.payload;
    },
    getArrUserWaitingRegisterCourseAction: (
      state,
      action: PayloadAction<UserRegisterCourse[]>
    ) => {
      state.arrUserWaitingRegisterCourse = action.payload;
    },
    getArrUserRegisteredCourseAction: (
      state,
      action: PayloadAction<UserRegisterCourse[]>
    ) => {
      state.arrUserRegisteredCourse = action.payload;
    },
    getArrUserUnRegisterCourseAction: (
      state,
      action: PayloadAction<UserRegisterCourse[]>
    ) => {
      state.arrUserUnRegisterCourse = action.payload;
    },
  },
});
export const {
  getArrCoursesAction,
  getAllCoursesDirectoryAction,
  getArrUserWaitingRegisterCourseAction,
  getArrUserRegisteredCourseAction,
  getArrUserUnRegisterCourseAction,
 
} = productReducerAdmin.actions;

export default productReducerAdmin.reducer;

//-----------course
//lấy danh sách khóa học
export const getArrCourseApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
      let arrCourses: Courses[] = result.data;
      const action = getArrCoursesAction(arrCourses);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
//lấy danh mục khóa học
export const getDirectoryCourseApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
      console.log(result);
      let arrDirectoryCourses: DanhMucKhoaHoc[] = result.data;
      const action = getAllCoursesDirectoryAction(arrDirectoryCourses);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
//CRUD Course admin
//create
export const createCourseAdminApi = (course: CourseAdmin, file: FormData) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http
        .post("/QuanLyKhoaHoc/ThemKhoaHoc", course)
        .then(() => {
          http.post("QuanLyKhoaHoc/UploadHinhAnhKhoaHoc", file);
        });
      dispatch(getArrCourseApi());
      message.success("Đã thêm khóa học!");
    } catch (err: any) {
      console.log(err);
      message.error(err.response.data);
    }
  };
};
//delete
export const deleteCouseAdminApi = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.delete(
        "QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=" + id
      );
      message.success(result.data);
      dispatch(getArrCourseApi());
    } catch (err: any) {
      message.error(err.response.data);
    }
  };
};
//update
export const updateCourseAdminApi = (course: CourseAdmin, file: FormData) => {
  return async (dispatch: AppDispatch) => {
    await http.put("QuanLyKhoaHoc/CapNhatKhoaHoc", course);
    try {
      await http.post("QuanLyKhoaHoc/UploadHinhAnhKhoaHoc", file);
      dispatch(getArrCourseApi());
    } catch (err) {
      console.log(err);
    }
  };
};
//lấy danh sách học viên chờ xét duyệt
export const getArrUserWaitingRegisterCourseApi = (maKhoaHoc: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        maKhoaHoc: maKhoaHoc,
      };
      let result = await http.post(
        "QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet",
        data
      );
      dispatch(getArrUserWaitingRegisterCourseAction(result.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//lấy danh sách học viên đã đăng ký khóa học

export const getArrUserRegisteredCourseApi = (maKhoaHoc: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        maKhoaHoc: maKhoaHoc,
      };
      let result = await http.post(
        "QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc",
        data
      );
      dispatch(getArrUserRegisteredCourseAction(result.data));
    } catch (err) {
      console.log(err);
    }
  };
};
//lấy danh sách học viên chưa đăng ký
export const getArrUserUnReigsterCourseApi = (maKhoaHoc: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        maKhoaHoc: maKhoaHoc,
      };
      let result = await http.post(
        "QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh",
        data
      );
      dispatch(getArrUserUnRegisterCourseAction(result.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//search
export const searchCourseAdminApi = (key: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      if (key) {
        let result = await http.get(
          "QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=" + key
        );
        console.log(result);
        dispatch(getArrCoursesAction(result.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};