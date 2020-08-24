import React from 'react'
import {TheContent, TheFooter, TheHeader, TheSidebar} from './index'

class TheLayout extends React.Component {

    render() {
        return (
            <div className="c-app c-default-layout">
                <TheSidebar/>
                <div className="c-wrapper">
                    <TheHeader {...this.props}/>
                    <div className="c-body">
                        <TheContent/>
                    </div>
                    <TheFooter/>
                </div>
            </div>
        )
    }
}

export default TheLayout
