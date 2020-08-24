import React from "react"
import {CAlert} from "@coreui/react";

const DeleteAlert=(props)=>{

  return(
    <CAlert color="danger"
            closeButton>
      {props.message}
    </CAlert>

  )

}

export default DeleteAlert
