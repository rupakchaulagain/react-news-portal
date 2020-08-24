import React, {useState} from 'react'
import {
    CButton,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Cookies from "universal-cookie";

const TheHeaderDropdown = (props) => {

    const [large, setLarge] = useState(false)

    function logout() {
        console.log(props)
        const cookies = new Cookies();
        cookies.remove('token', { path: '/' });
        props.history.push('/login')

    }


    return (
        <React.Fragment>
            <CModal
                show={large}
                onClose={() => setLarge(!large)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Logout...</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Are you sure want ot logout...?
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setLarge(!large)}>No</CButton>
                    <CButton color="primary" onClick={logout}>Yes</CButton>{' '}
                </CModalFooter>
            </CModal>
            <CDropdown
                inNav
                className="c-header-nav-items mx-2"
                direction="down"
            >
                <CDropdownToggle className="c-header-nav-link" caret={false}>
                    <div className="c-avatar">
                        Account
                    </div>
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">

                    <CDropdownItem onClick={() => setLarge(!large)}>
                        <CIcon name="cil-lock-locked" className="mfe-2"/>
                        Logout
                    </CDropdownItem>
                </CDropdownMenu>
            </CDropdown>

        </React.Fragment>
    )
}

export default TheHeaderDropdown
