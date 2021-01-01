import React from 'react'
import {CCard, CCardBody, CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs,} from '@coreui/react'
import ResultsTable from "./ResultsTable";
import * as axios from "axios";
import DeleteModal from "./modals/DeleteModal";
import DeleteAlert from "../../ui/alerts/DeleteAlert";
import Cookies from "universal-cookie";
import {BASE_URL} from "../../api/Api";

class Results extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            resultsList: [],
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

    updateResults = (resultsList) => {

        this.setState({
            resultsList: resultsList
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

    componentDidMount() {
        const cookies = new Cookies();

        axios.get(BASE_URL+'/Results/',
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
                    resultsList: data,
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
                <CRow>
                    <CCol xs="12" md="12" className="mb-4">
                        <CCard>
                            <CCardBody>
                                <CTabs>
                                    <CNav variant="tabs">
                                        <CNavItem>
                                            <CNavLink active={true}>
                                                Manage
                                            </CNavLink>
                                        </CNavItem>
                                    </CNav>

                                    <CTabContent>

                                        <CTabPane active={true}>
                                            <ResultsTable
                                                showDeleteAlert={this.showDeleteAlert}
                                                resultsList={this.state.resultsList}/>
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

export default Results
