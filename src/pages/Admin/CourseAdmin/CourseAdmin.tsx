import React from 'react'
import { useDispatch } from 'react-redux'
import ModalCourseAdmin from '../../../Component/Modal/ModalCourseAdmin'
import TableCourseAdmin from '../../../Component/Table/TableCourseAdmin'
import { AppDispatch } from '../../../redux/configStore'

import {  searchCourseAdminApi } from '../../../redux/reducers/productReducerAdmin'


export default function CourseAdmin () {
  const dispatch: AppDispatch = useDispatch()

  return (
    <div className='container'>
      <div className='d-flex flex-column'>
        <ModalCourseAdmin />
        <div className='paper my-4 animate__animated animate__fadeIn animate__delay-1s'>
          <p className='fs-3'>Tìm kiếm khóa học</p>
          <input
            className='mb-4 w-100'
            type='text'
            placeholder='Nhập vào tên khóa học'
            onChange={e => {
              dispatch(searchCourseAdminApi(e.target.value))
            }}
          />
        </div>
        <TableCourseAdmin />
      </div>
    </div>
  )
}
