import {CDataTable, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/react";
import React, {useState} from "react";
import DeleteModal from "./modals/DeleteModal";
import DetailModal from "./modals/DetailModal";
import EditModal from "./modals/EditModal";

const fields = [

    'notificationdate',
    'polltitle',
    'createdAt',
    'updatedAt',
    'actions']

const PollTable = (props) => {

    let pollList = props.pollList
    const [modal, setModal] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(false);
    const [editItem, setEditItem] = useState(false);

    const detailModalToggle = (id) => {
        setSelectedItem(id)
        setDetailModal(!detailModal);

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

            {editItem ? <EditModal
                updatePoll={props.updatePoll}
                editItem={editItem}
                editModal={editModal}
                editModalToggle={editModalToggle}/> : null}
            <DeleteModal
                showDeleteAlert={props.showDeleteAlert}
                updatePoll={props.updatePoll}
                selectedItem={selectedItem}
                modal={modal}
                toggle={toggle}/>

            <CDataTable
                items={pollList}
                fields={fields}
                bordered
                itemsPerPage={10}
                pagination
                scopedSlots={{
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

export default PollTable
