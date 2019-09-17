import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const options = [
    { value: '1', label: 'Afspraak 1' },
    { value: '2', label: 'Afspraak 2' },
    { value: '3', label: 'Afspraak 3' },
    { value: '4', label: 'Afspraak 4' },
    { value: '5', label: 'Afspraak 5' },
    { value: '6', label: 'Afspraak 6' },
    { value: '7', label: 'Afspraak 7' },
    { value: '8', label: 'Afspraak 8' },
    { value: '9', label: 'Afspraak 9' },
    { value: '10', label: 'Afspraak 10' },
  ];

  const animatedComponents = makeAnimated();

export default class CaseForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = selectedOptions => {
        this.props.onAfspraakChange(selectedOptions);
        console.log(`Option selected:`, selectedOptions);
    };
  
    render() {
      return (
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={[options[0], options[1]]}
                isMulti
                onChange={this.handleChange}
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
            />
      );
    }
}