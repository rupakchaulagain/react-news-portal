import React from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CFormGroup,
    CImg,
    CInput,
    CLabel,
    CModal,
    CModalBody,
    CModalHeader,
    CRow
} from "@coreui/react";
import * as axios from "axios";
import Cookies from "universal-cookie";
import {BASE_URL} from "../../../api/Api";

class DetailModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            news: {}
        }
    }

    componentDidMount() {
        const cookies = new Cookies();

        axios.get(BASE_URL+`/posts/${this.props.selectedItem}`,
            {
                headers: {
                    Authorization: cookies.get('token')
                }
            }
        )
            .then(response => {

                this.setState({
                    news: response.data
                })

            })
    }

    modalCancelBtn = () => {

        this.props.selectedItem=null
        this.props.detailModalToggle()
    }

    render() {

        return (
            <>
                <CModal size={'xl'}
                        show={this.props.detailModal}
                        onClose={this.props.detailModalToggle}
                >
                    <CModalHeader closeButton>News Detail</CModalHeader>
                    <CModalBody>

                        <CRow>

                            <CCol xs="12" sm="6">
                                <CCard>
                                    <CCardBody>

                                        <CFormGroup>
                                            <CLabel htmlFor="posttitle">Post Tittle</CLabel>
                                            <CInput name="posttitle"
                                                    value={this.state.news.posttitle} disabled="disabled"/>
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel htmlFor="productCategory">Post Category</CLabel>
                                            <CInput name="postcategory"
                                                    value={this.state.news.postcategory} disabled="disabled"/>
                                        </CFormGroup>

                                        <CFormGroup>
                                            <CLabel htmlFor="postdetails">Post Details</CLabel>
                                            <CInput name="postdetails" value={this.state.news.postdetails}
                                                    disabled="disabled"/>
                                        </CFormGroup>

                                        <CFormGroup>
                                            <CLabel htmlFor="postconclusion">Post Conclusion</CLabel>
                                            <CInput name="postconclusion"
                                                    value={this.state.news.postconclusion} disabled="disabled"/>
                                        </CFormGroup>


                                    </CCardBody>

                                </CCard>
                            </CCol>

                            <CCol xs="12" sm="6">
                                <CCard>
                                    <CCardBody>

                                        <CFormGroup>
                                        <CLabel htmlFor="productCategory">Image</CLabel><br></br>
                                            <CImg
                                                src={BASE_URL+"/PostImage/"+this.state.news.images}
                                                style={{width: 500,height:400}}
                                            />
                                        </CFormGroup>

                                    </CCardBody>

                                </CCard>
                            </CCol>

                        </CRow>

                    </CModalBody>
                </CModal>
            </>
        )
    }

}

export default DetailModal
