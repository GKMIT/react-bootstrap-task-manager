import React from 'react';
import moment from 'moment'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

class BootDatePicker extends React.Component {

    constructor() {
        super()
        this.state = {
            open: false
        }
    }

    handleDateRange = () => {
        const { open } = this.state
        this.setState({ open: !open })
    }

    handleChange = (value, name, index) => {
        this.props.handleChange(value[0], name, index)
    }

    renderDateRange = () => {
        const { open } = this.state
        const { name, value, index } = this.props

        const selectionRange = {
            startDate: value.startDate,
            endDate: value.endDate,
            key: 'selection',
        }

        return (
            <Modal show={open} dialogClassName="daterange-modal" onHide={this.handleDateRange}>                
                <Modal.Body>
                    <DateRangePicker
                        onChange={item => this.handleChange([item.selection], name, index)}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={[selectionRange]}
                        direction="horizontal"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleDateRange}>Ok</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    render() {
        const { name, label, value, helperText, format } = this.props
        const labelValue = `${moment(value.startDate).format(format)} / ${moment(value.endDate).format(format)}`

        return (
            <React.Fragment>
                <Form.Group>
                    <InputGroup className="mb-3">
                        <Form.Control
                            isValid={value && !helperText}
                            isInvalid={helperText}
                            name={name}
                            placeholder={label}
                            type='text'
                            value={labelValue}
                            readOnly={true}
                        />
                        <InputGroup.Append>
                            <Button variant="secondary" onClick={this.handleDateRange}>
                                <FontAwesomeIcon icon={faCalendar} />
                            </Button>
                        </InputGroup.Append>
                        <Form.Control.Feedback type="invalid">
                            {helperText}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                {this.renderDateRange()}
            </React.Fragment>
        )

    }
}

export default BootDatePicker;