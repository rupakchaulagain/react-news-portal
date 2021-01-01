import React from 'react'
import {CButton, CCard, CCardBody, CForm, CFormGroup, CInput, CLabel,} from "@coreui/react";
import * as axios from "axios";
import CIcon from "@coreui/icons-react";
import Cookies from "universal-cookie";
import {BASE_URL} from "../../api/Api";

class QuestionsForm extends React.Component {
    constructor(props) {
        super(props);

        console.log(props)

        this.state = {
            questions: "",
            description: "",
            type: "",
            level: "",
            correctAnswer: "",
            options1: "",
            options2: "",
            options3: "",
            options4: "",
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

        let options = [this.state.options1,
            this.state.options2,
            this.state.options3,
            this.state.options4,
        ]

        let requestDTO = {
            questions: this.state.questions,
            description: this.state.description,
            type: this.state.type,
            level: this.state.level,
            correctANswer: this.state.correctAnswer,
            options: options
        }

        const cookies = new Cookies();

        console.log("token===", cookies.get('token'))

        axios.post(BASE_URL + '/Questions/', requestDTO,
            {
                headers: {
                    Authorization: cookies.get('token'),
                },
            })
            .then(response => {

                axios.get(BASE_URL + '/Questions/',
                    {
                        headers: {
                            Authorization: cookies.get('token'),
                        },
                    })
                    .then(response => {

                        console.log(response.data)
                        const data = response.data

                        this.props.updateQuestions(data)
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
                            <CLabel htmlFor="questions">Questions</CLabel>
                            <CInput name="questions" id="questions"
                                    value={this.state.questions}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Questions"
                                    required="required"/>
                        </CFormGroup>

                        <CFormGroup>
                            <CLabel htmlFor="description">Description</CLabel>
                            <CInput name="description" id="description"
                                    value={this.state.description}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Description"
                                    required="required"/>
                        </CFormGroup>

                        <CFormGroup>
                            <CLabel htmlFor="type">Type</CLabel>
                            <CInput id="type" name="type"
                                    value={this.state.type}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Type"/>
                        </CFormGroup>

                        <CFormGroup>
                            <CLabel htmlFor="level">Level</CLabel>
                            <CInput name="level" id="level"
                                    value={this.state.level}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter level"
                                    required="required"/>
                        </CFormGroup>

                        <CFormGroup>
                            <CLabel htmlFor="Correct Answer">Correct Answer</CLabel>
                            <CInput name="correctAnswer" id="correctAnswer"
                                    value={this.state.correctAnswer}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Correct Answer"
                                    required="required"/>
                        </CFormGroup>

                        <CFormGroup>
                            <CLabel htmlFor="option1">Options</CLabel>
                            <CInput name="options1" id="options1"
                                    value={this.state.options1}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Option 1"
                                    required="required"/>
                            <CInput name="options2" id="options2"
                                    value={this.state.options2}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Option 2"
                                    required="required"/>
                            <CInput name="options3" id="options3"
                                    value={this.state.options3}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Option 3"
                                    required="required"/>
                            <CInput name="options4" id="options4"
                                    value={this.state.options4}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Option 4"
                                    required="required"/>
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

export default QuestionsForm
