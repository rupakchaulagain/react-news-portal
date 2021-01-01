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
            kids: {}
        }
    }

    componentDidMount() {
        const cookies = new Cookies();

        axios.get(BASE_URL + `/kids/${this.props.selectedItem}`,
            {
                headers: {
                    Authorization: cookies.get('token')
                }
            }
        )
            .then(response => {

                this.setState({
                    kids: response.data
                })

            })
    }

    modalCancelBtn = () => {

        this.props.selectedItem = null
        this.props.detailModalToggle()
    }

    render() {

        return (
            <>
                <CModal size={'xl'}
                        show={this.props.detailModal}
                        onClose={this.props.detailModalToggle}>
                    <CModalHeader closeButton>Kids Detail</CModalHeader>
                    <CModalBody>

                        <CRow>

                            <CCol xs="12" sm="6">
                                <CCard>
                                    <CCardBody>

                                        <CFormGroup>
                                            <CLabel htmlFor="fullname">Full Name</CLabel>
                                            <CInput name="fullname"
                                                    value={this.state.kids.fullname} disabled="disabled"/>
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel htmlFor="age">Age</CLabel>
                                            <CInput name="age"
                                                    value={this.state.kids.age} disabled="disabled"/>
                                        </CFormGroup>

                                        <CFormGroup>
                                            <CLabel htmlFor="gender">Gender</CLabel>
                                            <CInput name="gender" value={this.state.kids.gender}
                                                    disabled="disabled"/>
                                        </CFormGroup>

                                        <CFormGroup>
                                            <CLabel htmlFor="parentName">Parent Name</CLabel>
                                            <CInput name="parentName"
                                                    value={this.state.kids.parentName} disabled="disabled"/>
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
                                                src={BASE_URL + "/PostImage/" + this.state.kids.images}
                                                style={{width: 500, height: 400}}
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
