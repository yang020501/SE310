import React from 'react'
import PropTypes from 'prop-types'
import Divider from '@mui/material/Divider';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Template, {
    TemplateTitle, TemplateLineAction, TemplateDataGrid,
    TemplateSearch, TemplateModal, TemplateModalTitle,
    TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import { Avatar } from '@mui/material';
import TextField from '@mui/material/TextField';
import MyButton from '../../components/MyButton';

const Profile = props => {
    return (

        <div className='profile'>
            <div className="profile-item">

                <div className='image-container'>
                    <div class="hover">
                        <div class="hover-content ">
                            <CloudUploadIcon />
                        </div>
                    </div>
                    <div className='image'>
                        <Avatar alt="Avatar" variant='rounded' src={require('../../asset/pictures/avatar.jpg')} />

                    </div>
                </div>

                <div className='role'>
                    Moderator
                </div>
            </div>

            <Divider sx={{ height: '100%', m: 0.5, borderRightWidth: 2 }} orientation="vertical" />

            <div className="profile-item">
                <div className="profile-item-right">
                    <div className="profile-item-right-fields">
                        <div className="profile-item-right-fields-block">
                            <div className='label'>Full name:</div>
                            <TextField className='input' fullWidth size='small' placeholder='name' name='name' />
                            <Divider sx={{ height: '1px', width: '100%', borderBottomWidth: '2px' }} orientation="horizontal" />
                        </div>
                        <div className="profile-item-right-fields-block btnPassword">
                            <div className='label'>Password:</div>
                            <div className="descriptions">If you lost your password, contact the administrator for help</div>
                            <div className="btnPass">
                                <MyButton >Change Password</MyButton>
                            </div>
                            <Divider sx={{ height: '1px', width: '100%', borderBottomWidth: '2px' }} orientation="horizontal" />
                        </div>
                        <div className="profile-item-right-fields-block">
                            <div className='label'>Day of birth:</div>
                            <TextField className='input' type="datetime-local" fullWidth size='small' placeholder='name' name='date' />
                            <Divider sx={{ height: '1px', width: '100%', borderBottomWidth: '2px' }} orientation="horizontal" />
                        </div>
                        <div className="profile-item-right-fields-block">
                            <div className='label'>Email:</div>
                            <TextField className='input' type="email" fullWidth size='small' placeholder='name' name='mail'  />
                            <Divider sx={{ height: '1px', width: '100%', borderBottomWidth: '2px' }} orientation="horizontal" />
                        </div>
                    </div>
                    <div className="profile-item-right-btn">
                        <MyButton>Update</MyButton>
                    </div>
                </div>
            </div>
        </div>

    )
}

Profile.propTypes = {}

export default Profile