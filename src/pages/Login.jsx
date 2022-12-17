import React from 'react'
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import MyButton from '../components/MyButton';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/user/userSlice';
import MyBackdrop from '../components/MyBackdrop';
import { setLoading } from '../redux/user/loginLoadingSlice';
import { useNavigate } from 'react-router-dom';
import { useFetchUser } from '../redux/user/hook';
const Login = () => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const userState = useSelector(state => state.userState)
    const initialForm = {
        username: "",
        rawPassword: ""
    }
    const [loginForm, setLoginForm] = useState(initialForm)
    const [alert, setAlert] = useState(null)
    const { username, rawPassword } = loginForm
    const onChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (event) => {

        event.preventDefault();
        event.stopPropagation();
        dispatch(login(loginForm))

    }
    useEffect(() => {

        if (userState.loading === false) {
            dispatch(setLoading(false))
            if (userState.err && userState.err !== "") {
                setAlert(<Alert severity="error">{userState.err}!</Alert>)
            }
            else if (userState.user) {
                navigate('/')
            }
        }
        else
            dispatch(setLoading(true))
    }, [userState]);
    useEffect(() => {
        let timer1 = setTimeout(() => {
            setAlert(null)
        }, 2000)
        return () => {
            clearTimeout(timer1)
        }
    }, [alert])
    return (
        <div className='login'>
            <div className='login-form'>
                <div className="login-form-header">
                    <div className="login-form-header-logo">
                        <img src="https://www.creativefabrica.com/wp-content/uploads/2021/10/23/Cute-Blink-Penguin-Face-Illustration-Graphics-19152654-1.jpg" alt="Pegiun Logo" />
                    </div>
                    <div className="login-form-header-title">
                        Pearn
                    </div>
                </div>
                <div className='login-form-body'>
                    <Box component="form" onSubmit={handleSubmit} sx={{ height: '100%' }} >
                        <TextField
                            inputProps={{ className: "textField" }}
                            InputLabelProps={{ className: "textField" }}
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            type="text"
                            autoFocus
                            value={username}
                            onChange={onChange}

                        // error
                        />
                        <TextField

                            inputProps={{ className: "textField" }}
                            InputLabelProps={{ className: "textField" }}
                            margin="normal"
                            required
                            fullWidth
                            label="Password:"
                            name="rawPassword"
                            type="password"
                            value={rawPassword}
                            onChange={onChange}
                        // error
                        />
                        {alert}
                        <div className='Line'></div>
                        <div>
                            <MyButton type="submit" fullWidth >Login</MyButton>
                        </div>
                    </Box>
                </div>
            </div>
            <MyBackdrop />
        </div>
    )
}

export default Login