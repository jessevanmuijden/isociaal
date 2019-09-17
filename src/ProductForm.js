import React from 'react'
import Select from 'react-select'

// const options = [
//   { value="40", label: "Persoonlijke verzorging"},
//   { value="41", label: "Dagbehandeling"},
//   { value="42", label: "Vervoerdiensten"},
//   { value="43", label: "Jeugdhulp verblijf (incl. behandeling)",
//   { value="44", label: "Jeugdhulp verblijf (excl. Behandeling)</option, label: 
//   { value="45", label: "Jeugdhulp ambulant</option, label: 
//   { value="46", label: "Jeugdhulp crisis</option, label: 
//   { value="47", label: "Jeugdreclassering</option>
//   { value="48", label: "Jeugdbescherming</option, label: 
//   { value="49", label: "Activiteiten in het preventief justitieel kader</option, label: 
//   { value="50", label: "Maatwerkarrangementen jeugd</option, label: 
//   { value="P5", label: "Maatwerkarrangementen jeugd - Profielen</option, label:            
//   { value="51", label: "Generalistische basis-ggz</option, label: 
//   { value="53", label: "Kindergeneeskunde</option, label: 
//   { value="54", label: "Jeugd-ggz</option, label: 
//   { value="55", label: "Landelijk ingekochte zorg</option, label: 
//   { value="L0", label: "Landelijke Transitie Arrangementen</option>  
// ];

export default class ProductForm extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handlePrChange = this.handlePrChange.bind(this);
      this.handleAfspraakChange = this.handleAfspraakChange.bind(this);
      
          
    }
    
    componentWillMount() {
      this.setState({products : []})
    }

    getProducts(code) {
      const products = this.props.products
      const result = products.filter((product) => {
        //console.log(product)
        return product.Code.startsWith(code) && !product.Code.endsWith("00")
      })
      return result
    }


    handleChange(e) {
      this.props.onProductCategoryChange(e.target.value);
      console.log(e.target.value)
      this.setState({products: this.getProducts(e.target.value)})
    }
  
    handlePrChange(e) {
      this.props.onProductChange(e.target.value);
      console.log(e.target.value)
    }

    handleAfspraakChange(e) {
      this.props.onAfspraakChange(e.target.value);

      console.log(e.target.value)
    }

    render() {
      const prcat = this.props.prcat;
      const prcode = this.props.prcode;
      const afspraak = this.props.afspraak;
      return (
        <div>

          <select value={prcat} onChange={this.handleChange}>
                <option value="40">Persoonlijke verzorging</option>
                <option value="41">Dagbehandeling</option>
                <option value="42">Vervoerdiensten</option>
                <option value="43">Jeugdhulp verblijf (incl. behandeling)</option>
                <option value="44">Jeugdhulp verblijf (excl. Behandeling)</option>
                <option value="45">Jeugdhulp ambulant</option>
                <option value="46">Jeugdhulp crisis</option>
                <option value="47">Jeugdreclassering</option>
                <option value="48">Jeugdbescherming</option>
                <option value="49">Activiteiten in het preventief justitieel kader</option>
                <option value="50">Maatwerkarrangementen jeugd</option>
                <option value="P5">Maatwerkarrangementen jeugd - Profielen</option>           
                <option value="51">Generalistische basis-ggz</option>
                <option value="53">Kindergeneeskunde</option>
                <option value="54">Jeugd-ggz</option>
                <option value="55">Landelijk ingekochte zorg</option>
                <option value="L0">Landelijke Transitie Arrangementen</option>      
          </select>



          <select value={prcode} onChange={this.handlePrChange}>
            {this.state.products.map( (product) => <option key={product.Code} value={product.Code}>{product.Betekenis}</option>)}
          </select>


          </div>


      );
    }
}