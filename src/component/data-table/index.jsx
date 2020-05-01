import React from "react";
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { crudService } from '../../_services';
import { alertActions } from '../../_actions';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRecycle } from '@fortawesome/free-solid-svg-icons'

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
            orderBy: 'id',
            orderDirection: 'asc'
        }
    }

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate() {

    }

    getData = () => {
        const filter = {
            page: this.state.page,
            pageSize: this.state.pageSize,
            orderBy: this.state.orderBy,
            orderDirection: this.state.orderDirection,
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

    handleSort = (column, sortDirection) => {
        this.setState({
            orderBy: column.selector,
            orderDirection: sortDirection,
        })
        this.getData()
    }

    actionRender = () => {
        return (
            <React.Fragment>
                <Button variant="primary" onClick={() => this.props.addData()} >
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
                <Button variant="secondary" onClick={() => this.getData()} >
                    <FontAwesomeIcon icon={faRecycle} />
                </Button>
            </React.Fragment>
        )
    }

    render() {
        const { columns, data, totalRows } = this.state

        return (
            <div>
                <DataTable
                    title={this.props.title}
                    columns={columns}
                    data={data}
                    actions={this.actionRender()}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangeRowsPerPage={this.handlePerRowsChange}
                    onChangePage={this.handlePageChange}
                    onSort={this.handleSort}
                    sortServer
                />
            </div>
        );
    }
}

const actionCreators = {
    showError: alertActions.error,
}

export default connect(null, actionCreators)(BootDataTable);