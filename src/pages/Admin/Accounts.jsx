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
import notifyMessage from '../../utils/notifyMessage';
import { parseToISOSDate, parseToLocalDate, today } from '../../utils/parseDate';
import { useUsers, useFetchAllUsers } from '../../redux/user/hook';
import variable from "../../utils/variable"
import MiniPopup from '../../components/MiniPopup';
import { addUsers, deleteUsers } from '../../redux/user/allUsersSlice';
const Accounts = () => {
  useFetchAllUsers()
  let dispatch = useDispatch()
  const Users = useUsers()
  const initialUserForm = {
    username: "",
    password: "",
    email: "",
    fullName: "",
    role: "student",
    repassword: "",
    dateOfBirth: today()
  }
  const [userForm, setUserForm] = useState(initialUserForm)
  const { username, password, email, fullName, role, repassword, dateOfBirth } = userForm
  const [openNewAccountModal, setopenNewAccountModal] = useState(false)
  const [alert, setAlert] = useState(null)
  const [rows, setRows] = useState([])
  const [OpenMiniPopupAccounts, setOpenMiniPopupAccounts] = useState(false)
  const [selectID, setSelectID] = useState("")
  const [searchData, setSearchData] = useState([])
  const headers = variable([
    "Id",
    "Username",
    "Full Name",
    "Email",
    "Role",
    "Option"
  ])
  const closeAlert = () => setAlert(null)
  const onChange = (e) => {
    if (e.target.name === "dateOfBirth")
      setUserForm({
        ...userForm,
        [e.target.name]: parseToISOSDate(e.target.value)
      })
    else {
      setUserForm({
        ...userForm,
        [e.target.name]: e.target.value
      })
    }
  }

  const onCreateAccountSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!(password === repassword))
      setAlert(<MyAlert type={"error"} message="Re-Password differ to Password!" close={() => { closeAlert() }} />)
    else {

      if (window.confirm("Create user account?")) {
        let rs = await userApi.register(userForm).catch(data => { return data.response })
        if (await rs.status === 200) {
          console.log(rs.data);
          dispatch(setSnackbar(notifyMessage.CREATE_SUCCESS("user")))
          dispatch(addUsers({
            ...userForm,
            id: rs.data
          }))
          setUserForm(initialUserForm)
          setopenNewAccountModal(false)
        }
        else {
          dispatch(setSnackbar(notifyMessage.CREATE_FAIL("user")))
        }
      }
    }
  }

  const deleteAccount = async () => {

    if (window.confirm("Delete user ?")) {
      let rs = await userApi.deleteUser(selectID).catch(data => { return data.response })
      if (await rs.status === 200) {
        if (searchData.length > 0)
          setSearchData([])
        dispatch(deleteUsers(selectID))
        dispatch(setSnackbar(notifyMessage.DELETE_SUCCESS("user")))

      }
      else {
        dispatch(setSnackbar(notifyMessage.DELETE_FAIL("user")))
      }
    }
  }
  useEffect(() => {
    setUserForm(initialUserForm)
  }, [])
  useEffect(() => {
    let tmp = Users.filter(item => item.role !== "admin")

    tmp = tmp.map((item, index) => {
      return {
        ...item,
        'no.': index + 1,
        option: {
          type: "option",
          click: (id) => {
            setOpenMiniPopupAccounts(true)
            setSelectID(id)
          }
        }
      }
    })
    setRows([...tmp])
  }, [Users])
  return (
    <Template>
      <TemplateSearch>
        <SearchBar data={rows} keyword={["fullName", "username"]} onsearch={(data) => { setSearchData(data) }} />
      </TemplateSearch>
      <TemplateLineAction>
        <LineAction
          name={"Create an account"}
          click={() => setopenNewAccountModal(true)}
        />
      </TemplateLineAction>
      <TemplateData>
        <MyDataGrid ColumnHeader={headers} Data={searchData.length > 0 ? searchData : rows} />
        <MiniPopup
          open={OpenMiniPopupAccounts}
          close={() => setOpenMiniPopupAccounts(false)}
          actions={[
            {
              name: "Delete account",
              click: () => { deleteAccount() }
            }
          ]} />

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
                <Input type='date' name="dateOfBirth" value={parseToLocalDate(dateOfBirth)} onChange={onChange} />
              </div>
            </div>

            <div className="template-modal-content-field-content">
              <div className="template-modal-content-field-content-label" >
                Email:
              </div>
              <div className="template-modal-content-field-content-input" >
                <Input type='email' required name="email" value={email} onChange={onChange} />
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
          activeRight={"Create"}
          size="sm"
          funcError={() => { setopenNewAccountModal(false) }}
        />
      </TemplateModal>
    </Template >
  )
}

export default Accounts