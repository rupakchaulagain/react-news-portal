import React from 'react'
import Cookies from 'universal-cookie';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as axios from "axios";
import {BASE_URL} from "../../api/Api";

class Login extends React.Component {

    loginmethod = (e) => {
        e.preventDefault()

        console.log(this.state.username)
        console.log(this.state.password)

        let user = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post(BASE_URL + '/users/login', user)
            .then(function (response) {
                console.log(response);

                if (response.data.code === 200) {
                    const cookies = new Cookies();

                    console.log(response.data.token)
                    cookies.set('token', 'Bearer ' + response.data.token, {path: '/',});
                    console.log(cookies.get('token'));


                    window.location.replace('/home/')

                } else {
                    alert("Authentication Failed");
                }
            }).catch(function (error) {
            alert("Authentication Failed");

            console.log(error);
        });


    }


    handleInputChange = (e) => {

        const {name, value} = e.target
        this.setState({
            [name]: value
        })

    }


    render() {
        return (
            <div className="c-app c-default-layout flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md="8">
                            <CCardGroup>
                                <CCard className="p-4">
                                    <CCardBody>
                                        <CForm onSubmit={this.loginmethod}>
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupPrepend>
                                                    <CInputGroupText>
                                                        <CIcon name="cil-user"/>
                                                    </CInputGroupText>
                                                </CInputGroupPrepend>
                                                <CInput type="text"
                                                        name="username"
                                                        onChange={this.handleInputChange}
                                                        placeholder="Username"
                                                        autoComplete="username"/>
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupPrepend>
                                                    <CInputGroupText>
                                                        <CIcon name="cil-lock-locked"/>
                                                    </CInputGroupText>
                                                </CInputGroupPrepend>
                                                <CInput type="password"
                                                        name="password"
                                                        onChange={this.handleInputChange}
                                                        placeholder="Password"
                                                        autoComplete="current-password"/>
                                            </CInputGroup>
                                            <CRow>
                                                <CCol xs="6">
                                                    <CButton type="submit" color="primary"
                                                             className="px-4">Login</CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>

                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        )
    }
}

export default Login
