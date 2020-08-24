import React from "react"
import {CAlert} from "@coreui/react";

const SuccessAlert=(props)=>{

  return(
    <CAlert color="success"
            closeButton>
      {props.message}
    </CAlert>
  )

}

export default SuccessAlert
