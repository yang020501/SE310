import React, { useState, useEffect } from 'react'
import Template, { TemplateData, TemplateSearch, TemplateLineAction, TemplateTitle } from '../../components/Template'
import SearchBar from '../../components/SearchBar'
import MyDataGrid from '../../components/MyDataGrid'
import { availableCoursesHeaders } from '../../utils/datagridHeader'
import { Button } from '@mui/material'
import { useFetchAvailableCourses, useFetchRegisteredCourses } from '../../redux/course/hook'
import courseApi from '../../api/courseAPI'
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../../redux/snackbar/snackbarSlice'
import notifyMessage from '../../utils/notifyMessage'
import { findElementById } from '../../utils/uitility'
import { useNavigate } from 'react-router-dom'

const parseDay = (value) => {
  let tmp = Number(value)
  let day = ""
  switch (tmp) {
      case 0: day = 'Monday'; break;
      case 1: day = 'Tuesday'; break;
      case 2: day = 'Wednesday'; break;
      case 3: day = 'Thursday'; break;
      case 4: day = 'Friday'; break;
      case 5: day = "Saturday"; break;
      case 6: day = 'Sunday'; break;
      default: day = ""; break;
  }
  return day
}

const CourseRegister = () => {
  let navigate = useNavigate();
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
  const handleRegisterCourse = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (checkCourses.length > 0) {
      if (window.confirm(`Register All checked Courses?`)) {
        let regisData = {
          coursesId: checkCourses
        }
        let rs = await courseApi.registerToCourse(regisData).catch(data => { return data.response })
        if (await rs.status === 200) {
          dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("course", "Register Success.")));
          let newAvailableCourses = availableRows.filter(item => { return !checkCourses.includes(item.id) })
          let newRegisteredCourses = checkCourses.map((item, index) => {
            return {
              ...findElementById(item, availableRows)
            }
          })
          setRegisteredRows([
            ...registeredRows,
            ...newRegisteredCourses
          ])
          setAvailableRows([...newAvailableCourses])
        }
        else {
          if (rs.status === 400)
            dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course", "Already register to this course")))
          else
            dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course", "Courses have the same schedule")))
        }
      }
    }
  }

  const handleCancelRegisteredCourse = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (checkCourses.length > 0) {
      if (window.confirm(`Register All checked Courses?`)) {
        let regisData = {
          coursesId: checkCourses
        }
        let rs = await courseApi.cancelRegisteredCourse(regisData).catch(data => { return data.response })
        if (await rs.status === 200) {
          dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("course", "Cancel Success.")));
          //window.location.reload();
          let newRegisteredCourses = registeredRows.filter(item => { return !checkCourses.includes(item.id) })
          let newAvailableCourses = checkCourses.map((item, index) => {
            return {
              ...findElementById(item, registeredRows)
            }
          })
          setAvailableRows([
            ...availableRows,
            ...newAvailableCourses
          ])
          setRegisteredRows([...newRegisteredCourses])
        }
        else {
          if (rs.status === 400)
            dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course", "Can't cancel this course")))
          else
            dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("course")))
        }
      }
    }
  }
  const checkRegisTime = async () => {
    let rs = await courseApi.checkRegistrationCourses().catch(data => { return data.response })
    if(await rs.status === 404) {
      navigate('/404')
    }
  }
  useEffect(()=>{
    checkRegisTime();
  },[checkRegisTime])
  useEffect(() => {
    if (AvailableCourse.length > 0) {
      let tmp = [...AvailableCourse];
      tmp = tmp.map((item) => {
        return {
          ...item,
          dateOfWeek: parseDay(item.dateOfWeek),
          session: item.session ? 'Morning' : 'Afternoon'
        }
      })
      setAvailableRows(tmp);
    }
  }, [AvailableCourse])
  useEffect(() => {
    if (RegisterdCourse.length > 0) {
      let tmp = [...RegisterdCourse];
      tmp = tmp.map((item) => {
        return {
          ...item,
          dateOfWeek: parseDay(item.dateOfWeek),
          session: item.session ? 'Morning' : 'Afternoon'
        }
      })
      setRegisteredRows(tmp);
    }
  }, [RegisterdCourse])
  return (
    <div>
      {(registeredRows.length > 0) ?
        <Template>
          <TemplateTitle><h1>Registered Courses</h1></TemplateTitle>
          <TemplateData>
            <MyDataGrid CheckboxFunc={CheckCourses} Checkbox ColumnHeader={availableCoursesHeaders} Data={registeredRows} />
          </TemplateData>
          <TemplateLineAction>
            <Button variant='error' onClick={handleCancelRegisteredCourse}>Cancel Register</Button>
          </TemplateLineAction>
        </Template>
        : []
      }
      <Template>
        <TemplateTitle><h1>Available Courses</h1></TemplateTitle>
        <TemplateSearch>
          <SearchBar data={searchAvailableData} keyword={["coursename", "coursecode"]} onsearch={(data) => { setSearchAvailableData(data) }} />
        </TemplateSearch>
        <TemplateData>
          <MyDataGrid CheckboxFunc={CheckCourses} Checkbox ColumnHeader={availableCoursesHeaders} Data={searchAvailableData.length > 0 ? searchAvailableData : availableRows} />
        </TemplateData>
        <TemplateLineAction>
          <Button onClick={handleRegisterCourse}>Register</Button>
        </TemplateLineAction>
      </Template>
    </div>
  )
}

export default CourseRegister
