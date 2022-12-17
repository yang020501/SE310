import React, { useState } from 'react'
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TemplateModal, TemplateModalBody, TemplateModalAction } from '../../components/Template';
import { Avatar } from '@mui/material';
import TextField from '@mui/material/TextField';
import MyButton from '../../components/MyButton';
import { useRef } from 'react';
import { useFetchUser, useUserState } from '../../redux/user/hook';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { Box } from '@mui/system';
import { updateUserValue } from '../../redux/user/userSlice';
import userApi from '../../api/userAPI';
import { setSnackbar } from '../../redux/snackbar/snackbarSlice';
import notifyMessage from '../../utils/NotifyMessage';
import MyAlert from '../../components/MyAlert';
import { parseToISOSDate, parseToLocalDate, today } from '../../utils/parseDate';

const Profile = () => {

    useFetchUser()
    let dispatch = useDispatch()
    const userState = useUserState()
    const pictureRef = useRef(null)
    const initialPasswordForm = {
        username: userState.value.username ? userState.value.username : "",
        oldPassword: "",
        newPassword: "",
        renewPassword: ""
    }
    const initialUserForm = {
        fullName: "",
        email: "",
        dateOfBirth: ""
    }
    const [userForm, setUserForm] = useState(initialUserForm)
    const [passwordForm, setPasswordForm] = useState(initialPasswordForm)
    const [open, setOpen] = useState(false)
    const [alert, setAlert] = useState(null)
    const { fullName, email, dateOfBirth } = userForm
    const { oldPassword, newPassword, renewPassword } = passwordForm
    const uploadPicture = () => pictureRef.current.click()
    const onAvatarChange = (e) => {
        var file = e.target.files
        if (FileReader && file && file.length) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('avatar').childNodes[0].src = fr.result;
                setUserForm({
                    ...userForm,
                    'avatar': fr.result
                })
            }
            fr.readAsDataURL(file[0]);
        }

    }
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
    const onPasswordFormChange = (e) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value
        })
    }

    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)
    const checkPasswordChange = () => {
        return oldPassword === newPassword ? 1 : newPassword === renewPassword ? 0 : 2
    }
    const handleSubmitChangePassword = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        let rs = checkPasswordChange()

        if (rs === 1)
            setAlert(<MyAlert type={"error"} message="New password can't be the same with current password!" close={() => { setAlert(null) }} />)
        else if (rs === 2)
            setAlert(<MyAlert type={"error"} message="Re-New Password differ to New Password!" close={() => { setAlert(null) }} />)
        else {
            if (window.confirm("Change your password?")) {
                let rs = await userApi.changePasswordUser(passwordForm).catch(data => { return data.response })
                if (await rs.status === 200) {
                    setOpen(false)
                    dispatch(updateUserValue(rs.data))
                    dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("password")))

                }
                else {
                    if (rs.status = 400)
                        dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("password", "Current password is incorrect.")))
                    else
                        dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("password", "Try again")))
                }
            }
        }
    }

    const handleUpdate = async (event) => {
        event.preventDefault()
        event.stopPropagation()

        if (window.confirm("Update user profile?")) {
            let rs = await userApi.updateUser(userForm).catch(data => { return data.response })
            if (await rs.status === 200) {
                dispatch(updateUserValue(rs.data))
                dispatch(setSnackbar(notifyMessage.UPDATE_SUCCESS("user")))
                closeModal()
            }
            else {
                dispatch(setSnackbar(notifyMessage.UPDATE_FAIL("user")))
            }
        }
    }
    useEffect(() => {

        if (Object.keys(userState.value).length) {
            setPasswordForm({ ...passwordForm, username: userState.value.username })
            setUserForm({ ...userState.value })
        }
    }, [userState])
    useEffect(() => {
        setPasswordForm({ ...initialPasswordForm })
    }, [open])

    return (

        <div className='profile'>
            <div className="profile-item">
                <div className='image-container'>
                    <div className="hover" onClick={uploadPicture}>
                        <div className="hover-content ">
                            <CloudUploadIcon />
                            <input type="file" ref={pictureRef} onChange={(e) => { onAvatarChange(e) }} />
                        </div>
                    </div>
                    <div className='image'>
                        <Avatar id="avatar" alt="Avatar" variant='rounded' src={userForm.avatar} />
                    </div>
                </div>
                <div className='role'>
                    {userState.user ? userState.user.role.toUpperCase() : "Role"}
                </div>
            </div>

            <Divider sx={{ height: '100%', m: 0.5, borderRightWidth: 2 }} orientation="vertical" />

            <div className="profile-item">
                <div className="profile-item-right">
                    <Box component={"form"} onSubmit={handleUpdate}>
                        <div className="profile-item-right-fields">
                            <div className="profile-item-right-fields-block">
                                <div className='label'>Full name:</div>
                                <TextField className='input' fullWidth size='small' name='fullName' value={fullName} onChange={onChange} required />
                                <Divider sx={{ height: '1px', width: '100%', borderBottomWidth: '2px' }} orientation="horizontal" />
                            </div>
                            <div className="profile-item-right-fields-block btnPassword">
                                <div className='label'>Password:</div>
                                <div className="descriptions">If you lost your password, contact the administrator for help</div>
                                <div className="btnPass">
                                    <MyButton type="button" onclick={openModal} >Change Password</MyButton>
                                </div>
                                <Divider sx={{ height: '1px', width: '100%', borderBottomWidth: '2px' }} orientation="horizontal" />
                            </div>
                            <div className="profile-item-right-fields-block">
                                <div className='label'>Day of birth:</div>
                                <TextField className='input' type="date" fullWidth size='small' name='dateOfBirth' value={dateOfBirth ? parseToLocalDate(dateOfBirth) : ""} onChange={onChange} />
                                <Divider sx={{ height: '1px', width: '100%', borderBottomWidth: '2px' }} orientation="horizontal" />
                            </div>
                            <div className="profile-item-right-fields-block">
                                <div className='label'>Email:</div>
                                <TextField className='input' type="email" fullWidth size='small' name='email' value={email} onChange={onChange} required />
                                <Divider sx={{ height: '1px', width: '100%', borderBottomWidth: '2px' }} orientation="horizontal" />
                            </div>

                        </div>
                        <div className="profile-item-right-btn">
                            <MyButton type="submit">Update</MyButton>
                        </div>
                    </Box>
                </div>
            </div>


            <TemplateModal
                open={open}
                size="sm"
                form={true}
                onsubmit={handleSubmitChangePassword}
            >
                <TemplateModalBody>
                    <div className="profile-item-right-fields-block">
                        <div className='label'>Current password:</div>
                        <TextField required className='input' type="password" fullWidth size='small' placeholder='password' name='oldPassword' value={oldPassword} onChange={onPasswordFormChange} />

                    </div>
                    <div className="profile-item-right-fields-block">
                        <div className='label'>New password:</div>
                        <TextField required className='input' type="password" fullWidth size='small' placeholder='new password' name='newPassword' value={newPassword} onChange={onPasswordFormChange} />

                    </div>
                    <div className="profile-item-right-fields-block">
                        <div className='label'>Re-New password:</div>
                        <TextField required className='input' type="password" fullWidth size='small' placeholder='re-new password' name='renewPassword' value={renewPassword} onChange={onPasswordFormChange} />
                    </div>
                    {alert}
                </TemplateModalBody>
                <TemplateModalAction
                    funcError={closeModal}
                    size="sm"
                />
            </TemplateModal>
        </div>

    )
}

Profile.propTypes = {}

export default Profile