import React from 'react'
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader} from "@coreui/react";
import * as axios from "axios";
import Cookies from "universal-cookie";

class DeleteModal extends React.Component {

    handleDeleteBtn = (id) => {


        const cookies = new Cookies();

        axios.delete(`https://frozen-refuge-74833.herokuapp.com/posts/${id}`,
            {
                headers: {

                    Authorization: cookies.get('token')
                }
            }
        )
            .then(response => {

                axios.get('https://frozen-refuge-74833.herokuapp.com/usersnews/')
                    .then(response => {

                        console.log(response.data)
                        const data = response.data

                        this.props.updateNews(data)
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
                    <CModalHeader closeButton>Delete Product</CModalHeader>
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
