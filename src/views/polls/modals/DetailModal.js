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
            poll: {}
        }
    }

    componentDidMount() {
        const cookies = new Cookies();

        axios.get(BASE_URL+`/polls/${this.props.selectedItem}`,
            {
                headers: {
                    Authorization: cookies.get('token')
                }
            }
        )
            .then(response => {

                this.setState({
                    poll: response.data
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
                                                    value={this.state.poll.polltitle} disabled="disabled"/>
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
