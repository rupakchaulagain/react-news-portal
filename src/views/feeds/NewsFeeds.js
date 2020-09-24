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
import {BASE_URL} from "../../api/Api";

class NewsFeeds extends React.Component {

    state = {
        news: []
    }

    componentDidMount() {

        console.log(this.props)

        const id = this.props.match.params.id

        const cookies = new Cookies();

        axios.get(BASE_URL + `/posts/${id}`,
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
                    news: data
                })

            })


    }


    render() {
        return (

            <CCol xs="12" sm="12" md="12">
                <CCard>
                    <CCardHeader>
                        {this.state.news.posttitle}
                    </CCardHeader>
                    <CCardBody>

                        <CListGroupItem>
                            <h3> Post Category:</h3> {this.state.news.postcategory}
                        </CListGroupItem>


                        <CJumbotron fluid>
                            <CContainer fluid>
                                <CImg src={BASE_URL + "/PostImage/" + this.state.news.images}
                                      alt="image"
                                      style={{width: 500, height: 400}}/>
                            </CContainer>
                        </CJumbotron>
                        <CListGroup>
                            <CListGroupItem key={1}>
                                {this.state.news.postdetails}
                            </CListGroupItem>
                            <CListGroupItem key={2}>
                                <h3> Post Conclusion:</h3>{this.state.news.postconclusion}
                            </CListGroupItem>

                        </CListGroup>

                    </CCardBody>

                </CCard>
            </CCol>


        )
    }


}

export default NewsFeeds
