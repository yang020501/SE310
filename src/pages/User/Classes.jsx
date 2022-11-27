import React, { useRef } from 'react'
import PropTypes from 'prop-types'
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
import useMousePosition from '../../utils/mousePosition'

const Classes = () => {
    const dataGridFunctionRef = useRef(null)
    const mousePosition = useMousePosition()
    const closeOptionMenu = () => {

        let valid = document.activeElement.children[0] ? document.activeElement.children[0].classList : ""
        if (!(valid.value === "gridoption")) {
            dataGridFunctionRef.current.classList.remove('show')
            window.removeEventListener('click', closeOptionMenu)
        }

    }
    const openOptionMenu = () => {
        dataGridFunctionRef.current.style.top = `${mousePosition.y + 5 + document.documentElement.scrollTop}px`
        dataGridFunctionRef.current.style.left = `${mousePosition.x + 5}px`
        dataGridFunctionRef.current.classList.add('show')
        window.addEventListener('click', closeOptionMenu)
    }
    return (
        <Template>
            <TemplateSearch>
                <SearchBar />
            </TemplateSearch>
            <TemplateTitle>CLASSES</TemplateTitle>
            <TemplateLineAction>
                <LineAction
                    name={"Show hidden classes"}
                    checkbox
                // click={openModal}
                />
            </TemplateLineAction>
            <TemplateData>
                <div className='datagrid'>

                    <Grid container spacing={2} >
                        <Grid item lg={3}>
                            <ClassCard name="Nguyen haong Thai Duong" optionclick={openOptionMenu} />
                        </Grid>
                        <Grid item lg={3}>
                            <ClassCard name="Nguyen haong Thai Duong" />
                        </Grid>
                        <Grid item lg={3}>
                            <ClassCard name="Nguyen haong Thai Duong" />
                        </Grid>
                        <Grid item lg={3}>
                            <ClassCard name="Nguyen haong Thai Duong" />
                        </Grid>
                        <Grid item lg={3}>
                            <ClassCard name="Nguyen haong Thai Duong" />
                        </Grid>
                        <Grid item lg={3}>
                            <ClassCard name="Nguyen haong Thai Duong" />
                        </Grid>
                        <Grid item lg={3}>
                            <ClassCard name="Nguyen haong Thai Duong" />
                        </Grid>
                        <Grid item lg={3}>
                            <ClassCard name="Nguyen haong Thai Duong" />
                        </Grid>
                    </Grid>
                    <div className="datagrid-function" ref={dataGridFunctionRef}>
                        <div className="datagrid-function-item">
                            Add a Student
                        </div>
                        <div className="datagrid-function-item">
                            Manage students
                        </div>
                        <div className="datagrid-function-item">
                            Remove lecturer
                        </div>
                    </div>

                </div>
            </TemplateData>
        </Template>
    )
}

export default Classes
