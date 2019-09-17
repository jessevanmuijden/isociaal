import React from 'react'

export default class ZorgaanbiederForm extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e) {
      this.props.onZorgaanbiederChange(e.target.value);
      console.log(e.target.value)
    }
  
    render() {
      const zorgaanbieder = this.props.zorgaanbieder;
      return (
          <label>Zorgaanbieder
          <select value={zorgaanbieder} onChange={this.handleChange}>
                <option value="Fleurop">Fleurop</option>
                <option value="Theresa">Theresa</option>
                <option value="Jacobs">Jacobs</option>
                <option value="Socrates">Socrates</option>
            </select>
            </label>
      );
    }
}