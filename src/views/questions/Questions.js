import React from 'react'
import {CCard, CCardBody, CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs,} from '@coreui/react'
import QuestionsForm from "./QuestionsForm";
import QuestionsTable from "./QuestionsTable";
import * as axios from "axios";
import DeleteModal from "./modals/DeleteModal";
import SuccessAlert from "../../ui/alerts/SuccessAlert";
import DeleteAlert from "../../ui/alerts/DeleteAlert";
import Cookies from "universal-cookie";
import {BASE_URL} from "../../api/Api";

class Questions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            questionsList: [],
            deleteModal: false,
            showSuccessAlert: false,
            showDeleteAlert: false,
            errorMessage: {
                showErrorAlert: false,
                message: ''
            },
            modal: {
                addNavLink: true,
                manageNavLink: false,
                addTab: true,
                manageTab: false
            }


        }


    }

    updateQuestions = (questionsList) => {

        this.setState({
            questionsList: questionsList
        })


    }

    editProduct = () => {
    }

    deleteNews = (id) => {

        this.setState({
                deleteModal: true
            }
        )


        return (

            <DeleteModal deleteModal={this.props.deleteModal}/>
        )
    }

    showAlert = () => {
        this.setState({
            showSuccessAlert: true
        })

    }

    showDeleteAlert = () => {
        this.setState({
            showSuccessAlert: false,
            showDeleteAlert: true
        })

    }

    showErrorAlert = (errorMessage) => {
        this.setState({
            errorMessage: {
                showErrorAlert: true,
                message: errorMessage
            }
        })

    }

    addTabController = () => {
        this.setState({
            modal: {
                addNavLink: true,
                addTab: true,
                manageNavLink: false,
                manageTab: false
            }
        })
    }

    manageTabController = () => {

        const cookies = new Cookies();

        axios.get(BASE_URL+'/Questions/',
            {
                headers: {

                    Authorization: cookies.get('token')
                }
            }
        )
            .then(response => {

                console.log(response.data)
                const data = response.data

                this.setState({
                    questionsList: data,
                    modal: {
                        addNavLink: false,
                        addTab: false,
                        manageNavLink: true,
                        manageTab: true
                    }
                })

            })
    }
    
    render() {
        return (

            <React.Fragment>
                {this.state.errorMessage.showErrorAlert === true ?
                    <DeleteAlert
                        message={this.state.errorMessage.showErrorAlert.errorMessage}/>
                    : null}

                {this.state.showSuccessAlert === true ?
                    <SuccessAlert
                        message={"News is added Successfully..."}/>
                    : null}

                {this.state.showDeleteAlert === true ?
                    <DeleteAlert
                        message={"News is deleted..."}/>
                    : null}

                <CRow>
                    <CCol xs="12" md="12" className="mb-4">
                        <CCard>
                            <CCardBody>
                                <CTabs>
                                    <CNav variant="tabs">
                                        <CNavItem onClick={this.addTabController}>
                                            <CNavLink active={this.state.modal.addNavLink}>
                                                Add Questions
                                            </CNavLink>
                                        </CNavItem>
                                        <CNavItem onClick={this.manageTabController}>
                                            <CNavLink active={this.state.modal.manageNavLink}>
                                                Manage
                                            </CNavLink>
                                        </CNavItem>
                                    </CNav>

                                    <CTabContent>

                                        <CTabPane active={this.state.modal.addTab}>
                                            <QuestionsForm
                                                showErrorAlert={this.showErrorAlert}
                                                showAlert={this.showAlert}
                                                manageTabController={this.manageTabController}
                                                updateQuestions={this.updateQuestions}/>
                                        </CTabPane>

                                        <CTabPane active={this.state.modal.manageTab}>
                                            <QuestionsTable
                                                showDeleteAlert={this.showDeleteAlert}
                                                updateNews={this.updateNews}
                                                deleteSupplier={this.deleteSupplier}
                                                editProduct={this.editProduct}
                                                questionsList={this.state.questionsList}/>
                                        </CTabPane>

                                    </CTabContent>
                                </CTabs>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>

            </React.Fragment>
        )
    }


}

export default Questions
