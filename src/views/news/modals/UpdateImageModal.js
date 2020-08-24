import React from 'react'
import {CButton, CForm, CFormGroup, CInput, CLabel, CModal, CModalBody, CImg, CModalHeader} from "@coreui/react";
import * as axios from "axios";
import Cookies from "universal-cookie";
import CIcon from "@coreui/icons-react";

class UpdateImageModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: this.props.imageItem,

        }
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

        axios.post(`https://frozen-refuge-74833.herokuapp.com/posts/updateImage/${this.props.imageItem}`, this.state.selectedFile,
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

                this.props.updateImageToggle()

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

        axios.get(`https://frozen-refuge-74833.herokuapp.com/posts/${this.props.imageItem}`,
            {
                headers: {
                    Authorization: cookies.get('token')
                }
            }
        )
            .then(response => {

                let news = response.data
                this.setState({
                    images: news.images,

                })

            })

    }

    render() {

        return (
            <>
                <CModal size={'xl'}
                        show={this.props.updateImageModal}
                        onClose={this.props.updateImageToggle}
                >
                    <CModalHeader closeButton>Update Image</CModalHeader>
                    <CModalBody>

                        <CForm onSubmit={this.handleFormSubmit}>

                            <CFormGroup>
                                <CLabel htmlFor="images">Images</CLabel>

                                <CImg src={"https://frozen-refuge-74833.herokuapp.com/PostImage/" + this.state.images}
                                        alt="image"
                                        style={{width: 500, height: 400}}/>
                                <CInput type="file" name="files" onChange={this.imageUploader}
                                        placeholder="Enter Post Details"/>
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

export default UpdateImageModal
