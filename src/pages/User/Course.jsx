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
  const [OpenRemoveStudentsModal, setOpenRemoveStudentsModal] = useState(false)
  const [OpenMiniPopupCourse, setOpenMiniPopupCourse] = useState("")
  const [searchLecturersData, setSearchLecturersData] = useState([])
  const [searchStudentsAddedData, setSearchStudentsAddedData] = useState([])
  const [searchStudentsRemovedData, setSearchStudentsRemovedData] = useState([])
  const [searchAssignedStudentsData, setSearchAssignedStudentsData] = useState([])
  const [studentsAddedRows, setStudentsAddedRows] = useState([])
  const [studentsAssignedRows, setStudentsAssignedRows] = useState([])
  const [leturersRows, setLecturersRows] = useState([])
  const [checkStudents, setCheckStudents] = useState([])
  const course = findElementById(courseId, Courses)
  const lecturer = findElementById(course ? course.lecturerId : "", Lecturers)
  const assignedStudentsHeader = variable([
    "Id",
    "Username",
    "Full Name",
    "Email",
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
  const openRemoveStudentsModal = () => setOpenRemoveStudentsModal(true)
  const closeRemoveStudentsModal = () => setOpenRemoveStudentsModal(false)
  const CheckStudents = (id) => {
    setCheckStudents([...id])
  }
  const handleRemoveStudent = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    
    if (checkStudents.length > 0) {
      if (window.confirm(`Remove all students selected ?`)) {
        let updateForm = {
          courseId: courseId,
          studentIdList: checkStudents
        }
        let rs = await courseApi.removeStudentsForCourse(updateForm).catch(data => { return data.response })
        if (await rs.status === 200) {
        dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("course", "Students removed.")))
        setOpenRemoveStudentsModal(false)

        let newStudents = studentsAssignedRows.filter(item => { return !checkStudents.includes(item.id) })
        newStudents = newStudents.map((item, index) => {
          return {
            ...item,
            'no.': index + 1,
            option: {
              type: "option",
              click: () => { }
            }
          }
        })
        setStudentsAssignedRows([
          ...newStudents
        ])
        if (searchStudentsRemovedData.length > 0)
          setSearchStudentsRemovedData([])
        }
        else {
          if (rs.status === 400)
            dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course", "Cannot add this students.")))
          else
            dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course")))
        }
      }
    }
    else {
      dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course", "No students selected!")))
    }
  }
  const handleAddStudents = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    console.log(checkStudents);
    // let studentnameList = checkStudents.map(item => {
    //   let tmp = findElementById(item, Students)
    //   return tmp.username
    // })
    // console.log(studentnameList);
    if (checkStudents.length > 0) {
      if (window.confirm(`Add all students selected ?`)) {
        let updateForm = {
          courseId: courseId,
          studentIdList: checkStudents
        }
        let rs = await courseApi.addStudentsForCourse(updateForm).catch(data => { return data.response })
        if (await rs.status === 200) {
        dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("course", "Students added.")))
        setOpenAddStudentsModal(false)

        let newStudents = checkStudents.map((item, index) => {
          return {
            ...findElementById(item, Students),
            'no.': studentsAssignedRows.length + index + 1,
            option: {
              type: "option",
              click: (id) => {

              }
            }
          }
        })
        setStudentsAssignedRows([
          ...studentsAssignedRows,
          ...newStudents
        ])
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
    else {
      dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course", "No students selected!")))
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
        return studentsAssignedRows.findIndex(itemS => itemS.id === item.id) === -1
      })

      tmp = tmp.map((item, index) => {
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

  }, [Students, studentsAssignedRows])
  useEffect(() => {
    if (AssignedStudents.length > 0) {
      let tmp = AssignedStudents.map((item, index) => {
        return {
          ...item,
          'no.': index + 1,
          option: {
            type: "option",
            click: (id) => {
              // setOpenMiniPopupAccounts(true)
              // setSelectID(id)
            }
          }
        }
      })
      setStudentsAssignedRows([...tmp])
    }
  }, [AssignedStudents])
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
        <SearchBar data={studentsAssignedRows} keyword={["fullName", "username"]} onsearch={(data) => { setSearchAssignedStudentsData(data) }} />
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
      <TemplateLineAction>
        <LineAction
          name={"Remove assigned Students"}
          click={openRemoveStudentsModal}
        />
      </TemplateLineAction>
      <TemplateData>
        <MyDataGrid ColumnHeader={assignedStudentsHeader} Data={searchAssignedStudentsData.length > 0 ? searchAssignedStudentsData : studentsAssignedRows} />
        {/* <MiniPopup
          open={OpenMiniPopupCourse}
          close={() => setOpenMiniPopupCourse("")}
          actions={[
            {
              name: "Remove student",
              click: handleRemoveStudent
            }
          ]}
        /> */}
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
        <TemplateModalTitle>
          Add new Students
        </TemplateModalTitle>
        <TemplateModalBody>
          <MyDataGrid CheckboxFunc={CheckStudents} Checkbox ColumnHeader={studentsHeaders} Data={searchStudentsAddedData.length > 0 ? searchStudentsAddedData : studentsAddedRows} />
        </TemplateModalBody>
        <TemplateModalAction
          activeRight={"Confirm"}
          funcError={closeAddStudentsModal}
          size="lg"
        />
      </TemplateModal>
      <TemplateModal
        open={OpenRemoveStudentsModal}
        size="lg"
        form={true}
        onsubmit={handleRemoveStudent}
      >
        <TemplateModalTitle>
          <SearchBar data={studentsAssignedRows} keyword={["fullName", "username"]} onsearch={(data) => { setSearchStudentsRemovedData(data) }} />
        </TemplateModalTitle>
        <TemplateModalTitle>
          Remove assigned Students
        </TemplateModalTitle>
        <TemplateModalBody>
          <MyDataGrid CheckboxFunc={CheckStudents} Checkbox ColumnHeader={studentsHeaders} Data={searchStudentsRemovedData.length > 0 ? searchStudentsRemovedData : studentsAssignedRows} />
        </TemplateModalBody>
        <TemplateModalAction
          activeRight={"Confirm"}
          funcError={closeRemoveStudentsModal}
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
