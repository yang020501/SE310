import React, { useEffect } from 'react'
import SearchBar from '../../components/SearchBar';
import LineAction from '../../components/LineAction';
import { useState } from 'react';
import Template, {
    TemplateTitle, TemplateLineAction, TemplateData,
    TemplateSearch, TemplateModal, TemplateModalTitle,
    TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import { Grid } from '@mui/material';
import ClassCard from '../../components/ClassCard';
import MiniPopup from '../../components/MiniPopup';
import { useAssignedCourses, useFetchAllAssignedCourses, useFetchAllCourses } from '../../redux/course/hook';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../redux/user/hook';

const Classes = () => {
    useFetchAllAssignedCourses()

    let navigate = useNavigate()
    const AssignedCourses = useAssignedCourses()
    const Role = useRole()

    const [OpenMiniPopupClasses, setOpenMiniPopupClasses] = useState("")
    const [assignedCourses, setAssignedCourses] = useState([])
    const [selectedID, setSelcetedID] = useState("")
    const [searchCoursesData, setSearchCoursesData] = useState([])
    useEffect(() => {
        if (AssignedCourses.length > 0) {
            setAssignedCourses([...AssignedCourses])
        }
    }, [AssignedCourses])
    return (
        <Template>
            <TemplateSearch>
                <SearchBar data={assignedCourses} keyword={["coursename", "coursecode"]} onsearch={(data) => { setSearchCoursesData(data) }} />
            </TemplateSearch>
            <TemplateTitle>COURSES</TemplateTitle>
            {/* <TemplateLineAction>
                <LineAction
                    name={"Show hidden classes"}
                    checkbox
                // click={openModal}
                />
            </TemplateLineAction> */}
            <TemplateData>

                <Grid container spacing={2} >

                    {
                        Role === "lecturer" ?
                            searchCoursesData.length > 0 ?
                                searchCoursesData.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Grid item lg={3}>
                                                <ClassCard name={item.coursename} code={item.coursecode} optionclick={() => {
                                                    setOpenMiniPopupClasses(item.id)
                                                    setSelcetedID(item.id)
                                                }} />
                                            </Grid>
                                        </React.Fragment>
                                    )
                                })
                                :
                                assignedCourses.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Grid item lg={3}>
                                                <ClassCard name={item.coursename} code={item.coursecode} optionclick={() => {
                                                    setOpenMiniPopupClasses(item.id)
                                                    setSelcetedID(item.id)
                                                }} />
                                            </Grid>
                                        </React.Fragment>
                                    )
                                })
                            :
                            searchCoursesData.length > 0 ?
                                searchCoursesData.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Grid item lg={3}>
                                                <ClassCard name={item.coursename} code={item.coursecode} click={() => {navigate(item.id)}}/>
                                            </Grid>
                                        </React.Fragment>
                                    )
                                })
                                :
                                assignedCourses.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Grid item lg={3}>
                                                <ClassCard name={item.coursename} code={item.coursecode} click={() => {navigate(item.id)}} />
                                            </Grid>
                                        </React.Fragment>
                                    )
                                })

                    }
                </Grid>
                {
                    Role === "lecturer" ?
                        <MiniPopup
                            open={OpenMiniPopupClasses}
                            close={() => setOpenMiniPopupClasses("")}
                            actions={[
                                {
                                    name: "Manage Course",
                                    click: () => {
                                        navigate(`${selectedID}`)
                                    }
                                }
                            ]}
                        />
                        : <></>
                }

            </TemplateData>
        </Template>
    )
}

export default Classes
