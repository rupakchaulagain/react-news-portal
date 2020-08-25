import React from 'react'
import {CButton, CCard, CCardBody, CForm, CFormGroup, CInput, CLabel,} from "@coreui/react";
import * as axios from "axios";
import CIcon from "@coreui/icons-react";
import Cookies from "universal-cookie";
import {BASE_URL} from "../../api/Api";

class PollForm extends React.Component {
    constructor(props) {
        super(props);

        console.log(props)

        this.state = {
            polltitle: ""
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

        let polls = {
            polltitle: this.state.polltitle
        }

        axios.post(BASE_URL+'/polls/', polls,
            {
                headers: {
                    Authorization: cookies.get('token'),
                },
            })
            .then(response => {

                axios.get(BASE_URL+'/polls/',
                    {
                        headers: {
                            Authorization: cookies.get('token'),
                        },
                    })
                    .then(response => {

                        console.log(response.data)
                        const data = response.data

                        this.props.updatePoll(data)

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
                            <CLabel htmlFor="polltitle">Post tittle</CLabel>
                            <CInput name="polltitle" id="polltitle"
                                    value={this.state.polltitle}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Post Tittle"
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

export default PollForm
