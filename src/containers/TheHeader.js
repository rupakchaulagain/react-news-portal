import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {CBreadcrumbRouter, CHeader, CHeaderNav, CSubheader, CToggler} from '@coreui/react'

// routes config
import routes from '../routes'

import {TheHeaderDropdown} from './index'

const TheHeader = (props) => {
    const dispatch = useDispatch()
    const sidebarShow = useSelector(state => state.sidebarShow)

    const toggleSidebar = () => {
        const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
        dispatch({type: 'set', sidebarShow: val})
    }

    const toggleSidebarMobile = () => {
        const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
        dispatch({type: 'set', sidebarShow: val})
    }


    return (

        <CHeader withSubheader>
            <CToggler
                inHeader
                className="ml-md-3 d-lg-none"
                onClick={toggleSidebarMobile}
            />
            <CToggler
                inHeader
                className="ml-3 d-md-down-none"
                onClick={toggleSidebar}
            />

            <CHeaderNav className="d-md-down-none mr-auto">

            </CHeaderNav>

            <CHeaderNav>
                <TheHeaderDropdown {...props}/>
            </CHeaderNav>

            <CSubheader className="px-3 justify-content-between">
                <CBreadcrumbRouter
                    className="border-0 c-subheader-nav m-0 px-0 px-md-3"
                    routes={routes}
                />
            </CSubheader>
        </CHeader>
    )
}

export default TheHeader
