import Table, { ColumnsType } from 'antd/lib/table'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/configStore'
import {
  createUserApi,
  ChiTietKhoaHocGhiDanh,
  deleteUserApi,
  getArrUserApi,
  Profile,
  updateUserApi,
  userType
} from '../../redux/reducers/userReducerAdmin'
import ModalListUserRegisterCourse from '../Modal/ModalListUserRegisterCourse'
import ModalUserAdmin from '../Modal/ModalUserAdmin'




type Props = {
}

export interface DataType {
  taiKhoan: string
  hoTen: string
  soDT: string
  maLoaiNguoiDung: string
  maNhom: string
}

export default function TableUserAdmin ({}: Props) {
  const dispatch: AppDispatch = useDispatch()
  const { arrUser } = useSelector((state: RootState) => state.userReducerAdmin)

  const columns: ColumnsType<DataType> = [
    { title: 'Tên tài khoản', dataIndex: 'taiKhoan', key: 'taiKhoan' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Loại người dùng',
      dataIndex: 'maLoaiNguoiDung',
      key: 'maLoaiNguoiDung'
    },
    {
      title: 'Họ và tên',
      dataIndex: 'hoTen',
      key: 'hoTen'
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      width:100,
      render: e => (
        <div className='d-flex justify-content-between'>
          <ModalListUserRegisterCourse taiKhoan={e.taiKhoan}/>
          <ModalUserAdmin user={e}/>
          <button className='red-button p-2' onClick={() => {
            dispatch(deleteUserApi(e.taiKhoan))
          }}><i className="fa-solid fa-trash"></i></button>
        </div>
      )
    }
  ]

  const data: DataType[] = arrUser;


  useEffect(() => {
    dispatch(getArrUserApi())
  },[])

  return <Table columns={columns} dataSource={data} />
}
