import React from 'react'
import {CCard, CCardBody, CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs,} from '@coreui/react'
import UserTable from "./UserTable";
import * as axios from "axios";
import SuccessAlert from "../../ui/alerts/SuccessAlert";
import DeleteAlert from "../../ui/alerts/DeleteAlert";
import Cookies from "universal-cookie";

class User extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userList: [],
      deleteModal: false,
      showSuccessAlert: false,
      showDeleteAlert: false,
      errorMessage:{
        showErrorAlert: false,
        message: ''
      },
      modal: {
        addNavLink: false,
        manageNavLink: true,
        addTab: false,
        manageTab: true
      }


    }


  }

  componentDidMount() {

    const cookies = new Cookies();

    axios.get('https://frozen-refuge-74833.herokuapp.com/users/me',
        {
          headers: {

            Authorization: cookies.get('token')
          }
        }
    )
      .then(response => {

        console.log(response.data)
        const data = response.data
        let list=[]
        list.push(data)
        this.setState({
          userList:  list
        })

        console.log("o/p" + this.state.userList)
      })
  }

  updateUser = (userList) => {

    this.setState({
      userList: userList
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
      errorMessage:{
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
            message={"User is added Successfully..."}/>
          : null}

        {this.state.showDeleteAlert === true ?
          <DeleteAlert
            message={"User is deleted..."}/>
          : null}

        <CRow>
          <CCol xs="12" md="12" className="mb-4">
            <CCard>
              <CCardBody>
                <CTabs>
                  <CNav variant="tabs">
                    <CNavItem onClick={this.manageTabController}>
                      <CNavLink active={this.state.modal.manageNavLink}>
                        Manage
                      </CNavLink>
                    </CNavItem>
                  </CNav>

                  <CTabContent>

                    <CTabPane active={this.state.modal.addTab}>
                    </CTabPane>

                    <CTabPane active={this.state.modal.manageTab}>
                      <UserTable
                        showDeleteAlert={this.showDeleteAlert}
                        updateUser={this.updateUser}
                        deleteSupplier={this.deleteSupplier}
                        userList={this.state.userList}/>
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

export default User
