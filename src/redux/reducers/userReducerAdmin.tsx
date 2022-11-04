import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import {
  ACCESS_TOKEN,
  getStoreJson,
  http,
  setCookie,
  setStore,
  setStoreJson,
  USER_LOGIN,
} from "../../util/setting";
import { AppDispatch } from "../configStore";
import { history } from "../../index";
import { string } from "yup";
import { DataType } from "../../Component/Table/TableUserAdmin";



export interface userLogin {
  taiKhoan: string;
  matKhau: string;
}

export interface Profile {
  chiTietKhoaHocGhiDanh: ChiTietKhoaHocGhiDanh[];
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}
export interface ChiTietKhoaHocGhiDanh {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  biDanh: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  ngayTao: Date;
  danhGia: number;
}

export interface UserAdmin {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}
export interface CourseOfUser {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
}

export interface stateRedux {
  userLogin: Profile;
  token: string;
  arrUser: Profile[] | DataType[];
  arrCourseOfUser: CourseOfUser[];
  arrCourseWaitingRegister: CourseOfUser[];
  arrCourseUserReigstered: CourseOfUser[];
  userType: userType[];
  arrUserSearch: Profile[] | DataType[];
}
export interface userType {
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
}

const initialState: stateRedux = {
  userLogin: getStoreJson(USER_LOGIN) || {},
  token: "",
  arrUser: [],
  arrCourseOfUser: [],
  arrCourseWaitingRegister: [],
  arrCourseUserReigstered: [],
  userType: [],
  arrUserSearch: []
};

const userReducerAdmin = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action: PayloadAction<Profile>) => {
      state.userLogin = action.payload;
    },
    checkLoginAction: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    arrUserAction: (state, action: PayloadAction<Profile[]>) => {
      state.arrUser = action.payload;
    },
    logoutAction: (state, action: PayloadAction<Profile>) => {
      state.userLogin = action.payload;
    },
    getArrCourseNotRegisterAction: (
      state,
      action: PayloadAction<CourseOfUser[]>
    ) => {
      state.arrCourseOfUser = action.payload;
    },
    getArrCourseWaitingRegisterAction: (
      state,
      action: PayloadAction<CourseOfUser[]>
    ) => {
      state.arrCourseWaitingRegister = action.payload;
    },
    getArrCourseRegisteredAction: (
      state,
      action: PayloadAction<CourseOfUser[]>
    ) => {
      state.arrCourseUserReigstered = action.payload;
    },
  },
});

export const {
  getProfileAction,
  checkLoginAction,
  arrUserAction,
  logoutAction,
  getArrCourseNotRegisterAction,
  getArrCourseWaitingRegisterAction,
  getArrCourseRegisteredAction,
} = userReducerAdmin.actions;

export default userReducerAdmin.reducer;

//thông tin người dùng
export const getProfileApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/QuanLyNguoiDung/ThongTinNguoiDung");
      console.log(result);
      const action = getProfileAction(result.data);
      dispatch(action);
      setStoreJson(USER_LOGIN, result.data);
    } catch (error) {
      console.log(error);
    }
  };
};

// Login API User

export const LoginApi = (userLogin: userLogin) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/QuanLyNguoiDung/DangNhap", userLogin);
      console.log(result);
      setCookie(ACCESS_TOKEN, result.data.accessToken, 30);
      setStore(ACCESS_TOKEN, result.data.accessToken);
      dispatch(checkLoginAction(result.data.accessToken));
      dispatch(getProfileApi());
    } catch (error) {}
  };
};
//Lấy danh sách người dùng
export const getArrUserApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/QuanLyNguoiDung/LayDanhSachNguoiDung");
      dispatch(arrUserAction(result.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//---------CRUD user
//create
export const createUserApi = (data: UserAdmin) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/QuanLyNguoiDung/ThemNguoiDung", data);
      message.success("Tạo tài khoản thành công!");
    } catch (err: any) {
      message.error(err.response.data);
      console.log(err);
    }
  };
};
//update
export const updateUserApi = (user: UserAdmin) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.put(
        "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        user
      );
      message.success("Đã cập nhật thông tin!");
      dispatch(getArrUserApi());
    } catch (err) {
      console.log(err);
    }
  };
};

//delete
export const deleteUserApi = (user: string) => {
  console.log(user);
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.delete(
        `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`
      );
      message.success(result.data);
      dispatch(getArrUserApi());
    } catch (err: any) {
      console.log(err);
      message.error(err.response.data);
    }
  };
};
//search user
export const searchUserApi = (key: string) => {
  console.log(key);
  return async (dispatch: AppDispatch) => {
    try {
      if (key !== "") {
        const result = await http.get(
          "/QuanLyNguoiDung/TimKiemNguoiDung?tuKhoa=" + key
        );
        dispatch(arrUserAction(result.data));
      } else {
        dispatch(getArrUserApi());
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//---------COURSE
//lấy danh sách khóa học
//danh sách khóa học chưa ghi danh
export const getArrCourseNotRegisterApi = (tenTaiKhoan: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.post(
        "QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=" + tenTaiKhoan
      );
      dispatch(getArrCourseNotRegisterAction(result.data));
    } catch (err) {
      console.log(err);
    }
  };
};
//danh sách khóa học đã xét duyệt
export const getArrCourseRegisteredApi = (taiKhoan: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        taiKhoan: taiKhoan,
      };
      let result = await http.post(
        "QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet",
        data
      );
      console.log(result);
      dispatch(getArrCourseRegisteredAction(result.data));
    } catch (err) {
      console.log(err);
    }
  };
};
//danh sách khóa học chờ đăng ký
export const getArrCourseWaitingRegisterApi = (taiKhoan: string) => {
  console.log(taiKhoan);
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        taiKhoan: taiKhoan,
      };
      let result = await http.post(
        "QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet",
        data
      );
      console.log(result);
      dispatch(getArrCourseWaitingRegisterAction(result.data));
    } catch (err) {
      console.log(err);
    }
  };
};

//CRUD Crouse
//create
export const createRegisterCourseApi = (
  maKhoaHoc: string,
  taiKhoan: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        maKhoaHoc: maKhoaHoc,
        taiKhoan: taiKhoan,
      };
      let result = await http.post("QuanLyKhoaHoc/GhiDanhKhoaHoc", data);
      console.log(result);
      message.success(result.data);
      dispatch(getArrCourseRegisteredApi(taiKhoan));
      dispatch(getArrCourseWaitingRegisterApi(taiKhoan));
    } catch (err) {
      console.log(err);
    }
  };
};
//delete
export const deleteRegisterCourseApi = (
  maKhoaHoc: string,
  taiKhoan: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        maKhoaHoc: maKhoaHoc,
        taiKhoan: taiKhoan,
      };
      let result = await http.post("QuanLyKhoaHoc/HuyGhiDanh", data);
      console.log(result);
      message.success(result.data);
      dispatch(getArrCourseRegisteredApi(taiKhoan));
      dispatch(getArrCourseWaitingRegisterApi(taiKhoan));
    } catch (err) {
      console.log(err);
    }
  };
};
