import React from 'react'
import MyDataGrid from '../../components/MyDataGrid'
import SearchBar from '../../components/SearchBar';
import variable from '../../utils/variable'
import LineAction from '../../components/LineAction';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import MyButton from '../../components/MyButton';
import Input from '@mui/material/Input';
import Template, {
  TemplateTitle, TemplateLineAction, TemplateData,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import MiniPopup from '../../components/MiniPopup';
import courseApi from '../../api/courseAPI';
import { useDispatch } from 'react-redux';
import notifyMessage from '../../utils/NotifyMessage';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
const Courses = props => {
  const initialCourseForm = {
    coursename: "",
    lecturerUserName: "",
    coursecode: ""
  }
  let dispatch = useDispatch()
  const [OpenCreateCourseModal, setOpenCreateCourseModal] = useState(false)
  const [OpenAddLecturerModal, setOpenAddLecturerModal] = useState(false)
  const [OpenMiniPopupCourses, setOpenMiniPopupCourses] = useState(false)
  const [courseForm, setCourseForm] = useState(initialCourseForm)
  const { coursename, coursecode, lecturerUserName } = courseForm
  const headers = variable([
    "Id",
    "Code",
    "Class Name",
    "Lecturer",
    "Option"
  ])
  const rows = [{
    code: "SE110",
    className: "Object Oriented Analysis and Design",
    lecturer: () => setOpenAddLecturerModal(true),
    option: () => setOpenMiniPopupCourses(true)
  },
  {
    code: "SE111",
    className: "Object Oriented Analysis and Design",
    lecturer: "Nguyễn Hoàng Thái Dương",
    option: () => setOpenMiniPopupCourses(true)
  },
  {
    code: "SE132",
    className: "Object Oriented Analysis and Design",
    lecturer: () => setOpenAddLecturerModal(true),
    option: () => setOpenMiniPopupCourses(true)
  },
  {
    code: "SE105",
    className: "Object Oriented Analysis and Design",
    lecturer: "Nguyễn Hoàng Thái Dương",
    option: () => setOpenMiniPopupCourses(true)
  }]
  const openCreateCourseModal = () => setOpenCreateCourseModal(true)
  const closeCreateCourseModal = () => setOpenCreateCourseModal(false)
  const openAddLecturerModal = () => setOpenAddLecturerModal(true)
  const closeAddLecturerModal = () => setOpenAddLecturerModal(false)
  const onCourseFormChange = (e) => {
    setCourseForm({
      ...courseForm,
      [e.target.name]: e.target.value
    })
  }
  const handleCreateCourse = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (window.confirm("Create course?")) {
      let rs = await courseApi.createCourse(courseForm).catch(data => { return data.response })
      if (await rs.status === 200) {
        dispatch(setSnackbar(notifyMessage.CREATE_SUCCESS("course")))
        setCourseForm(initialCourseForm)
        setOpenCreateCourseModal(false)
      }
      else {
        dispatch(setSnackbar(notifyMessage.CREATE_FAIL("course")))
      }
    }
  }
  return (
    <Template>
      <TemplateSearch>
        <SearchBar />
      </TemplateSearch>
      <TemplateLineAction>
        <LineAction
          name={"Create a course"}
          click={openCreateCourseModal}
        />
      </TemplateLineAction>
      <TemplateData>
        <MyDataGrid ColumnHeader={headers} Data={rows} />
        <MiniPopup
          open={OpenMiniPopupCourses}
          close={() => setOpenMiniPopupCourses(false)}
          actions={[
            {
              name: "Add a student",
              click: null
            },
            {
              name: "Manage student",
              click: null
            },
            {
              name: "Remove lecturer",
              click: null
            }
          ]}
        />
      </TemplateData>
      <TemplateModal
        open={OpenCreateCourseModal}
        size="sm"
        form={true}
        onsubmit={handleCreateCourse}
      >
        <TemplateModalTitle>
          <p> Create new course:</p>
          <Divider variant="middle" />
        </TemplateModalTitle>
        <TemplateModalBody >
          <div className="template-modal-content-field">
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Enter course code:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input required name='coursecode' value={coursecode} onChange={onCourseFormChange} />
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Enter course name:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input required name='coursename' value={coursename} onChange={onCourseFormChange} />
              </div>
            </div>
            <Divider variant="middle" />
          </div>
        </TemplateModalBody>
        <TemplateModalAction funcError={closeCreateCourseModal} size="sm" />
      </TemplateModal>
      <TemplateModal
        open={OpenAddLecturerModal}
        size="lg"
        form={false}
      >
        <TemplateModalTitle>

        </TemplateModalTitle>
        <TemplateModalBody >
          <MyDataGrid ColumnHeader={headers} />
        </TemplateModalBody>
        <TemplateModalAction funcError={closeAddLecturerModal} size="lg" />
      </TemplateModal>
    </Template>
  )
}

Courses.propTypes = {

}

export default Courses
