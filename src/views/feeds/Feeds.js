import React from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CImg,
    CJumbotron,
    CListGroup,
    CListGroupItem
} from "@coreui/react";
import Cookies from "universal-cookie";
import * as axios from "axios";
import {Link} from "react-router-dom";
import {FacebookIcon, FacebookShareButton} from "react-share";

class Feeds extends React.Component {

    state = {
        newsList: []
    }

    componentDidMount() {


        const cookies = new Cookies();

        axios.get('https://frozen-refuge-74833.herokuapp.com/usersnews/',
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
                    newsList: data
                })

                console.log("o/p" + this.state.newsList)
            })


    }


    render() {
        return (

            (this.state.newsList?.map((news, index) => (
                    <CCol xs="12" sm="12" md="12">
                        <CCard>
                            <CCardHeader>
                                {news.posttitle}
                            </CCardHeader>
                            <CCardBody>

                                <CListGroupItem>
                                    <h3> Post Category:</h3> {news.postcategory}
                                </CListGroupItem>


                                <CJumbotron fluid>

                                    <Link to={`/feeds/details/${news._id}`}>
                                        <CContainer fluid>
                                            <CImg src={"https://frozen-refuge-74833.herokuapp.com/PostImage/" + news.images}
                                                  alt="image"
                                                  style={{width: 500, height: 400}}/>
                                        </CContainer>
                                    </Link>


                                </CJumbotron>
                                <CListGroup>
                                    <CListGroupItem key={1}>
                                        {news.postdetails}
                                    </CListGroupItem>
                                    <CListGroupItem key={2}>
                                        <h3> Post Conclusion:</h3>{news.postconclusion}
                                    </CListGroupItem>

                                    <CListGroupItem key={2}>
                                        <FacebookShareButton
                                            quote={
                                                news.postdetails
                                            }
                                            url={`https://frozen-refuge-74833.herokuapp.com/feeds/details/${news._id}`}>

                                            <FacebookIcon logoFillColor="white"/>
                                        </FacebookShareButton>
                                    </CListGroupItem>

                                </CListGroup>


                            </CCardBody>

                        </CCard>
                    </CCol>
                ))
            )


        )
    }


}

export default Feeds
