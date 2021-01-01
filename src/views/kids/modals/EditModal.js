import React from 'react'
import {CButton, CForm, CFormGroup, CInput, CLabel, CModal, CModalBody, CModalHeader, CTextarea} from "@coreui/react";
import * as axios from "axios";
import Cookies from "universal-cookie";
import CIcon from "@coreui/icons-react";
import {BASE_URL} from "../../../api/Api";

class EditModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            news: {},
            _id: this.props.editItem,
            posttitle: "",
            postcategory: "",
            postdetails: "",
            postconclusion: ""
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


        let news = {
            posttitle: this.state.posttitle,
            postcategory: this.state.postcategory,
            postdetails: this.state.postdetails,
            postconclusion: this.state.postconclusion,
        }

        axios.put(BASE_URL+`/posts/${this.state._id}`, news,
            {
                headers: {
                    Authorization: cookies.get('token'),
                },
            })
            .then(response => {

                axios.get('https://frozen-refuge-74833.herokuapp.com/posts/',
                    {
                        headers: {

                            Authorization: cookies.get('token')
                        }
                    }
                )
                    .then(response => {

                        console.log(response.data)
                        const data = response.data

                        this.props.updateNews(data)

                        console.log("o/p" + this.state.newsList)
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

        axios.get(`https://frozen-refuge-74833.herokuapp.com/posts/${this.props.editItem}`,
            {
                headers: {
                    Authorization: cookies.get('token')
                }
            }
        )
            .then(response => {

                let news = response.data
                this.setState({
                    posttitle: news.posttitle,
                    postcategory: news.postcategory,
                    postdetails: news.postdetails,
                    postconclusion: news.postconclusion,
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

                                <CLabel htmlFor="posttitle">Post tittle</CLabel>
                                <CInput name="posttitle" id="posttitle"
                                        value={this.state.posttitle}
                                        onChange={this.handleInputChange}
                                        placeholder="Enter Post Tittle"
                                        required="required"/>
                            </CFormGroup>

                            <CFormGroup>
                                <CLabel htmlFor="postcategory">Post Category</CLabel>
                                <CInput name="postcategory" id="postcategory"
                                        value={this.state.postcategory}
                                        onChange={this.handleInputChange}
                                        placeholder="Enter Post Category"
                                        required="required"/>
                            </CFormGroup>

                            <CFormGroup>
                                <CLabel htmlFor="postdetails">Post Details</CLabel>
                                <CInput id="postdetails" name="postdetails"
                                        value={this.state.postdetails}
                                        onChange={this.handleInputChange}
                                        placeholder="Enter Post Details"/>
                            </CFormGroup>

                            <CFormGroup>
                                <CLabel htmlFor="postconclusion">Post Conclusion</CLabel>
                                <CTextarea name="postconclusion" id="postconclusion"
                                           value={this.state.postconclusion}
                                           onChange={this.handleInputChange}
                                           placeholder="Enter Post Conclusion"
                                           required="required"/>
                            </CFormGroup>

                            <CFormGroup>
                                <CButton type="submit" size="sm" color="primary"><CIcon
                                    name="cil-scrubber"/> Submit</CButton>
                                <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban"/> Reset</CButton>
                            </CFormGroup>

                        </CForm>

                    </CModalBody>
                </CModal>
            </>
        )
    }

}

export default EditModal
