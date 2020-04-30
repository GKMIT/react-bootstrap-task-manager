import React from "react";
import DataTable from 'react-data-table-component';
import { crudService } from '../../_services';
import { alertActions } from '../../_actions';
import { connect } from 'react-redux';

class BootDataTable extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            columns: this.props.columns,
            data: [],
            loading: false,
            totalRows: 0,
            perPage: 10,
            page: 1,
        }

        this.tableRef = React.createRef();
    }

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate() {
        if (this.tableRef.current) {
            this.tableRef.current.onQueryChange()
        }
    }

    getData = () => {
        const filter = {
            page: this.state.page,
            pageSize: this.state.pageSize
        }
        const me = this
        crudService._getAll(this.props.url, filter).then(
            result => {
                me.setState({
                    data: result.data.data,
                    totalRows: Number(result.data.total)
                })
            },
            error => {
                this.props.showError(error.message)
            }
        );
    }

    handlePerRowsChange = (e) => {
        this.setState({
            pageSize: e
        })
        this.getData()
    }

    handlePageChange = (e) => {
        this.setState({
            page: e
        })
        this.getData()
    }

    render() {
        const { columns, data, totalRows } = this.state

        return (
            <div>
                <DataTable
                    tableRef={this.tableRef}
                    title={this.props.title}
                    columns={columns}
                    data={data}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangeRowsPerPage={this.handlePerRowsChange}
                    onChangePage={this.handlePageChange}
                />
            </div>
        );
    }
}

const actionCreators = {
    showError: alertActions.error,
}

export default connect(null, actionCreators)(BootDataTable);