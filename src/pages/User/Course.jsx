import React from 'react'
import MyDataGrid from '../../components/MyDataGrid'
import SearchBar from '../../components/SearchBar';
import variable from '../../utils/variable'
import LineAction from '../../components/LineAction';
import { useState } from 'react';
import Template, {
  TemplateTitle, TemplateLineAction, TemplateData,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import MiniPopup from '../../components/MiniPopup';
import { useLecturers, useStudents, useFetchAllLecturers, useFetchAllStudents } from '../../redux/user/hook';
import { useEffect } from 'react';
import notifyMessage from '../../utils/notifyMessage';
import { useDispatch } from 'react-redux';
import { updateCourses } from '../../redux/course/coursesSlice';
import courseApi from '../../api/courseAPI';
import { useCourses, useFetchAllCourses, useFetchAllStudentsAssigned } from '../../redux/course/hook';
import { findElementById } from '../../utils/uitility';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import { useParams } from 'react-router-dom';
const Course = () => {
  const { courseId } = useParams("courseId")

  useFetchAllStudents()
  useFetchAllLecturers()
  useFetchAllCourses()


  let dispatch = useDispatch()
  const AssignedStudents = useFetchAllStudentsAssigned(courseId)
  const Students = useStudents()
  const Lecturers = useLecturers()
  const Courses = useCourses()

  const [OpenAddStudentsModal, setOpenAddStudentsModal] = useState(false)
  const [OpenChangeLecturerModal, setOpenChangeLecturerModal] = useState(false)
  const [OpenMiniPopupCourse, setOpenMiniPopupCourse] = useState("")
  const [searchLecturersData, setSearchLecturersData] = useState([])
  const [searchStudentsAddedData, setSearchStudentsAddedData] = useState([])
  const [searchAssignedStudentsData, setSearchAssignedStudentsData] = useState([])
  const [studentsAddedRows, setStudentsAddedRows] = useState([])
  const [leturersRows, setLecturersRows] = useState([])
  const [checkStudents, setCheckStudents] = useState([])
  const course = findElementById(courseId, Courses)
  const lecturer = findElementById(course ? course.lecturerId : "", Lecturers)
  const assignedStudentsHeader = variable([
    "Id",
    "User Name",
    "Full Name",
    "Email",
    "Option"
  ])
  const studentsHeaders = variable([
    "Username",
    "Full Name",
    "Email",
    "Role"
  ])
  const lecturersHeaders = variable([
    "Username",
    "Full Name",
    "Email",
    "Role",
    "Option"
  ])
  const openAddStudentsModal = () => setOpenAddStudentsModal(true)
  const closeAddStudentsModal = () => setOpenAddStudentsModal(false)
  const openChangeLecturerModal = () => setOpenChangeLecturerModal(true)
  const closeChangeLecturerModal = () => setOpenChangeLecturerModal(false)

  const CheckStudents = (id) => {
    setCheckStudents([...id])
  }
  const handleAddStudents = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    console.log(checkStudents);
    let studentnameList = checkStudents.map(item => {
      let tmp = findElementById(item, Students)
      return tmp.username
    })
    console.log(studentnameList);
    if (window.confirm(`Add all students selected ?`)) {
      let updateForm = {
        courseId: courseId,
        studentnameList: studentnameList
      }
      console.log(updateForm);
      let rs = await courseApi.addStudentsForCourse(updateForm).catch(data => { return data.response })
      if (await rs.status === 200) {
        dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("course", "Students added.")))
        setOpenAddStudentsModal(false)
        // dispatch(updateCourses(rs.data))
        if (searchStudentsAddedData.length > 0)
          setSearchStudentsAddedData([])
      }
      else {
        if (rs.status === 400)
          dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course", "Cannot add this students.")))
        else
          dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course")))
      }
    }
  }
  const handleChangeLecturer = async (lecturerId) => {
    // console.log("add lectuererid: ", lecturerId);
    // console.log("add courseid: ", selectCourseID);
    let lecturer = findElementById(lecturerId, Lecturers)

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
        setOpenChangeLecturerModal(false)
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
    if (Students.length > 0) {


      let tmp = Students.filter((item, index) => {
        return AssignedStudents.findIndex(itemS => itemS === item.id) !== -1
      })
      tmp = tmp.map((item,index) => {
        return {
          ...item,
          'no.': index + 1,
          option: {
            type: "",
            click: (id) => {
              // setOpenMiniPopupAccounts(true)
              // setSelectID(id)
            }
          }
        }
      })
      setStudentsAddedRows([...tmp])
    }
  }, [Students, AssignedStudents])
  useEffect(() => {
    if (Lecturers.length > 0) {
      let tmp = Lecturers.map((item, index) => {
        return {
          ...item,
          'no.': index + 1,
          option: {
            type: "confirm",
            click: (lecturerId) => {
              handleChangeLecturer(lecturerId)
            }
          }
        }
      })
      setLecturersRows([...tmp])
    }
  }, [Lecturers])
  return (
    <Template>
      <TemplateSearch>
        <SearchBar data={assignedStudentsHeader} keyword={["fullName", "username"]} onsearch={(data) => { setSearchAssignedStudentsData(data) }} />
      </TemplateSearch>
      <TemplateTitle>{course ? `${course.coursecode} - ${course.coursename}` : ""}</TemplateTitle>
      <TemplateTitle>Lecturer: {lecturer ? lecturer.fullName : "No lecturer assigned"}</TemplateTitle>
      <TemplateLineAction>
        <LineAction
          name={"Change Lecturer"}
          click={openChangeLecturerModal}
        />
      </TemplateLineAction>
      <TemplateLineAction>
        <LineAction
          name={"Add new Students"}
          click={openAddStudentsModal}
        />
      </TemplateLineAction>
      <TemplateData>
        <MyDataGrid ColumnHeader={assignedStudentsHeader} Data={AssignedStudents ? [] : []} />
        <MiniPopup
          open={OpenMiniPopupCourse}
          close={() => setOpenMiniPopupCourse("")}
          actions={[
            {
              name: "Remove student",
              click: null
            }
          ]}
        />
      </TemplateData>
      <TemplateModal
        open={OpenAddStudentsModal}
        size="lg"
        form={true}
        onsubmit={handleAddStudents}
      >
        <TemplateModalTitle>
          <SearchBar data={studentsAddedRows} keyword={["fullName", "username"]} onsearch={(data) => { setSearchStudentsAddedData(data) }} />
        </TemplateModalTitle>
        <TemplateModalBody>
          <MyDataGrid CheckboxFunc={CheckStudents} Checkbox ColumnHeader={studentsHeaders} Data={searchStudentsAddedData.length > 0 ? searchStudentsAddedData : studentsAddedRows} searchStudentsData />
        </TemplateModalBody>
        <TemplateModalAction
          activeRight={"Confirm"}
          funcError={closeAddStudentsModal}
          size="lg"
        />
      </TemplateModal>
      <TemplateModal
        open={OpenChangeLecturerModal}
        size="lg"
        form={false}
      >
        <TemplateModalTitle>
          <SearchBar data={leturersRows} keyword={["fullName", "username"]} onsearch={(data) => { setSearchLecturersData(data) }} />
        </TemplateModalTitle>
        <TemplateModalBody >
          <MyDataGrid ColumnHeader={lecturersHeaders} Data={searchLecturersData.length > 0 ? searchLecturersData : leturersRows} />
        </TemplateModalBody>
        <TemplateModalAction funcError={closeChangeLecturerModal} size="lg" />
      </TemplateModal>
    </Template>
  )
}

export default Course
