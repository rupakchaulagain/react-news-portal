import React from 'react'
import {CCard, CCardBody, CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs,} from '@coreui/react'
import PollForm from "./PollForm";
import PollTable from "./PollTable";
import * as axios from "axios";
import SuccessAlert from "../../ui/alerts/SuccessAlert";
import DeleteAlert from "../../ui/alerts/DeleteAlert";
import Cookies from "universal-cookie";
import {BASE_URL} from "../../api/Api";

class Polls extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pollList: [],
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

    componentDidMount() {

        const cookies = new Cookies();

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
                this.setState({
                    pollList: data
                })

                console.log("o/p" + this.state.pollList)
            })
    }

    updatePoll = (pollList) => {

        this.setState({
            pollList: pollList
        })


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
                manageTab: false,
            },
            showSuccessAlert: false,
            showDeleteAlert: false
        })
    }

    manageTabController = () => {
        this.setState({
            modal: {
                addNavLink: false,
                addTab: false,
                manageNavLink: true,
                manageTab: true
            }
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
                        message={"Polls is added Successfully..."}/>
                    : null}

                {this.state.showDeleteAlert === true ?
                    <DeleteAlert
                        message={"Polls is deleted..."}/>
                    : null}

                <CRow>
                    <CCol xs="12" md="12" className="mb-4">
                        <CCard>
                            <CCardBody>
                                <CTabs>
                                    <CNav variant="tabs">
                                        <CNavItem onClick={this.addTabController}>
                                            <CNavLink active={this.state.modal.addNavLink}>
                                                Add Polls
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
                                            <PollForm
                                                showErrorAlert={this.showErrorAlert}
                                                showAlert={this.showAlert}
                                                manageTabController={this.manageTabController}
                                                updatePoll={this.updatePoll}/>
                                        </CTabPane>

                                        <CTabPane active={this.state.modal.manageTab}>
                                            <PollTable
                                                showDeleteAlert={this.showDeleteAlert}
                                                updatePoll={this.updatePoll}
                                                pollList={this.state.pollList}/>
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

export default Polls
