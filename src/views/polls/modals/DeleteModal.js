import React from 'react'
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader} from "@coreui/react";
import * as axios from "axios";
import Cookies from "universal-cookie";
import {BASE_URL} from "../../../api/Api";

class DeleteModal extends React.Component {

    handleDeleteBtn = (id) => {

        const cookies = new Cookies();

        axios.delete(BASE_URL+`/polls/${id}`,
            {
                headers: {

                    Authorization: cookies.get('token')
                }
            }
        )
            .then(response => {

                axios.get(BASE_URL+'/polls/',
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

                this.props.toggle()

                this.props.showDeleteAlert()


            })

    }

    render() {

        return (
            <>
                <CModal
                    show={this.props.modal}
                    onClose={this.props.toggle}
                >
                    <CModalHeader closeButton>Delete Polls</CModalHeader>
                    <CModalBody>
                        Are you sure want to delete?
                    </CModalBody>
                    <CModalFooter>

                        <CButton
                            color="secondary"
                            onClick={this.props.toggle}
                        >Cancel</CButton>{' '}
                        <CButton onClick={() => this.handleDeleteBtn(this.props.selectedItem)}
                                 color="danger">Delete</CButton>
                    </CModalFooter>
                </CModal>
            </>
        )
    }
}

export default DeleteModal
