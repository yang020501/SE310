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
import { useAssignedCourses, useFetchAllAssignedCourses } from '../../redux/course/hook';
import { useNavigate } from 'react-router-dom';

const Classes = () => {
    useFetchAllAssignedCourses()

    let navigate = useNavigate()
    const AssignedCourses = useAssignedCourses()
    console.log(AssignedCourses);
    const [OpenMiniPopupClasses, setOpenMiniPopupClasses] = useState("")
    const [assignedCourses, setAssignedCourses] = useState([])
    const [selectedID, setSelcetedID] = useState("")
    useEffect(() => {
        if (AssignedCourses.length > 0) {
            setAssignedCourses([...AssignedCourses])
        }
    }, [AssignedCourses])
    return (
        <Template>
            <TemplateSearch>
                {/* <SearchBar /> */}
            </TemplateSearch>
            <TemplateTitle>CLASSES</TemplateTitle>
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
                    }
                </Grid>
                <MiniPopup
                    open={OpenMiniPopupClasses}
                    close={() => setOpenMiniPopupClasses("")}
                    actions={[
                        {
                            name: "Manage Course",
                            click: () => {
                                navigate( `${selectedID}`)
                            }
                        }
                    ]}
                />
            </TemplateData>
        </Template>
    )
}

export default Classes
