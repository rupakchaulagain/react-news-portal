import {CDataTable, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg} from "@coreui/react";
import React, {useState} from "react";
import DeleteModal from "./modals/DeleteModal";
import DetailModal from "./modals/DetailModal";
import EditModal from "./modals/EditModal";
import {FacebookIcon, FacebookShareButton} from "react-share"
import Cookies from "universal-cookie";
import * as axios from "axios";
import UpdateImageModal from "./modals/UpdateImageModal";
import {BASE_URL} from "../../api/Api";

const deleteImage = (id, props) => {

    const cookies = new Cookies();

    console.log(cookies.get('token'))

    axios.put(`https://frozen-refuge-74833.herokuapp.com/posts/deleteImage/${id}`, null,
        {
            headers: {

                Authorization: cookies.get('token')
            }
        }
    )
        .then(response => {

            axios.get('https://frozen-refuge-74833.herokuapp.com/posts/',
                {
                    headers: {

                        Authorization: cookies.get('token')
                    }
                }
            )
                .then(response => {

                    const data = response.data
                    props.updateNews(data)

                })
        })

}

const fields = [

    'posttitle',
    'postcategory',
    'postdetails',
    'postconclusion',
    'images',
    'share',
    'actions']

const NewsTable = (props) => {

    let newsList = props.newsList
    const [modal, setModal] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [updateImageModal, setUpdateImageModal] = useState(false);

    const [selectedItem, setSelectedItem] = useState(false);
    const [editItem, setEditItem] = useState(false);
    const [imageItem, setImageItem] = useState(false);

    const detailModalToggle = (id) => {
        setSelectedItem(id)
        setDetailModal(!detailModal);

    }
    const updateImageToggle = (id) => {
        setImageItem(id)
        setUpdateImageModal(!updateImageModal);

    }

    const editModalToggle = (id) => {
        setEditItem(id)
        setEditModal(!editModal);

    }

    const toggle = (id) => {

        setSelectedItem(id)
        setModal(!modal);

    }


    return (
        <React.Fragment>
            {selectedItem ? <DetailModal
                selectedItem={selectedItem}
                detailModal={detailModal}
                detailModalToggle={detailModalToggle}/> : null}

            {imageItem ? <UpdateImageModal
                updateNews={props.updateNews}
                imageItem={imageItem}
                updateImageModal={updateImageModal}
                updateImageToggle={updateImageToggle}/> : null}

            {editItem ? <EditModal
                updateNews={props.updateNews}
                editItem={editItem}
                editModal={editModal}
                editModalToggle={editModalToggle}/> : null}
            <DeleteModal
                showDeleteAlert={props.showDeleteAlert}
                updateNews={props.updateNews}
                selectedItem={selectedItem}
                modal={modal}
                toggle={toggle}/>

            <CDataTable
                items={newsList}
                fields={fields}
                bordered
                itemsPerPage={10}
                pagination
                scopedSlots={{
                    'images':
                        (item) => (

                            <td>
                                {item.images !== null ?
                                    <CImg src={BASE_URL+"/PostImage/" + item.images}
                                          alt="image" style={{width: 500, height: 400}}/> :
                                    <CImg src={""}
                                          alt="image" style={{width: 500, height: 400}}/>}

                                {item.images !== null ?
                                    <button onClick={() => deleteImage(item._id, props)}>Delete Image</button> : null}
                            </td>
                        ),
                    'share':
                        (item) => (

                            <td>
                                <FacebookShareButton
                                    quote={item.posttitle}
                                    url={`https://festive-jepsen-4d10b9.netlify.app/#/feeds/details/${item._id}`}

                                >
                                    <FacebookIcon logoFillColor="white"/>
                                </FacebookShareButton>
                            </td>
                        ),
                    'actions':
                        (item) => (
                            <td>

                                <CDropdown className="m-1 btn-group">
                                    <CDropdownToggle color="primary">
                                        Actions
                                    </CDropdownToggle>
                                    <CDropdownMenu>

                                        <CDropdownItem
                                            onClick={() => detailModalToggle(item._id)}>View</CDropdownItem>

                                        <CDropdownItem
                                            onClick={() => updateImageToggle(item._id)}>Update Image</CDropdownItem>

                                        <CDropdownItem
                                            onClick={() => editModalToggle(item._id)}>Edit</CDropdownItem>

                                        <CDropdownItem
                                            key={item._id}
                                            onClick={() => toggle(item._id)}>Delete</CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>


                            </td>
                        )

                }}
            />
        </React.Fragment>
    )
}

export default NewsTable
