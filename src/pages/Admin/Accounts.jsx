import React, { useEffect, useState } from 'react'
import Template, {
  TemplateTitle, TemplateLineAction, TemplateData,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import MyDataGrid from '../../components/MyDataGrid'
import SearchBar from '../../components/SearchBar';
import LineAction from '../../components/LineAction';
import { Divider, Input } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import MyAlert from '../../components/MyAlert';
import userApi from '../../api/userAPI';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import notifyMessage from '../../utils/NotifyMessage';
const Accounts = () => {
  let dispatch = useDispatch()
  const initialUserForm = {
    username: "",
    password: "",
    email: "",
    fullName: "",
    role: "student",
    repassword: ""
  }
  const [userForm, setUserForm] = useState(initialUserForm)
  const { username, password, email, fullName, role, repassword } = userForm
  const [openNewAccountModal, setopenNewAccountModal] = useState(false)
  const [alert, setAlert] = useState(null)

  const closeAlert = () => setAlert(null)
  const onChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }
  const checkPasswordChange = () => {
    return password === repassword ? 1 : 0
  }
  const onCreateAccountSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!checkPasswordChange())
      setAlert(<MyAlert type={"error"} message="Re-Password differ to Password!" close={() => { closeAlert() }} />)
    else {

      if (window.confirm("Create user account?")) {
        let rs = await userApi.register(userForm).catch(data => { return data.response })
        if (await rs.status === 200) {
          dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("user")))
          setUserForm(initialUserForm)
          setopenNewAccountModal(false)
        }
        else {
          dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("user")))
        }
      }
    }
  }
  useEffect(() => {
    setUserForm(initialUserForm)
  }, [])
  return (
    <Template>
      <TemplateSearch>
        <SearchBar />
      </TemplateSearch>
      <TemplateLineAction>
        <LineAction
          name={"Create an account"}
          click={() => setopenNewAccountModal(true)}
        />
      </TemplateLineAction>
      <TemplateData>
        <MyDataGrid />
      </TemplateData>
      <TemplateModal
        open={openNewAccountModal}
        size="sm"
        form={true}
        onsubmit={onCreateAccountSubmit}
      >
        <TemplateModalTitle>
          <p> Create new account:</p>
          <Divider variant="middle" />
        </TemplateModalTitle>
        <TemplateModalBody>
          <div className="template-modal-content-field">
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Username:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='text' required name="username" value={username} onChange={onChange} />
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Full Name:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='text' required name="fullName" value={fullName} onChange={onChange} />
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Date of birth:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='date' />
              </div>
            </div>

            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Email:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='mail' required name="email" value={email} onChange={onChange} />
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Password:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='password' required name="password" value={password} onChange={onChange} />
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Re-Password:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='password' required name="repassword" value={repassword} onChange={onChange} />
              </div>
            </div>
            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Role:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Select
                  labelId="demo-simple-select-label"
                  name="role"
                  value={role}
                  onChange={onChange}
                  required
                >
                  <MenuItem value={"student"}>student</MenuItem>
                  <MenuItem value={"lecturer"}>lecturer</MenuItem>
                  <MenuItem value={"mod"}>mod</MenuItem>
                </Select>

              </div>
            </div>
            {alert}
          </div>
        </TemplateModalBody>
        <TemplateModalAction
          size="sm"
          funcError={() => { setopenNewAccountModal(false) }}
        />
      </TemplateModal>
    </Template >
  )
}

export default Accounts