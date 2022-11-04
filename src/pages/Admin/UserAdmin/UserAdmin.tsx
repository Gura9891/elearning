import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalUserAdmin from '../../../Component/Modal/ModalUserAdmin'
import TableUserAdmin from '../../../Component/Table/TableUserAdmin'
import { AppDispatch, RootState } from '../../../redux/configStore'
import { searchUserApi } from '../../../redux/reducers/userReducerAdmin'


type Props = {}

export default function UserAdmin ({}: Props) {
  const dispatch: AppDispatch = useDispatch()
  const { arrUserSearch } = useSelector((state: RootState) => state.userReducerAdmin)
  return (
    <div className='container'>
      <div className='d-flex flex-column'>
        <ModalUserAdmin />
        <div className='paper my-4 animate__animated animate__fadeIn animate__delay-1s'>
          <p className='fs-3'>Tìm kiếm tài khoản</p>
          <input
            className='mb-4 w-100'
            type='text'
            placeholder='Nhập vào tên tài khoản'
            onChange={e => {
              let key = e.target.value
              dispatch(searchUserApi(key))
            }}
          />
        </div>
        <TableUserAdmin />
      </div>
    </div>
  )
}
