import React from 'react'

export default class GemeenteForm extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e) {
      this.props.onGemeenteChange(e.target.value);
      console.log(e.target.value)
    }
  
    render() {
      const gemeente = this.props.gemeente;
      return (
          <label>Gemeente 
          <select value={gemeente} onChange={this.handleChange}>
                <option value="De Belevenis">De Belevenis</option>
                <option value="Agora">Agora</option>
                <option value="Shophorts">Shophorts</option>
                <option value="Juinen">Juinen</option>
            </select>
            </label>
      );
    }
}