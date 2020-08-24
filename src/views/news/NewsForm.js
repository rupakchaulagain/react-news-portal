import React from 'react'
import {CButton, CCard, CCardBody, CForm, CFormGroup, CInput, CLabel, CTextarea,} from "@coreui/react";
import * as axios from "axios";
import CIcon from "@coreui/icons-react";
import Cookies from "universal-cookie";

class NewsForm extends React.Component {
    constructor(props) {
        super(props);

        console.log(props)

        this.state = {
            posttitle: "",
            postcategory: "",
            postdetails: "",
            postconclusion: "",
            uploading: false,
            selectedFile: null,
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

        const cookies = new Cookies();

        let formData = new FormData()
        formData.append('images', this.state.selectedFile)
        formData.append('posttitle', this.state.posttitle);
        formData.append('postcategory', this.state.postcategory);
        formData.append('postdetails', this.state.postdetails);
        formData.append('postconclusion', this.state.postconclusion)


        axios.post('https://frozen-refuge-74833.herokuapp.com/posts/',
            formData,
            {
                headers: {
                    Authorization: cookies.get('token'),
                }
            })
            .then(response => {

                axios.get('https://frozen-refuge-74833.herokuapp.com/usersnews/')
                    .then(response => {

                        console.log(response.data)
                        const data = response.data

                        this.props.updateNews(data)

                        console.log("o/p" + this.state.newsList)
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

export default NewsForm
