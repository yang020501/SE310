import React, { useEffect } from 'react'
import MyDataGrid from '../../components/MyDataGrid'
import SearchBar from '../../components/SearchBar';
import variable from '../../utils/variable'
import LineAction from '../../components/LineAction';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Input from '@mui/material/Input';
import Template, {
  TemplateLineAction, TemplateData,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import MiniPopup from '../../components/MiniPopup';
import courseApi from '../../api/courseAPI';
import { useDispatch } from 'react-redux';
import notifyMessage from '../../utils/notifyMessage';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import { useCourses, useFetchAllCourses } from '../../redux/course/hook';
import { addCourses, deleteCourses, updateCourses } from '../../redux/course/coursesSlice';
import { useLecturers, useFetchAllLecturers } from '../../redux/user/hook';
import { findElementById } from '../../utils/uitility';
import { useMemo } from 'react';
const Courses = props => {
  useFetchAllCourses()
  useFetchAllLecturers()
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const Courses = useCourses()
  const Lecturers = useLecturers()
  const initialCourseForm = {
    coursename: "",
    lecturerUserName: null,
    coursecode: "",
  }

  const [OpenCreateCourseModal, setOpenCreateCourseModal] = useState(false)
  const [OpenAddLecturerModal, setOpenAddLecturerModal] = useState(false)
  const [OpenMiniPopupCourses, setOpenMiniPopupCourses] = useState("")
  const [selectCourseID, setSelectCourseID] = useState("")
  const [selectLecturerID, setSelectLecturerID] = useState("")
  const [searchCourseData, setSearchCourseData] = useState([])
  const [searchLecturersData, setSearchLecturersData] = useState([])
  const [rows, setRows] = useState([])
  const [leturersRows, setLecturersRows] = useState([])
  const [courseForm, setCourseForm] = useState(initialCourseForm)
  const { coursename, coursecode } = courseForm
  const headers = variable([
    "Id",
    "Course Code",
    "Course Name",
    "Lecturer Name",
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
        if (searchCourseData.length > 0)
          setSearchCourseData([])
      }
      else {
        if (rs.status === 400)
          dispatch(setSnackbar(notifyMessage.CREATE_FAIL("course", "course code or name has existed!")))
        else
          dispatch(setSnackbar(notifyMessage.CREATE_FAIL("course")))
      }
    }
  }
  const handleRemoveLecturer = async () => {
    // console.log("delete lectuererid: ", selectLecturerID);
    // console.log("delete courseid: ", selectCourseID);
    if (!selectLecturerID) {
      dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("lecturer", "No lectuers assigned to be removed!")))
      return
    }
    else {
      let lecturer = findElementById(selectLecturerID, Lecturers)
      let course = findElementById(selectCourseID, Courses)
      // console.log(lecturer, course);
      if (!lecturer && !course) {
        dispatch(setSnackbar(notifyMessage.ERROR("lecturer or course is null!")))
        return
      }
      if (window.confirm(`Remove lectuerer ${lecturer.fullName} from course ${course.coursecode}-${course.coursename} ?`)) {
        let updateForm = {
          ...course,
          lecturerId: null
        }
        let rs = await courseApi.updateCourse(updateForm).catch(data => { return data.response })
        if (await rs.status === 200) {
          dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("course", "Lecturer removed.")))
          dispatch(updateCourses(rs.data))
          if (searchLecturersData.length > 0)
            setSearchLecturersData([])
        }
        else {
          if (rs.status === 400)
            dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course", "Cannot remove this lecturer.")))
          else
            dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course")))
        }
      }
    }
  }
  const handleDeleteCourse = async () => {
    // console.log("delete lectuererid: ", selectLecturerID);
    // console.log("delete courseid: ", selectCourseID);

    let course = findElementById(selectCourseID, Courses)
    console.log(course);
    if (!course) {
      dispatch(setSnackbar(notifyMessage.ERROR("course is null!")))
      return
    }
    if (window.confirm(`Delete course ${course.coursecode}-${course.coursename} ?`)) {

      let rs = await courseApi.deleteCourse(course.id).catch(data => { return data.response })
      if (await rs.status === 200) {
        dispatch(setSnackbar(notifyMessage.DELETE_SUCCESS("course", "Lecturer removed.")))
        dispatch(deleteCourses(course))
        if (searchCourseData.length > 0)
          setSearchCourseData([])
      }
      else {
        if (rs.status === 400)
          dispatch(setSnackbar(notifyMessage.DELETE_FAIL("course", "Cannot delete this course.")))
        else
          dispatch(setSnackbar(notifyMessage.DELETE_FAIL("course")))
      }
    }

  }

  const handleAddLecturer = async (lecturerId) => {
    // console.log("add lectuererid: ", lecturerId);
    // console.log("add courseid: ", selectCourseID);
    let lecturer = findElementById(lecturerId, Lecturers)
    let course = findElementById(selectCourseID, Courses)
    console.log(lecturer, course);
    if (!lecturer && !course) {
      dispatch(setSnackbar(notifyMessage.ERROR("lecturer or course is null!")))
      return
    }
    if (window.confirm(`Add lectuerer ${lecturer.fullName} into course ${course.coursecode}-${course.coursename} ?`)) {
      let updateForm = {
        ...course,
        lecturerId: lecturerId
      }
      let rs = await courseApi.updateCourse(updateForm).catch(data => { return data.response })
      if (await rs.status === 200) {
        dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("course", "Lecturer added.")))
        setOpenAddLecturerModal(false)
        dispatch(updateCourses(rs.data))
        if (searchLecturersData.length > 0)
          setSearchLecturersData([])
      }
      else {
        if (rs.status === 400)
          dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course", "Cannot add this lecturer.")))
        else
          dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course")))
      }
    }

  }
  useEffect(() => {
    if (Courses.length > 0) {
      let tmp = Courses.map((item, index) => {
        return {
          ...item,
          'no.': index + 1,
          lecturerId: item.lecturerId ? item.lecturerId : (courseId) => {
            setSelectCourseID(courseId)
            setOpenAddLecturerModal(true)
          },
          option: {
            type: "option",
            click: (courseId, lecturerId) => {
              setOpenMiniPopupCourses(courseId)
              setSelectCourseID(courseId)
              setSelectLecturerID(lecturerId)
            }
          }
        }
      })
      setRows([...tmp])
    }
  }, [Courses])
  useMemo(() => {
    if (Lecturers.length > 0) {
      let tmp = Lecturers.map((item, index) => {
        return {
          ...item,
          'no.': index + 1,
          option: {
            type: "confirm",
            click: (lecturerId) => {
              handleAddLecturer(lecturerId)
            }
          }
        }
      })
      setLecturersRows([...tmp])
    }
  }, [selectCourseID])
  return (
    <Template>
      <TemplateSearch>
        <SearchBar data={rows} keyword={["coursename", "coursecode"]} onsearch={(data) => { setSearchCourseData(data) }} />
      </TemplateSearch>
      <TemplateLineAction>
        <LineAction
          name={"Create a course"}
          click={openCreateCourseModal}
        />
      </TemplateLineAction>
      <TemplateData>
        <MyDataGrid ColumnHeader={headers} Data={searchCourseData.length > 0 ? searchCourseData : rows} />
        <MiniPopup
          open={OpenMiniPopupCourses}
          close={() => setOpenMiniPopupCourses("")}
          actions={[
            {
              name: "Manage student",
              click: () => {
                // let element = findElementById(selectCourseID, Courses)
                // if (element)
                //   navigate(`/courses/${element.coursecode}`)
                // else {
                  navigate(`/courses/${selectCourseID}`)
                // }
              }
            },
            {
              name: "Remove lecturer",
              click: handleRemoveLecturer
            },
            {
              name: "Delete",
              click: handleDeleteCourse
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
        <TemplateModalAction activeRight={"Create"} funcError={closeCreateCourseModal} size="sm" />
      </TemplateModal>
      <TemplateModal
        open={OpenAddLecturerModal}
        size="lg"
        form={false}
      >
        <TemplateModalTitle>
          <SearchBar data={leturersRows} keyword={["fullName", "username"]} onsearch={(data) => { setSearchLecturersData(data) }} />
        </TemplateModalTitle>
        <TemplateModalBody >
          <MyDataGrid ColumnHeader={lecturersHeaders} Data={searchLecturersData.length > 0 ? searchLecturersData : leturersRows} />
        </TemplateModalBody>
        <TemplateModalAction funcError={closeAddLecturerModal} size="lg" />
      </TemplateModal>
    </Template>
  )
}

Courses.propTypes = {

}

export default Courses
