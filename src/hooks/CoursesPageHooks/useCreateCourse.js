import { useState } from "react";
import { addCourses } from "../../redux/course/coursesSlice";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/snackbar/snackbarSlice";
import courseApi from "../../api/courseAPI";
import notifyMessage from "../../utils/notifyMessage";
import { parseToISOSDate, today } from "../../utils/parseDate";

const useCreateCourse = () =>{
    const dispatch = useDispatch();
    const initialCourseForm = {
        coursename: "",
        lecturerUserName: null,
        coursecode: "",
        beginDate: today(),
        endDate: today(),
        dateOfWeek: 0,
        session: true
      }
    const [OpenCreateCourseModal, setOpenCreateCourseModal] = useState(false)
    const [OpenCreateCoursesModal, setOpenCreateCoursesModal] = useState(false)
    const [courseForm, setCourseForm] = useState(initialCourseForm)
    const { coursename, coursecode, beginDate, endDate, dateOfWeek, session } = courseForm
    const [searchCourseData, setSearchCourseData] = useState([])


    const onCourseFormChange = (e) => {
      if(e.target.value === 'beginDate' || e.target.value === 'endDate')
      {
        setCourseForm({
          ...courseForm,
          [e.target.name]: parseToISOSDate(e.target.value)
        })
      }
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

      return {coursename, coursecode, beginDate, endDate, dateOfWeek, session, handleCreateCourse, onCourseFormChange, OpenCreateCourseModal, setOpenCreateCourseModal,
    searchCourseData, setSearchCourseData, OpenCreateCoursesModal, setOpenCreateCoursesModal};
}

export default useCreateCourse