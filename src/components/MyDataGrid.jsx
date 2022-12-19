import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from "@mui/x-data-grid"
import DataGridOptions from './DataGridOptions'
import DataGridAdd from './DataGridAdd'
import useMousePosition from '../utils/mousePosition'
const MyDataGrid = props => {

    const [pageSize, setPageSize] = React.useState(5);

    const columns = props.ColumnHeader ?
        props.ColumnHeader.map((item) => {
            return {
                field: item.key === "id" ? "no." : item.key,
                headerName: item.key === "id" ? "No." : item.value,
                width: item.width,
                headerAlign: 'center',
                align: 'center',
                renderCell: (params) => {
                    if (params.field === "lecturerId") {
                        if (params.value) {
                            if (typeof (params.value) === "function")
                                return (<DataGridAdd click={params.row.lecturerId} />)
                            else
                                return params.value
                        }
                    }
                    else if (params.field === "option") {
                        let id = params.row.id
                        let type = params.row ? params.row.option.type : ""
                        let func = params.row ? params.row.option.click : null
                        let lecturerId = params.row.lecturerId ? typeof (params.row.lecturerId) === "function" ? "" : params.row.lecturerId : ""
                        return (<DataGridOptions click={() => { params.row.option(id, lecturerId) }} />)
                        // return <DataGridOptions click={() => func(id, name)} type={type} />
                    }


                }

            }
        }) : []
    const rows = props.Data ? props.Data.map((item, index) => {
        let keys = Object.keys(item)
        let values = Object.values(item)
        let row = {}
        for (let i = 0; i < keys.length; i++) {
            row = {
                ...row,
                [keys[i]]: values[i]
            }
        }
        return {
            id: index + 1,
            ...row
        }
    }) : []


    return (
        <React.Fragment>
            <DataGrid
                // density='comfortable'
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 15]}
                // checkboxSelection
                disableSelectionOnClick
                loading={rows.length > 0 ? false : true}
                experimentalFeatures={{ newEditingApi: true }}
            />
        </React.Fragment>

    )
}

MyDataGrid.propTypes = {
    ColumnHeader: PropTypes.array,
    Data: PropTypes.array
}

export default MyDataGrid