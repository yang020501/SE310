import React from 'react'
import PropTypes from 'prop-types'
import MyDataGrid from '../../components/MyDataGrid'
import SearchBar from '../../components/SearchBar';
import variable from '../../utils/variable'
import LineAction from '../../components/LineAction';
import { useState } from 'react';
import RowCourse from "../../asset/temp/Course"
import Template, {
  TemplateTitle, TemplateLineAction, TemplateDataGrid,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
const Course = props => {
  const [open, setOpen] = useState(false)
  const Header = variable([
    // "Id",
    "User Name",
    "Name",
    "Email",
    "Option"
  ])
  const rows = RowCourse
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)
  console.log(open);

  const handleCreate = () => {
    // event.preventDefault()
    // event.stopPropagation()
    console.log('create');

  }
  return (
    <Template>
      <TemplateSearch>
        <SearchBar />
      </TemplateSearch>
      <TemplateTitle>SE100</TemplateTitle>
      <TemplateLineAction>
        <LineAction
          name={"Change Lecturer"}
          click={openModal}
        />
      </TemplateLineAction>
      <TemplateLineAction>
        <LineAction
          name={"Add a new Student"}
          click={openModal}
        />
      </TemplateLineAction>
      <TemplateDataGrid>
        <MyDataGrid ColumnHeader={Header} Data={rows} />
      </TemplateDataGrid>
      <TemplateModal
        open={open}
        size="lg"
        form={false}
      >
        <TemplateModalTitle>
          <SearchBar data={[]} />
        </TemplateModalTitle>
        <TemplateModalBody>
          <MyDataGrid ColumnHeader={Header} Data={rows} />
        </TemplateModalBody>
        <TemplateModalAction
          funcError={closeModal}
          size="lg"
        />
      </TemplateModal>
    </Template>
  )
}

Course.propTypes = {

}

export default Course
