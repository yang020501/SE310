import React from 'react'
import PropTypes from 'prop-types'
import MyDataGrid from '../../components/MyDataGrid'
import SearchBar from '../../components/SearchBar';
import Rows from '../../asset/temp/Courses'
import variable from '../../utils/variable'
import LineAction from '../../components/LineAction';
const Courses = props => {

  const Header = variable([
    "Id",
    "Code",
    "Class Name",
    "Lecturer",
    "Option"
  ])
  const rows = Rows
  return (
    <div className="courses">
      <div className='courses-search'>
        <SearchBar />
      </div>
      <div className='courses-lineaction'>
        <LineAction name={"Create a course"} />
      </div>
      <div className='courses-datagrid'>
        <MyDataGrid ColumnHeader={Header} Data={rows} />
      </div>
    </div>
  )
}

Courses.propTypes = {

}

export default Courses
