import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/configStore";
import { getListCourseApi, KhoaHoc } from "../../redux/reducers/productProducer";

type Props = {};

export default function Search({}: Props) {
  const { arrCourses } = useSelector(
    (state: RootState) => state.productProducer
  );
  const dispatch: AppDispatch = useDispatch();

  let [searchParams, setSearchParams] = useSearchParams();
  const keyword: string | null = searchParams.get("keyword");

  let keywordRef = useRef("");
  const navigate = useNavigate()
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


  const removeAccents = (str: string) => {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ",
      "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ",
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  };
  let newSearchArr = [];
  if (keyword) {
    let newKeyword: string = removeAccents(keyword).replace(/\s/g, "");
    for (let item of arrCourses) {
      let newItem: string = removeAccents(item.tenKhoaHoc).replace(/\s/g, "");
      if (newItem.toLowerCase().includes(newKeyword.toLowerCase().trim())) {
        newSearchArr.push(item);
      }
    }
  }

  useEffect(() => {
    const getListCourseApiAction = getListCourseApi();
    dispatch(getListCourseApiAction);
  }, []);
  return (
    <div className="container py-4">
      <div>
        <h1>
          Tìm thấy {newSearchArr.length} khoá học liên quan{" "}
          {keyword?.toUpperCase()}
        </h1>
        <form className="d-flex" onSubmit={handleSubmit}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleChange}
                />
                <button className="btn btn-outline-success" type="submit" >Search</button>
              </form>
      </div>
      <div>
        {newSearchArr?.map((item: KhoaHoc, index: number) => {
          return (
            <div key={index} className="row mt-4 bg-light p-2 border-top">
              <div className="col-12 col-sm-4 d-flex align-items-center">
                <img
                  src={item.hinhAnh}
                  alt=""
                  className="w-100"
                  style={{ height: 150 }}
                />
              </div>
              <div className="col-12 col-sm-8">
                <h4>{item.tenKhoaHoc}</h4>
                <div>
                  <span className="me-2">
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star text-warning"></i>
                    <i className="fas fa-star-half text-warning"></i>
                    4.5
                  </span>
                  ({item.luotXem})
                </div>
                <p>
                  {item.moTa.length > 200
                    ? item.moTa.substring(0, 200) + "..."
                    : item.moTa}
                </p>
                <NavLink
                  to={`/detail/${item.maKhoaHoc}`}
                  className="mt-2 btn btn-warning text-uppercase btn-hover"
                >
                  Đăng ký
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
