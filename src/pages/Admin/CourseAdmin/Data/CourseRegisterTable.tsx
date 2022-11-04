import React, { useEffect } from 'react'
import { Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { AppDispatch, RootState } from '../../../../redux/configStore'
import { useDispatch, useSelector } from 'react-redux'
import { getArrUserWaitingRegisterCourseApi } from '../../../../redux/reducers/productReducerAdmin'
import { createRegisterCourseApi, deleteRegisterCourseApi } from '../../../../redux/reducers/userReducerAdmin'

type Props = {
  maKhoaHoc: string
}

interface DataType {
  taiKhoan: string
  hoTen: string
  biDanh: string
}
export default function CourseRegisterTable({maKhoaHoc}: Props) {
    const dispatch :AppDispatch = useDispatch() 
    const {arrUserWaitingRegisterCourse} = useSelector((state: RootState) => state.productReducerAdmin)

    const columns: ColumnsType<DataType> = [
        {
          title: 'Tài khoản',
          dataIndex: 'taiKhoan',
          key: 'taiKhoan',
          width: 200,
        },
        {
          title: 'Họ tên',
          dataIndex: 'hoTen',
          key: 'hoTen'
        },
        {
          title: 'Thao tác',
          key: 'action',
          width: 100,
          render: (e) => <>
          <div className='d-flex justify-content-between'>
          <button className='green-button px-3 py-1 mx-2' onClick={() => {
            console.log(e)
            dispatch(createRegisterCourseApi(maKhoaHoc, e.taiKhoan))
          }}>
            <i className='m-0 bi bi-plus-square'></i>
          </button>
          <button className='red-button px-3 py-1 mx-2' onClick={() => {
            dispatch(deleteRegisterCourseApi(maKhoaHoc, e.taiKhoan))
          }}>
            <i className='m-0 bi bi-x-square'></i>
          </button>
        </div></>
        }
      ]
    
      const data: DataType[] = arrUserWaitingRegisterCourse

      useEffect(()=> {
        dispatch(getArrUserWaitingRegisterCourseApi(maKhoaHoc))
      },[maKhoaHoc])
    
      return <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
}