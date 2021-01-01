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
            results: {}
        }
    }

    componentDidMount() {
        const cookies = new Cookies();

        axios.get(BASE_URL+`/Results/${this.props.selectedItem}`,
            {
                headers: {
                    Authorization: cookies.get('token')
                }
            }
        )
            .then(response => {

                this.setState({
                    results: response.data
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
                                            <CLabel htmlFor="userId">User ID</CLabel>
                                            <CInput name="userId"
                                                    value={this.state.results.userId} disabled="disabled"/>
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel htmlFor="totalQuestionAttempt">Total Question Attempt</CLabel>
                                            <CInput name="totalQuestionAttempt"
                                                    value={this.state.results.totalQuestionAttempt} disabled="disabled"/>
                                        </CFormGroup>

                                        <CFormGroup>
                                            <CLabel htmlFor="totalright">Total Right</CLabel>
                                            <CInput name="totalright" value={this.state.results.totalright}
                                                    disabled="disabled"/>
                                        </CFormGroup>

                                        <CFormGroup>
                                            <CLabel htmlFor="level">Level</CLabel>
                                            <CInput name="level"
                                                    value={this.state.results.level} disabled="disabled"/>
                                        </CFormGroup>

                                        <CFormGroup>
                                            <CLabel htmlFor="status">Status</CLabel>
                                            <CInput name="status"
                                                    value={this.state.results.status} disabled="disabled"/>
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
