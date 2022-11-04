import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { http } from "../../util/setting";
import { AppDispatch } from "../configStore";

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

export interface DanhMucKhoaHoc {
  maDanhMucKhoahoc: string;
  tenDanhMucKhoaHoc: string;
}

export interface DanhMuc {
  maDanhMuc: string;
  tenDanhMuc: string;

}

export interface NguoiTao {
  taiKhoan: string;
  hoTen: string;
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
}

export interface WelcomeAdmin {
  maKhoaHoc:        string;
  biDanh:           string;
  tenKhoaHoc:       string;
  moTa:             string;
  luotXem:          number;
  danhGia:          number;
  hinhAnh:          string;
  maNhom:           string;
  ngayTao:          string;
  maDanhMucKhoaHoc: string;
  taiKhoanNguoiTao: string;
}

export interface userAdmin {
  taiKhoan: string
  matKhau: string
  hoTen: string
  soDT: string
  maLoaiNguoiDung: string
  maNhom: string
  email: string
}
export interface RegisterCourse {
  taiKhoan: string
  hoTen: string
  biDanh: string
}



const initialState: any = {
  arrProduct: [],
  arrProductList: [],
  coursesList: [],
  searchProduct :[],
 
  cart: [],

};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getAllProductAction: (state, action: PayloadAction<ProductModel[]>) => {
      state.arrProduct = action.payload;
    },
    getAllProductListAction: (state, action: PayloadAction<ProductModel[]>) => {
      state.arrProductList = action.payload;
    },
    getAllCourseListAction: (state, action: PayloadAction<ProductModel[]>) => {
      state.coursesList = action.payload;
    },
    getSearchProductAction: (state, action: PayloadAction<ProductModel[]>) => {
      state.searchProduct = action.payload;
    },

    getDetailItemAction: (state, action: PayloadAction<ProductModel[]>) => {
      state.coursesList = [action.payload]
      console.log('action.payload,', action.payload);
      
    },
    addCart: (state, action: PayloadAction<ProductModel[]>) => {
      const cartItem = [...action.payload]
      state.cart.push(cartItem)
    },
    clearCart: (state, action: PayloadAction<ProductModel[]>) => {
      state.cart = []
    },
   

  },
});

export const {
  getAllProductAction,
  getAllProductListAction,
  getAllCourseListAction,
  getSearchProductAction,
  getDetailItemAction,
  addCart,
  clearCart,
  
} = productReducer.actions;

export default productReducer.reducer;

//API

export const getProductApi = () => { //getListCoursesApi
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(
        "/QuanLyKhoaHoc/LayDanhSachKhoaHoc"
      );
      console.log(result.data);
      let arrCourses: ProductModel[] = result.data;
      const action = getAllProductAction(arrCourses);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProductListApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
      console.log(result.data);
      let arrDirectory: ProductModel[] = result.data;
      const action = getAllProductListAction(arrDirectory);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getCourseListApi = (maDanhMuc: any ) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(
        `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}`
      );
      console.log(result.data);
      let listCourse: ProductModel[] = result.data;
      const action = getAllCourseListAction(listCourse);
      dispatch(action);
    } catch (err) {
      console.log({ err });
    }
  };
};
//search product
export const getSearchProductApi = (tenKhoaHoc:string | undefined) => {
  return async (dispatch : AppDispatch) => {
    try{
      const result = await http.get(`/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}`);
      console.log(result.data);
      let searchCourse : ProductModel[] = result.data;
      const action = getSearchProductAction(searchCourse);
      dispatch(action)
    }
    catch (err) {
      console.log({err});
      
    }
  }
}
//search admin course
export const searchCourseAdminApi = (key: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      if (key) {
        let result = await http.get(
          'QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=' + key
        )
        console.log(result)
        dispatch(getSearchProductAction(result.data))
      }
    } catch (err) {
      console.log(err)
    }
  }
}



export const getDetailApi = (maKhoaHoc: any ) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(
        `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`
      );
      console.log(result.data);
      let listCourse: ProductModel[] = result.data;
      const action = getDetailItemAction(listCourse);
      dispatch(action);
    } catch (err) {
      console.log({ err });
    }
  };
};

