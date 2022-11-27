import React from 'react'
import PropTypes from 'prop-types'
import MyDataGrid from '../../components/MyDataGrid'
import SearchBar from '../../components/SearchBar';
import Rows from '../../asset/temp/Courses'
import variable from '../../utils/variable'
import LineAction from '../../components/LineAction';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import MyButton from '../../components/MyButton';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
const Courses = props => {
  const [open, setOpen] = useState(false)
  const Header = variable([
    "Id",
    "Code",
    "Class Name",
    "Lecturer",
    "Option"
  ])
  const rows = Rows
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)


  const handleCreate = (event) => {
    event.preventDefault()
    event.stopPropagation()

  }
  return (
    <div className="courses">
      <div className='courses-search'>
        <SearchBar />
      </div>
      <div className='courses-lineaction' onClick={openModal}>
        <LineAction name={"Create a course"} />
      </div>
      <div className='courses-datagrid'>
        <MyDataGrid ColumnHeader={Header} Data={rows} />
      </div>

      <Modal open={open}
        // onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='courses-modal'>
          <div className='courses-modal-content'>
            <Box component="form" onSubmit={handleCreate} >
              <div className="courses-modal-content-title">
                <p> Create new course:</p>
                <Divider variant="middle" />
              </div>
              <div className="courses-modal-content-field">
                <div className="courses-modal-content-field-content">
                  <div className="courses-modal-content-field-content-label" >
                    Enter course code:
                  </div>
                  <div className="courses-modal-content-field-content-input" >
                    <Input required />
                  </div>
                </div>
                <div className="courses-modal-content-field-content">
                  <div className="courses-modal-content-field-content-label" >
                    Enter course name:
                  </div>
                  <div className="courses-modal-content-field-content-input" >
                    <Input required />
                  </div>
                </div>
                <Divider variant="middle" />
              </div>
              <div className="courses-modal-content-action">
                <div className="courses-modal-content-action-btn pulse">
                  <MyButton type="submit">Create</MyButton>
                </div>
                <div className="courses-modal-content-action-btn btnError  ">
                  <MyButton type="button" onclick={closeModal}>Cancel</MyButton>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </Modal >
    </div >
  )
}

Courses.propTypes = {

}

export default Courses
