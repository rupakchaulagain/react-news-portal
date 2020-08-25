import React from 'react'
import {CButton, CForm, CFormGroup, CInput, CLabel, CModal, CModalBody, CModalHeader} from "@coreui/react";
import * as axios from "axios";
import Cookies from "universal-cookie";
import CIcon from "@coreui/icons-react";
import {BASE_URL} from "../../../api/Api";

class EditModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            _id: this.props.editItem,
            email: "",
            password: ""
        }
    }

    handleInputChange = (e) => {

        const {name, value} = e.target
        this.setState({
            [name]: value
        })

    }

    handleFormSubmit = (e) => {
        e.preventDefault()

        const cookies = new Cookies();

        let user = {
            email: this.state.email,
            password: this.state.password
        }


        axios.put(BASE_URL+`/users/me`, user,
            {
                headers: {
                    Authorization: cookies.get('token'),
                },
            })
            .then(response => {

                axios.get(BASE_URL+'/users/me',
                    {
                        headers: {

                            Authorization: cookies.get('token')
                        }
                    }
                )
                    .then(response => {

                        console.log(response.data)
                        const data = response.data
                        let list=[]
                        list.push(data)

                        this.props.updateUser(list)

                    })

                this.props.editModalToggle()

            })
            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response);
                }

                // throw new Error('Sorry Internal Server Error')
                this.showError(error.response)
            })

    }

    componentDidMount() {
        const cookies = new Cookies();

        axios.get(BASE_URL+`/users/me`,
            {
                headers: {
                    Authorization: cookies.get('token')
                }
            }
        )
            .then(response => {

                let user = response.data
                this.setState({
                    email: user.email,
                    password: user.password
                })

            })

    }

    render() {

        return (
            <>
                <CModal size={'xl'}
                        show={this.props.editModal}
                        onClose={this.props.editModalToggle}
                >
                    <CModalHeader closeButton>News Detail</CModalHeader>
                    <CModalBody>

                        <CForm onSubmit={this.handleFormSubmit}>
                            <CFormGroup>

                                <CLabel htmlFor="email">Email</CLabel>
                                <CInput name="email" id="email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        required="required"/>
                            </CFormGroup>

                            <CFormGroup>
                                <CLabel htmlFor="postcategory">Password</CLabel>
                                <CInput name="password" id="password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                        required="required"/>
                            </CFormGroup>

                            <CFormGroup>
                                <CButton type="submit" size="sm" color="primary"><CIcon
                                    name="cil-scrubber"/> Submit</CButton>
                            </CFormGroup>

                        </CForm>

                    </CModalBody>
                </CModal>
            </>
        )
    }

}

export default EditModal
