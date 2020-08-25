import React from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CFormGroup,
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
            user: {}
        }
    }

    componentWillMount() {
        const cookies = new Cookies();

        axios.get(BASE_URL+`/users/me`,
            {
                headers: {
                    Authorization: cookies.get('token')
                }
            }
        )
            .then(response => {

                this.setState({
                    user: response.data
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
                                            <CLabel htmlFor="posttitle">Email</CLabel>
                                            <CInput name="posttitle"
                                                    value={this.state.user.email} disabled="disabled"/>
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel htmlFor="productCategory">Username</CLabel>
                                            <CInput name="postcategory"
                                                    value={this.state.user.username} disabled="disabled"/>
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
