import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
class MultiSelectBox extends React.Component {

    handleChange = (data, name, index) => {
        const finalData = data.map(value => value.value)
        this.props.handleChange(finalData, name, index)
    }

    render() {
        const { name, label, value, options, helperText, index } = this.props

        let selected = []
        let items = []
        if (options && options.length) {
            options.map(option => {
                if (value.includes(option.id) === true) {
                    selected.push({
                        value: option.id,
                        label: option.name,
                    })
                }

                items.push({
                    value: option.id,
                    label: option.name,
                })
                return null
            })
        }

        return (
            <React.Fragment>
                <Form.Group>
                    <Form.Label>{label}</Form.Label>
                    <Select
                        name={name}
                        value={selected}
                        isMulti
                        onChange={e => this.handleChange(e, name, index)}
                        options={items}
                    />
                    <div className="is-invalid"></div>
                    <div className="invalid-feedback">
                        {helperText}
                    </div>
                </Form.Group>
            </React.Fragment >
        )

    }
}

MultiSelectBox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
};

MultiSelectBox.defaultProps = {
    name: "",
    label: "",
    value: "",
    inputAdornmentPosition: 'end'
}

export default MultiSelectBox;