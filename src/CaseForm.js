import React from 'react'
import Select from 'react-select'

const options = [
    { value: 1, label: 'Casus 1' },
    { value: 2, label: 'Casus 2' },
    { value: 3, label: 'Casus 3' },
  ];

export default class CaseForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = selectedOption => {
        this.props.onCaseChange(selectedOption.value);
        console.log(`Option selected:`, selectedOption);
    };
  
    render() {
        const selectedOption = null;
        return (
            <Select
                value={selectedOption}
                defaultValue={options[0]}
                onChange={this.handleChange}
                options={options}
            />
      );
    }
}