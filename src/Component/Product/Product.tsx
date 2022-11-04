


import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

import React from "react";
import { NavLink } from "react-router-dom";
import { ProductModel } from "../../redux/reducers/productProducer";


type Props = {
  product: ProductModel;
};



export default function Product({ product }: Props) {
  const { Meta } = Card;
  return (
    <div >
      {/* <img src={product.hinhAnh} alt={product.tenKhoaHoc} />
      <div className="card-body">
        <h3 className="card-title">{product.tenKhoaHoc}</h3>

        <NavLink to={`/courses/detail/${product.maKhoaHoc}`} className="btn">
          Đăng Ký
        </NavLink>
      </div> */}

<Card className='mb-2'
    style={{ width: 390 } }
    cover={
      <img
      style={{ height: 250 } }
      alt={product.tenKhoaHoc}
        src={product.hinhAnh}
      />
    }
    actions={[

      
      <NavLink to={`/detail/${product.maKhoaHoc}`} className="btn">
      Đăng Ký
    </NavLink>
    ]}
  >
    <Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      title={product.tenKhoaHoc}
      description="This is the description"
    />
  </Card>


    </div>
  );
}
