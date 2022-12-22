import React, { useState } from 'react'
import Template, {
  TemplateTitle, TemplateLineAction, TemplateData,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import SearchBar from '../../components/SearchBar';
import LineAction from '../../components/LineAction';
import ClassBlock from '../../components/ClassBlock';
import MiniPopup from '../../components/MiniPopup';
import { Grid } from '@mui/material';
const Class = () => {
  const count = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
  const [OpenMiniPopupClass, setOpenMiniPopupClass] = useState("")
  const [openBlockModal, setOpenBlockModal] = useState(false)
  const [mode, setMode] = useState("")

  const OpenBlockModal = () => setOpenBlockModal(true)
  const CloseBlockModal = () => setOpenBlockModal(false)
  return (
    <Template>
      <TemplateSearch>
        {/* <SearchBar /> */}
      </TemplateSearch>
      <TemplateTitle>SE100 - Object Oreienetdf sddasdasdadsadasdsad</TemplateTitle>
      <TemplateLineAction>
        <LineAction
          name={"New block"}
          click={() => {
            setMode("New")
            OpenBlockModal(true)
          }}
        />
      </TemplateLineAction>
      <TemplateData>
        <Grid container spacing={2} direction={"column"}>
          {
            count.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <Grid item lg={3} >
                    <ClassBlock name={`Lession ${index + 1} - Hafasdkdsakjhdkasjhdhkjashdsjakd`} click={() => { setOpenMiniPopupClass(true) }} />
                  </Grid>
                </React.Fragment>

              )
            })
          }
        </Grid>
        <MiniPopup
          open={OpenMiniPopupClass}
          close={() => setOpenMiniPopupClass("")}
          actions={[
            {
              name: "Rename",
              click: null
            },
            {
              name: "Delete",
              click: null
            }
          ]} />

      </TemplateData>
      <TemplateModal
        open={openBlockModal}
        size="sm"
        form={false}
      >
        <TemplateModalTitle>

        </TemplateModalTitle>
        <TemplateModalBody >

        </TemplateModalBody>
        <TemplateModalAction activeRight={"Create"} funcError={CloseBlockModal} size="sm" />
      </TemplateModal>
    </Template>
  )
}

export default Class