import { Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/configStore' 
import CourseRegisteredTable from '../../pages/Admin/CourseAdmin/Data/CourseRegisteredTable'
import CourseRegisterTable from '../../pages/Admin/CourseAdmin/Data/CourseRegisterTable'
import { createRegisterCourseApi } from '../../redux/reducers/userReducerAdmin'
import { getArrUserUnReigsterCourseApi, UserRegisterCourse } from '../../redux/reducers/productReducerAdmin'

type Props = {
  maKhoaHoc: string
}

export default function ModalListCourseUserRegister ({ maKhoaHoc }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { arrUserUnRegisterCourse } = useSelector(
    (state: RootState) => state.productReducerAdmin
  )

  const [taiKhoan, setTaiKhoan] = useState("")

  const dispatch: AppDispatch = useDispatch()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }


  return (
    <>
      <Button
        className='green-button p-2 h-100'
        type='primary'
        onClick={() => {
          showModal()
          dispatch(getArrUserUnReigsterCourseApi(maKhoaHoc))
        }}
      >
    <i className="fa-sharp fa-solid fa-plus"></i>
      </Button>
      <Modal
        title='Ghi danh học viên'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <section id='register-user-admin'>
          <div className='form-item w-100'>
            <p className='fs-5 py-4'>Đăng ký khoá học</p>
            <div className='form-action w-100'>
              <select
                name='taiKhoan'
                id='taiKhoan'
                className='w-75'
                defaultValue={arrUserUnRegisterCourse[0]?.taiKhoan}
                onChange={(e) => {
                  setTaiKhoan(e.target.value)
                }}
              >
                {arrUserUnRegisterCourse.map((item:UserRegisterCourse, index:number) => {
                  return (
                    <option value={index === 0 ? "" : item.taiKhoan} key={index}>
                      {index === 0 ? "Chọn học viên" : item.hoTen}
                    </option>
                  )
                })}
              </select>
              <button className='blue-button w-25 p-3' onClick={() => {
                dispatch(createRegisterCourseApi(maKhoaHoc, taiKhoan))
              }}>Đăng ký</button>
            </div>
          </div>
          <div className='form-item'>
            <p className='fs-5 py-4'>Học viên chờ đăng ký</p>
            <CourseRegisterTable maKhoaHoc={maKhoaHoc}/>
          </div>
          <div className='form-item'>
            <p className='fs-5 py-4'>Học viên đã đăng ký</p>
            <CourseRegisteredTable maKhoaHoc={maKhoaHoc}/>
          </div>
        </section>
      </Modal>
    </>
  )
}
