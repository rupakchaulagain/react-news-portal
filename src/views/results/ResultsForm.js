import React from 'react'
import {CButton, CCard, CCardBody, CForm, CFormGroup, CInput, CLabel,} from "@coreui/react";
import * as axios from "axios";
import CIcon from "@coreui/icons-react";
import Cookies from "universal-cookie";
import {BASE_URL} from "../../api/Api";

class ResultsForm extends React.Component {
    constructor(props) {
        super(props);

        console.log(props)

        this.state = {
            fullname: "",
            age: "",
            gender: "",
            parentName: "",
            images: "",
            selectedFile: ""
        }
    }

    handleInputChange = (e) => {

        const {name, value} = e.target
        this.setState({
            [name]: value
        })

    }


    imageUploader = (e) => {
        e.preventDefault()

        console.log(e.target.files)

        this.setState({
            selectedFile: e.target.files[0],
        })

    }

    handleFormSubmit = (e) => {
        e.preventDefault()

        //
        // let formData = new FormData()
        // formData.append('fullname', this.state.fullname)
        // formData.append('age', this.state.age);
        // formData.append('gender', this.state.gender);
        // formData.append('parentName', this.state.parentName);
        // formData.append('images', this.state.selectedFile)

        let requestDTO = {
            fullname: this.state.fullname,
            age: this.state.age,
            gender: this.state.gender,
            parentName: this.state.parentName,
            images: this.state.images

        }

        const cookies = new Cookies();

        console.log("token===", cookies.get('token'))

        axios.post(BASE_URL + '/Results/', requestDTO,
            {
                headers: {
                    Authorization: cookies.get('token'),
                },
            })
            .then(response => {

                axios.get(BASE_URL + '/Results/',
                    {
                        headers: {
                            Authorization: cookies.get('token'),
                        },
                    })
                    .then(response => {

                        console.log(response.data)
                        const data = response.data

                        this.props.updateResults(data)
                    })

                this.props.manageTabController()

                this.props.showAlert()

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


    render() {
        return (


            <CCard>
                <CCardBody>

                    <CForm onSubmit={this.handleFormSubmit}>
                        <CFormGroup>
                            <CLabel htmlFor="fullname">Full name</CLabel>
                            <CInput name="fullname" id="fullname"
                                    value={this.state.fullname}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Full Name"
                                    required="required"/>
                        </CFormGroup>

                        <CFormGroup>
                            <CLabel htmlFor="age">Age</CLabel>
                            <CInput name="age" id="age"
                                    value={this.state.age}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Age"
                                    required="required"/>
                        </CFormGroup>

                        <CFormGroup>
                            <CLabel htmlFor="gender">Gender</CLabel>
                            <CInput id="gender" name="gender"
                                    value={this.state.gender}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Gender"/>
                        </CFormGroup>

                        <CFormGroup>
                            <CLabel htmlFor="parentName">Parent Name</CLabel>
                            <CInput name="parentName" id="parentName"
                                    value={this.state.parentName}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Parent Name"
                                    required="required"/>
                        </CFormGroup>

                        <CFormGroup>
                            <CLabel htmlFor="images">Images</CLabel>
                            <CInput type="file" name="file" onChange={this.imageUploader}
                                    placeholder="Enter Post Details"/>
                        </CFormGroup>

                        <CFormGroup>
                            <CButton type="submit" size="sm" color="primary"><CIcon
                                name="cil-scrubber"/> Submit</CButton>
                        </CFormGroup>

                    </CForm>
                </CCardBody>

            </CCard>


        )
    }
}

export default ResultsForm
