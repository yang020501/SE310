import MyDataGrid from '../../components/MyDataGrid'
import SearchBar from '../../components/SearchBar';
import LineAction from '../../components/LineAction';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom'
import Input from '@mui/material/Input';
import Template, {
  TemplateLineAction, TemplateData,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import MiniPopup from '../../components/MiniPopup';
import {Button} from '@mui/material';
import { CourseHeaders, LecturerHeaders } from '../../utils/datagridHeader';
import useLoadCourses from '../../hooks/CoursesPageHooks/useLoadCourses';
import useAddLectures from '../../hooks/CoursesPageHooks/useAddLecture';
import useDeleteLecture from '../../hooks/CoursesPageHooks/useDeleteLecture';
import useCreateCourse from '../../hooks/CoursesPageHooks/useCreateCourse';
import useDeleteCourse from '../../hooks/CoursesPageHooks/useDeleteCourse';
import { Select, MenuItem } from '@mui/material';
import { parseToISOSDate, parseToLocalDate } from '../../utils/parseDate';
import { useState } from 'react';
import { useEffect } from 'react';
import courseApi from '../../api/courseAPI';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import notifyMessage from '../../utils/notifyMessage';
import { useDispatch } from "react-redux";
import CourseCreateResult from '../../components/CourseCreateResult';

const Courses = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()

  const [csvFile, setCsvFile] = useState();
  const [csvArray, setCsvArray] = useState([]);

  const loadCSV = () => {
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      processCSV(text)
    }
    reader.readAsText(file);
  }
  const processCSV = (str, delim = ',') => {

    const headers = str.slice(0, str.indexOf('\r\n')).split(delim);

    const rows = str.slice(str.indexOf('\n') + 1).split('\n');

    const newArray = rows.map(row => {
      const values = row.split(delim);
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {})
      return eachObject;
    })
    newArray.pop()
    setCsvArray(newArray)
  }
  const handleCreateCourses = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (csvArray.length > 0) {
      if (window.confirm("Create all courses?")) {
        let data = [...csvArray]
        data = data.map(item => {

          return {
            ...item,
            beginDate: parseToISOSDate(item.beginDate),
            endDate: parseToISOSDate(item.endDate),
            session: Boolean(item.session),
            dateOfWeek: Number(item.dateOfWeek),
            lecturerId: null
          }
        })
        data = JSON.stringify(data)
        console.log(data);
        
        let rs = await courseApi.createCoursesByCSV(data).catch(data => { return data.response })
        if (await rs.status === 200) {

          dispatch(setSnackbar(notifyMessage.CREATE_SUCCESS("courses")))
          setCsvArray([])
          setOpenCreateCoursesModal(false)

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
    } else {
      dispatch(setSnackbar(notifyMessage.CREATE_FAIL("CSV file is not valid or not uploaded!")))
    }
  }
  const handleFinalizeCourses = async () =>{
    if (window.confirm(`Register All checked Courses?`)) {
    let rs = await courseApi.finalizeCourses().catch(data => {return data.response})
    if (await rs.status === 200) {
      dispatch(setSnackbar(notifyMessage.CREATE_SUCCESS("Finalize Registration Successfully!")))
    }
    else {
      if (rs.status === 400)
        dispatch(setSnackbar(notifyMessage.CREATE_FAIL("course", "Finalize Registration Failed!")))
      else
        dispatch(setSnackbar(notifyMessage.CREATE_FAIL("Unauthorized!")))
    }
  }
  }
  const { Courses, rows, selectCourseID, selectLecturerID, OpenMiniPopupCourses, setOpenMiniPopupCourses,
    OpenAddLecturerModal, setOpenAddLecturerModal } = useLoadCourses();
  const { Lecturers, leturersRows, searchLecturersData, setSearchLecturersData } = useAddLectures(selectCourseID, Courses, setOpenAddLecturerModal);
  const { handleRemoveLecturer } = useDeleteLecture(selectLecturerID, selectCourseID, Courses, Lecturers, searchLecturersData
    , setSearchLecturersData);
  const { coursename, coursecode, beginDate, endDate, dateOfWeek, session, handleCreateCourse, onCourseFormChange, OpenCreateCourseModal, setOpenCreateCourseModal
    , searchCourseData, setSearchCourseData, OpenCreateCoursesModal, setOpenCreateCoursesModal } = useCreateCourse();
  const { handleDeleteCourse } = useDeleteCourse(searchCourseData, setSearchCourseData, selectCourseID, Courses)

  useEffect(() => {

    if (csvFile) {
      loadCSV()
    }

  }, [csvFile]);
  return (
    <Template>
      <TemplateSearch>
        <SearchBar data={rows} keyword={["coursename", "coursecode"]} onsearch={(data) => { setSearchCourseData(data) }} />
      </TemplateSearch>
      <TemplateLineAction>
        <LineAction
          name={"Create a course"}
          click={() => setOpenCreateCourseModal(true)}
        />
      </TemplateLineAction>
      <TemplateLineAction>
        <LineAction
          name={"Create courses"}
          click={() => setOpenCreateCoursesModal(true)}
        />
      </TemplateLineAction>
      <TemplateData>
        <MyDataGrid ColumnHeader={CourseHeaders} Data={searchCourseData.length > 0 ? searchCourseData : rows} />
        <MiniPopup
          open={OpenMiniPopupCourses}
          close={() => { setOpenMiniPopupCourses('') }}
          actions={[
            {
              name: "Manage student",
              click: () => {
                navigate(`/courses/${selectCourseID}`)
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
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Enter begin date:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input required type='date' name='beginDate' value={parseToLocalDate(beginDate)} onChange={onCourseFormChange} />
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Enter end date:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input required type='date' name='endDate' value={parseToLocalDate(endDate)} onChange={onCourseFormChange} />
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Enter date of Week:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Select labelId='dateofWeek'
                  id='dateofWeek'
                  label='dateofWeek'
                  name='dateOfWeek'
                  value={dateOfWeek}
                  onChange={onCourseFormChange}
                  required
                >
                  <MenuItem value={0}>Monday</MenuItem>
                  <MenuItem value={1}>Tuesday</MenuItem>
                  <MenuItem value={2}>Wednesday</MenuItem>
                  <MenuItem value={3}>Thursday</MenuItem>
                  <MenuItem value={4}>Friday</MenuItem>
                  <MenuItem value={5}>Saturday</MenuItem>
                  <MenuItem value={6}>Sunday</MenuItem>
                </Select>
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Enter Session:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Select labelId='session'
                  id='session'
                  label='session'
                  name='session'
                  value={session}
                  onChange={onCourseFormChange}
                  required
                >
                  <MenuItem value={true}>Morning</MenuItem>
                  <MenuItem value={false}>Afternoon</MenuItem>
                </Select>
              </div>
            </div>
            <Divider variant="middle" />
          </div>
        </TemplateModalBody>
        <TemplateModalAction activeRight={"Create"} funcError={() => setOpenCreateCourseModal(false)} size="sm" />
      </TemplateModal>
      <TemplateModal
        open={OpenCreateCoursesModal}
        size="lg"
        form={true}
        onsubmit={handleCreateCourses}
      >
        <TemplateModalTitle>
          <p> Create new courses:</p>
          <Divider variant="middle" />
        </TemplateModalTitle>
        <TemplateModalBody>
          <input type='file' accept='.csv' id='csvFile' onChange={(e) => setCsvFile(e.target.files[0])} />
          <CourseCreateResult data={csvArray} />
        </TemplateModalBody>
        <TemplateModalAction activeRight={"Create"} funcError={() => {
          setOpenCreateCoursesModal(false)
          setCsvArray([])
        }} size="sm" />
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
          <MyDataGrid ColumnHeader={LecturerHeaders} Data={searchLecturersData.length > 0 ? searchLecturersData : leturersRows} />
        </TemplateModalBody>
        <TemplateModalAction funcError={() => setOpenAddLecturerModal(false)} size="lg" />
      </TemplateModal>
      <TemplateLineAction>
        <Button onClick={handleFinalizeCourses}>Finalize Course Registration</Button>
      </TemplateLineAction>
    </Template>
  )
}

Courses.propTypes = {

}

export default Courses
