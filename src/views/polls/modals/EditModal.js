import React from 'react'
import {CButton, CForm, CFormGroup, CInput, CLabel, CModal, CModalBody, CModalHeader} from "@coreui/react";
import * as axios from "axios";
import Cookies from "universal-cookie";
import CIcon from "@coreui/icons-react";

class EditModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            news: {},
            _id: this.props.editItem,
            polltitle: "",
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
            polltitle: this.state.polltitle,
        }


        axios.put(`https://frozen-refuge-74833.herokuapp.com/polls/${this.state._id}`, polls,
            {
                headers: {
                    Authorization: cookies.get('token'),
                },
            })
            .then(response => {

                axios.get('https://frozen-refuge-74833.herokuapp.com/polls/',
                    {
                        headers: {

                            Authorization: cookies.get('token')
                        }
                    }
                )
                    .then(response => {

                        console.log(response.data)
                        const data = response.data

                        this.props.updatePoll(data)

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

        axios.get(`https://frozen-refuge-74833.herokuapp.com/polls/${this.props.editItem}`,
            {
                headers: {
                    Authorization: cookies.get('token')
                }
            }
        )
            .then(response => {

                let poll = response.data
                this.setState({
                    polltitle: poll.polltitle
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
                    <CModalHeader closeButton>Polls Detail</CModalHeader>
                    <CModalBody>

                        <CForm onSubmit={this.handleFormSubmit}>
                            <CFormGroup>

                                <CLabel htmlFor="posttitle">Poll tittle</CLabel>
                                <CInput name="polltitle" id="polltitle"
                                        value={this.state.polltitle}
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
