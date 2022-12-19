import React, { useEffect } from 'react'
import MyDataGrid from '../../components/MyDataGrid'
import SearchBar from '../../components/SearchBar';
import variable from '../../utils/variable'
import LineAction from '../../components/LineAction';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import Input from '@mui/material/Input';
import Template, {
  TemplateLineAction, TemplateData,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import MiniPopup from '../../components/MiniPopup';
import courseApi from '../../api/courseAPI';
import { useDispatch } from 'react-redux';
import notifyMessage from '../../utils/NotifyMessage';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import { useCourses, useFetchAllCourses } from '../../redux/course/hook';
import { addCourses } from '../../redux/course/coursesSlice';
import { useAllLecturers, useFetchAllLecturers } from '../../redux/user/hook';
const Courses = props => {
  useFetchAllCourses()
  useFetchAllLecturers()
  const Courses = useCourses()
  const Lecturers = useAllLecturers()
  const initialCourseForm = {
    coursename: "",
    lecturerUserName: null,
    coursecode: "",
  }
  console.log(Lecturers);
  let dispatch = useDispatch()
  const [OpenCreateCourseModal, setOpenCreateCourseModal] = useState(false)
  const [OpenAddLecturerModal, setOpenAddLecturerModal] = useState(false)
  const [OpenMiniPopupCourses, setOpenMiniPopupCourses] = useState(false)
  const [selectCourseID, setSelectCourseID] = useState("")
  const [selectLecturerID, setSelectLecturerID] = useState("")
  const [searchData, setSearchData] = useState([])
  const [rows, setRows] = useState([])
  const [leturersRow, setLecturersRows] = useState([])
  const [courseForm, setCourseForm] = useState(initialCourseForm)
  const { coursename, coursecode, lecturerUserName } = courseForm
  const headers = variable([
    "Id",
    "Course Code",
    "Course Name",
    "Lecturer Id",
    "Option"
  ])
  const lecturersHeaders = variable([
    "Username",
    "Full Name",
    "Email",
    "Role",
    "Option"
  ])
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
        dispatch(addCourses(rs.data))
        if (searchData.length > 0)
          setSearchData([])
      }
      else {
        if (rs.status === 400)
          dispatch(setSnackbar(notifyMessage.CREATE_FAIL("course", "course code or name has existed!")))
        else
          dispatch(setSnackbar(notifyMessage.CREATE_FAIL("course")))
      }
    }
  }
  const handleRemoveLecturer = async (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  useEffect(() => {

    if (Courses.length > 0) {
      let tmp = Courses.map((item, index) => {
        return {
          ...item,
          'no.': index + 1,
          lecturerId: item.lecturerId ? item.lecturerId : () => { setOpenAddLecturerModal(true) },
          option: (id, lecturerId) => {
            setOpenMiniPopupCourses(id)
            setSelectCourseID(id)
            setSelectLecturerID(lecturerId)
          }
        }
      })
      setRows([...tmp])
    }
    if (Lecturers.length > 0) {
      let tmp = Lecturers.map((item, index) => {
        return {
          ...item,
          'no.': index + 1,
          option: (id) => {
            setSelectLecturerID("id")
          }
        }
      })
      setLecturersRows([...tmp])
    }
  }, [Courses, Lecturers])
  return (
    <Template>
      <TemplateSearch>
        <SearchBar data={rows} keyword={["coursename", "coursecode"]} onsearch={(data) => { setSearchData(data) }} />
      </TemplateSearch>
      <TemplateLineAction>
        <LineAction
          name={"Create a course"}
          click={openCreateCourseModal}
        />
      </TemplateLineAction>
      <TemplateData>
        <MyDataGrid ColumnHeader={headers} Data={searchData.length > 0 ? searchData : rows} />
        <MiniPopup
          open={OpenMiniPopupCourses}
          close={() => setOpenMiniPopupCourses(false)}
          actions={[
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
          <MyDataGrid ColumnHeader={lecturersHeaders} Data={leturersRow} />
        </TemplateModalBody>
        <TemplateModalAction funcError={closeAddLecturerModal} size="lg" />
      </TemplateModal>
    </Template>
  )
}

Courses.propTypes = {

}

export default Courses
