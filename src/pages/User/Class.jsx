import React, { useEffect, useState } from 'react'
import Template, {
  TemplateTitle, TemplateLineAction, TemplateData,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import SearchBar from '../../components/SearchBar';
import LineAction from '../../components/LineAction';
import ClassBlock from '../../components/ClassBlock';
import MiniPopup from '../../components/MiniPopup';
import { Divider, Grid, Input } from '@mui/material';
import { useFetchAllBlocks } from '../../redux/block/hook';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAssignedCourses, useFetchAllAssignedCourses } from '../../redux/course/hook';
import { findElementById } from '../../utils/uitility';
import notifyMessage from '../../utils/notifyMessage';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import { useDispatch } from 'react-redux';
import blockApi from '../../api/blockAPI';
import { useRole } from '../../redux/user/hook';
const Class = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  useFetchAllAssignedCourses()
  const { courseId } = useParams("courseId")
  const Role = useRole()
  const Blocks = useFetchAllBlocks(courseId)
  const Courses = useAssignedCourses()
  const initialForm = {
    courseId: courseId,
    name: ""
  }

  const [OpenMiniPopupClass, setOpenMiniPopupClass] = useState("")
  const [openBlockModal, setOpenBlockModal] = useState(false)
  const [blocksRows, setBlocksRows] = useState([])
  const [course, setCourse] = useState({})
  const [searchBlocksData, setSearchBlocksData] = useState([])
  const [blockForm, setBlockForm] = useState(initialForm)
  const [mode, setMode] = useState("")


  const { name } = blockForm
  const OpenBlockModal = () => setOpenBlockModal(true)
  const CloseBlockModal = () => setOpenBlockModal(false)
  const onBlockFormChange = (e) => {
    setBlockForm({
      ...blockForm,
      [e.target.name]: e.target.value
    })
  }
  const handleDeleteBlock = async () => {

    if (window.confirm(`Delete this block?`)) {


      let rs = await blockApi.deleteBlock(blockForm.id).catch(data => { return data.response })
      if (await rs.status === 200) {

        dispatch(setSnackbar(notifyMessage.DELETE_SUCCESS("block")))
        let index = blocksRows.findIndex(item => item.id === blockForm.id)
        let tmp = blocksRows
        tmp.splice(index, 1)
        setBlocksRows([...tmp])

        if (searchBlocksData.length > 0)
          setSearchBlocksData([])
      }
      else {
        if (rs.status === 400)
          dispatch(setSnackbar(notifyMessage.DELETE_FAIL("block", "Cannot delete block.")))
        else
          dispatch(setSnackbar(notifyMessage.DELETE_FAIL("block")))

      }
    }
  }

  const handleBlockSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (window.confirm(`Confirm to ${mode === "New" ? "create new" : "update "} block?`)) {
      let rs
      if (mode === "New")
        rs = await blockApi.createBlock(blockForm).catch(data => { return data.response })
      else
        rs = await blockApi.updateBlock(blockForm).catch(data => { return data.response })
      if (await rs.status === 200) {
        if (mode === "New") {
          setBlocksRows([...blocksRows, rs.data])
          dispatch(setSnackbar(notifyMessage.CREATE_SUCCESS("block", "Block added.")))
        }
        else {
          let index = blocksRows.findIndex(item => item.id === rs.data)
          let tmp = blocksRows
          tmp[index] = {
            name: blockForm.name,
            markdownDocument: blockForm.markdownDocument,
            id: blockForm.id
          }
          setBlocksRows([...tmp])
          dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("block")))
        }
        setOpenBlockModal(false)

        if (searchBlocksData.length > 0)
          setSearchBlocksData([])
      }
      else {
        if (mode === "New") {
          if (rs.status === 400)
            dispatch(setSnackbar(notifyMessage.CREATE_FAIL("block", "Cannot create block.")))
          else
            dispatch(setSnackbar(notifyMessage.CREATE_FAIL("block")))
        } else {
          dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("block")))
        }
      }
    }
  }
  useEffect(() => {
    if (Blocks.length > 0 && Blocks !== "false") {
      setBlocksRows([...Blocks])
    }
  }, [Blocks])
  useEffect(() => {
    if (Courses.length > 0) {
      let tmp = findElementById(courseId, Courses)
      setCourse({ ...tmp })
    }
  }, [Courses])
  useEffect(() => {
    if (mode === "New") {
      setBlockForm(initialForm)
    }
  }, [mode])

  return (
    Blocks === "false" ?
      <Navigate to="/courses" />
      :
      <Template>
        <TemplateSearch>
          <SearchBar data={blocksRows} keyword={["name"]} onsearch={(data) => { setSearchBlocksData(data) }} />
        </TemplateSearch>
        <TemplateTitle>
          {`${course.coursecode} - ${course.coursename}`}
        </TemplateTitle>
        {

          Role === "lecturer" ?
            <React.Fragment>
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
                    searchBlocksData.length > 0 ?
                      searchBlocksData.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <Grid item lg={3} >
                              <ClassBlock name={`${item.name}`} clicknav={() => {
                                navigate(item.id)
                              }} click={() => {
                                setOpenMiniPopupClass(item.id)
                                setBlockForm({ ...blockForm, ...item })
                              }} />
                            </Grid>
                          </React.Fragment>

                        )
                      })
                      :
                      blocksRows.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <Grid item lg={3} >
                              <ClassBlock name={`${item.name}`} clicknav={() => {
                                navigate(item.id)
                              }} click={() => {
                                setOpenMiniPopupClass(item.id)
                                setBlockForm({ ...blockForm, ...item })
                              }} />
                            </Grid>
                          </React.Fragment>

                        )
                      }).reverse()
                  }
                </Grid>
                <MiniPopup
                  open={OpenMiniPopupClass}
                  close={() => setOpenMiniPopupClass("")}
                  actions={[
                    {
                      name: "Rename",
                      click: () => {
                        setMode("Update")
                        setOpenBlockModal(true)
                      }
                    },
                    {
                      name: "Delete",
                      click: handleDeleteBlock
                    }
                  ]} />

              </TemplateData>
              <TemplateModal
                open={openBlockModal}
                size="sm"
                form={true}
                onsubmit={handleBlockSubmit}
              >
                <TemplateModalTitle>
                  <p>{mode === "New" ? "Create new block:" : "Rename block:"}</p>
                  <Divider variant="middle" />
                </TemplateModalTitle>
                <TemplateModalBody >
                  <TemplateModalBody >
                    <div className="template-modal-content-field">
                      <div className="template-modal-content-field-content">
                        <div className="template-modal-content-field-content-label" >
                          Enter Block name:
                        </div>
                        <div className="template-modal-content-field-content-input" >
                          <Input required name='name' value={name} onChange={onBlockFormChange} />
                        </div>
                      </div>
                    </div>
                  </TemplateModalBody>
                </TemplateModalBody>
                <TemplateModalAction activeRight={mode === "New" ? "Create" : "Confirm"} funcError={() => {
                  CloseBlockModal()
                }} size="sm" />
              </TemplateModal>
            </React.Fragment>
            :
            <React.Fragment>
              <TemplateData>
                <Grid container spacing={2} direction={"column"}>
                  {
                    searchBlocksData.length > 0 ?
                      searchBlocksData.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <Grid item lg={3} >
                              <ClassBlock name={`${item.name}`} clicknav={() => {
                                navigate(item.id)
                              }} />
                            </Grid>
                          </React.Fragment>

                        )
                      })
                      :
                      blocksRows.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <Grid item lg={3} >
                              <ClassBlock name={`${item.name}`} clicknav={() => {
                                navigate(item.id)
                              }} />
                            </Grid>
                          </React.Fragment>

                        )
                      }).reverse()
                  }
                </Grid>
              </TemplateData>
            </React.Fragment>
        }

      </Template>
  )
}

export default Class