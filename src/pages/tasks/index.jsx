import React from 'react';
import { connect } from 'react-redux';
import { crudActions, confirmActions } from '../../_actions';

import { TableAction } from '../../component/material-table/tableAction'
import MaterialDataTable from '../../component/material-table'

const title = 'Task List'
class List extends React.Component {

    componentDidUpdate() {
        if (this.props.confirm.confirm) {
            if (Array.isArray(this.props.confirm.data)) {
                this.props.confirm.data.map(value => this.deleteData(value.id))
            } else {
                if (this.props.confirm.data.id) {
                    this.deleteData(this.props.confirm.data.id);
                }
            }
            this.props.clearConfirm();
        }
    }

    deleteData = (id) => {
        this.props.deleteCrud('tasks', 'tasks', id);
    }

    deleteCrud = (data) => {
        this.props.showConfirm('confirm', `are you sure want to delete ${data.name} ?`, data)
    }

    deleteAll = (data) => {
        this.props.showConfirm('confirm', `are you sure want to delete ${data.length} row ?`, data)
    }

    editCrud = (data) => {
        this.props.history.push(`/task-form/${data.id}`)
    }

    addData = () => {
        this.props.history.push(`/task-form/new`)
    }

    render() {
        const columns = []
        columns.push({
            name: "Name",
            selector: "name"
        })
        columns.push({
            name: "Start Date",
            selector: "start_date"
        })
        columns.push({
            name: "End Date",
            selector: "end_date"
        })
        columns.push({
            name: "Details",
            selector: "details"
        })
        if (this.deleteCrud && this.editCrud) {
            columns.push(TableAction(this.deleteCrud, this.editCrud))
        }
        return (
            <React.Fragment>
                <MaterialDataTable
                    title={title}
                    url='tasks'
                    columns={columns}
                    selection={true}
                    addData={this.addData}
                    deleteAll={this.deleteAll}
                    refresh={true}
                />
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    const { confirm } = state;
    return { confirm };
}

const actionCreators = {
    deleteCrud: crudActions._delete,
    showConfirm: confirmActions.show,
    clearConfirm: confirmActions.clear,
}

export default connect(mapStateToProps, actionCreators)(List);
