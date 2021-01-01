import {CDataTable, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/react";
import React, {useState} from "react";
import DetailModal from "./modals/DetailModal";

const fields = [

    'level',
    'totalQuestionAttempt',
    'totalright',
    'status',
    'actions']

const ResultsTable = (props) => {

    let resultsList = props.resultsList
    const [modal, setModal] = useState(false);
    const [detailModal, setDetailModal] = useState(false);

    const [selectedItem, setSelectedItem] = useState(false);


    const detailModalToggle = (id) => {
        setSelectedItem(id)
        setDetailModal(!detailModal);

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

            <CDataTable
                items={resultsList}
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
                                    </CDropdownMenu>
                                </CDropdown>


                            </td>
                        )

                }}
            />
        </React.Fragment>
    )
}

export default ResultsTable
