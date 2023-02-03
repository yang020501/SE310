import React, {useState, useEffect} from 'react'
import Template, {TemplateData, TemplateSearch, TemplateLineAction, TemplateTitle} from '../../components/Template'
import SearchBar from '../../components/SearchBar'
import MyDataGrid from '../../components/MyDataGrid'
import { availableCoursesHeaders } from '../../utils/datagridHeader'
import { Button } from '@mui/material'
import { useFetchAvailableCourses, useFetchRegisteredCourses } from '../../redux/course/hook'
import courseApi from '../../api/courseAPI'
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../../redux/snackbar/snackbarSlice'
import notifyMessage from '../../utils/notifyMessage'

const CourseRegister = () => {
    let dispatch = useDispatch();
    const [searchAvailableData, setSearchAvailableData] = useState([]);
    const [checkCourses, setCheckCourses] = useState([]);
    const AvailableCourse = useFetchAvailableCourses();
    const RegisterdCourse = useFetchRegisteredCourses();
    const [availableRows, setAvailableRows] = useState([]);
    const [registeredRows, setRegisteredRows] = useState([])
    const CheckCourses = (id) => {
        setCheckCourses([...id])
      }
    const handleRegisterCourse = async (event) =>{
        event.preventDefault()
        event.stopPropagation()
        console.log(checkCourses)
        if(checkCourses.length > 0 ){
            if(window.confirm(`Register All checked Courses?`)) {
                let regisData = {
                    courseId: checkCourses
                }
                console.log(regisData.courseId)
                let rs = await courseApi.registerToCourse(regisData).catch(data => { return data.response })
                if(await rs.status === 200) {
                    dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("course", "Register Success.")));
                    window.location.reload();
                }
                else {
                    if (rs.status === 400)
                    dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course", "Already register to this course")))
                  else
                    dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course")))
                }
            }
        }
    }

    const handleCancelRegisteredCourse = () =>{

    }
    useEffect(() => {
        if(AvailableCourse.length > 0) {
            let tmp = [...AvailableCourse];
            tmp = tmp.map((item) => {
                return {
                  ...item,
                   dateOfWeek: (item.dateOfWeek < 6) ? String(item.dateOfWeek + 1) : 'Sunday',
                  session: item.session ? 'Morning' : 'Afternoon'
                }
              })    
            setAvailableRows(tmp);
        }
    }, [AvailableCourse])
    useEffect(() => {
        if(RegisterdCourse.length > 0) {
            let tmp = [...RegisterdCourse];
            tmp = tmp.map((item) => {
                return {
                  ...item,
                   dateOfWeek: (item.dateOfWeek < 6) ? String(item.dateOfWeek + 1) : 'Sunday',
                  session: item.session ? 'Morning' : 'Afternoon'
                }
              })    
            setRegisteredRows(tmp);
        }
}, [RegisterdCourse])
  return (
    <div>
        <TemplateTitle>Registered Courses</TemplateTitle>
        {(RegisterdCourse.length > 0) ?
        <Template>
            <TemplateData>
                <MyDataGrid CheckboxFunc={CheckCourses} Checkbox ColumnHeader={availableCoursesHeaders} Data={registeredRows}/>
            </TemplateData>
            <TemplateLineAction>
                <Button variant='error' >Cancel Register</Button>
            </TemplateLineAction>
        </Template>
        : []
        }
        <Template>
        <TemplateTitle><h1>Available Courses</h1></TemplateTitle>
            <TemplateSearch>
                <SearchBar data={searchAvailableData}  keyword={["coursename", "coursecode"]} onsearch={(data) => { setSearchAvailableData(data) }}/>
            </TemplateSearch>
            <TemplateData>
                <MyDataGrid CheckboxFunc={CheckCourses} Checkbox ColumnHeader={availableCoursesHeaders} Data={searchAvailableData.length > 0 ? searchAvailableData : availableRows}/>
            </TemplateData>
            <TemplateLineAction>
                <Button onClick={handleRegisterCourse}>Register</Button>
            </TemplateLineAction>
        </Template>
    </div>
  )
}

export default CourseRegister