import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Timetable from '../../components/Timetable'
import { useAssignedCourses, useFetchAllAssignedCourses } from '../../redux/course/hook'

const Schedule = () => {
  useFetchAllAssignedCourses()
  const data = useAssignedCourses()

  useEffect(() => {
    const fetch = async () => {

    }
    fetch()

  }, [])
  console.log(data);
  return (
    <Timetable data={data}>

    </Timetable>
  )
}

export default Schedule
