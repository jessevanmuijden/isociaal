import React, {Component} from 'react'


import './App.css'
import {Board} from 'react-trello'
import update from 'immutability-helper'
import CaseForm from './CaseForm'
import ProductForm from './ProductForm'
import GemeenteForm from './GemeenteForm'
import ZorgaanbiederForm from './ZorgaanbiederForm'
import AfspraakForm from './AfspraakForm'

const data = require('./data.json')
const products = require('./productcode.json')
const cases = require('./casus.json')


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {boardData: {lanes: []}, 
                        products: [], cases: [], 
                        card: {}, 
                        case: null, 
                        productCategory: "40",
                        product: "40A01",
                        afspraken: [],
                        gemeente: "De Belevenis",
                        zorgaanbieder: "Theresa",
                        startLaneId: "",
                        endLaneId:""
                    }
    
        this.handleCaseChange = this.handleCaseChange.bind(this);
        this.handleProductCategoryChange = this.handleProductCategoryChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleAfspraakChange = this.handleAfspraakChange.bind(this);
        this.handleGemeenteChange = this.handleGemeenteChange.bind(this);
        this.handleZorgaanbiederChange = this.handleZorgaanbiederChange.bind(this);
        
        this.addCaseCard = this.addCaseCard.bind(this);
        this.addAfspraakCard = this.addAfspraakCard.bind(this);
        this.addDeclaratieCard = this.addDeclaratieCard.bind(this);
        //this.compareLaneAndCard = this.compareLaneAndCard.bind(this);
        
      }

     handleDragStart = (cardId, laneId) => {
        console.log('drag started')
        console.log(`cardId: ${cardId}`)
        console.log(`laneId: ${laneId}`)
        
    }
    
     handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
        console.log('drag ended')
        console.log(`cardId: ${cardId}`)
        console.log(`sourceLaneId: ${sourceLaneId}`)
        console.log(`targetLaneId: ${targetLaneId}`)
        //this.setState({startLaneId: sourceLaneId, endLaneId: targetLaneId})
        const card = this.getCard(targetLaneId, cardId)
        console.log(card)
        if (sourceLaneId === 'TOEGANG' && targetLaneId === 'TOEWIJZINGEN') {
            this.addBerichtCard('301-302', 'TOEWIJZINGEN', card)
        }

    }
    setEventBus = eventBus => {
        this.setState({eventBus})
    }

    async componentWillMount() {
        const response = await this.getBoard()
        const response2 = await this.getProducts()
        const response3 = await this.getCases()
        
        this.setState({boardData: response, products: response2, cases: response3})
    }

    getBoard() {
        return new Promise(resolve => {
            resolve(data)
        })
    }

    getProducts() {
        return new Promise(resolve => {
            resolve(products)
        })
    }

    getCases() {
        return new Promise(resolve => {
            resolve(cases)
        })
    }

    setBericht(bericht, card) {
        const newcard = {
            id: "Bericht",
            title: "Bericht voor " + card.title,
            label: "van: " + this.state.gemeente,
            description: card.description,
            tags: [{"key": bericht, "title": bericht, "bgcolor": "orange"}]
        }
        return newcard
    }

    setCase() {
        const cases = this.state.cases
        console.log(cases)
        const cs = this.state.case
        console.log(cs)
        const casus = cases.filter((cas) => {return cas.Casus === cs})
        console.log(casus)
        const newcard = {
            id: "Casus" + cs + "Actie",
            title: "Casus " + cs,
            label: this.state.gemeente,
            description: casus[0].Actie + "; " + casus[0].Reactie,
            tags: Array.from(new Set(casus[0].Berichten.split(" "))).map((tag) =>  {
                let obj = {}
                obj["title"] = tag
                obj["bgcolor"] = "orange"
                return obj
            })
        }
        return newcard
    }

    getLane(laneId) {
        return this.state.boardData.lanes.filter((l) => l.id === laneId)[0]
    }

    getCard(laneId, cardId) {
        const lanes = this.state.boardData.lanes
        const lane = lanes.filter((l) => l.id === laneId)[0]
        return lane.cards.filter((c) => c.id === cardId)[0]
    }
    

    compareLaneAndCard = (laneId, card) => {
        const lane = this.getLane(laneId)
        console.log(lane)
        console.log(card)
        console.log("1: ", lane.cards.map((c) => c.id.substring(8)))
        console.log("2", card.id.substring(10))
        const card2 = lane.cards.filter((c) => {
            return c.id.substring(8) === card.id.substring(10)
        })[0]
        console.log(card.tags)
        console.log("Card2 tags: ", card2.tags)
        return JSON.stringify(card.tags)===JSON.stringify(card2.tags)
    }


    getProduct = (code) => {
        const products = this.state.products
        for (var i = 0; i < products.length; i++){
            if (products[i].Code === code)
                return products[i].Betekenis;
        }
    }

    setAfspraak() {
        const prcat = this.state.productCategory
        const prcode = this.state.product
        const afspraken = this.state.afspraken

        const newcard = {
            id: "Afspraak_" + prcode + "_" + this.state.zorgaanbieder + "_" + this.state.gemeente,
            title: this.state.zorgaanbieder,
            label: this.state.gemeente,
            description: prcode + ": " + this.getProduct(prcode),
            tags: afspraken.map((tag) =>  {
                let obj = {}
                obj["key"] = tag
                obj["title"] = tag
                obj["bgcolor"] = "#EB5A46"
                return obj
            })
        }
        return newcard
    }

    setDeclaratie() {
        const prcat = this.state.productCategory
        const prcode = this.state.product
        const afspraken = this.state.afspraken
        const tgs = afspraken.map((tag) =>  {
            let obj = {}
            obj["key"] = tag
            obj["title"] = tag
            obj["bgcolor"] = "#EB5A46"
            return obj
        })

        // let PQ = {}
        // PQ["title"] = "P:50 x Q:20 = 1000"
        // PQ["bgcolor"] = "#0079BF"
        // tgs.push(PQ)

        const newcard = {
            id: "Declaratie_" + prcode + "_" + this.state.zorgaanbieder + "_" + this.state.gemeente,
            title: this.state.zorgaanbieder,
            label: this.state.gemeente,
            description: prcode + ": " + this.getProduct(prcode) + "\P:50 x Q:20 = 1000",
            tags: tgs
        }
        return newcard
    }

    completeCard = () => {
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'COMPLETED',
            card: {id: 'Milk', title: 'Buy Milk', label: '15 mins', description: 'Use Headspace app'}
        })
        this.state.eventBus.publish({type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: 'Milk'})
    }

    addCaseCard = () => {
        
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'CASUS',
            card: this.setCase()
        })
    }

    addBerichtCard = (bericht, laneId, card) => {
        
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: laneId,
            card: this.setBericht(bericht, card)
        })
    }

    addAfspraakCard = () => {
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'INKOOP',
            card: this.setAfspraak()
        })
    }

    addDeclaratieCard = () => {
        
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'DECLARATIE',
            card: this.setDeclaratie()
        })
    }

    modifyCardTitle = () => {
        const data = this.state.boardData
        const newData = update(data, {lanes: {0: {cards: {0: {tags: {$set: [{"title": "High", "color": "white", "bgcolor": "#EB5A46"}]}}}}}})
        this.setState({boardData: newData})
      }


    shouldReceiveNewData = nextData => {
        console.log('New card has been added')
        const data = this.state.boardData
        const newData = update(data, {lanes: {$set: nextData.lanes}})
        this.setState({boardData: newData})     
    }

	handleCardAdd = (card, laneId) => {
		console.log(`New card added to lane ${laneId}`)
        console.dir(card)

    }

    handleCardClick = (cardId) => {
        console.log(card)
        const card = this.getCard('DECLARATIE', cardId)
        if (this.compareLaneAndCard('TOEWIJZINGEN',card)) {
            this.addBerichtCard('303d-304', 'DECLARATIE', card)
        }
    }

    handleCaseChange(casus) {
        this.setState({case: casus});
    }

    handleProductCategoryChange(pc) {
        this.setState({productCategory: pc});
    }

    handleProductChange(pr) {
        this.setState({product: pr});
    }

    handleAfspraakChange(afs) {
        const afspraken = afs.map((afspraak) => {return afspraak.label})
        this.setState({afspraken: afspraken});
    }

    handleGemeenteChange(gem) {
        this.setState({gemeente: gem});
    }

    handleZorgaanbiederChange(zb) {
        this.setState({zorgaanbieder: zb});
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h3>Future Lane iSociaal</h3>
                </div>
                <div className="App-intro">
                <div className="wrapper">
                <div>
                    <CaseForm casus={this.state.case} onCaseChange={this.handleCaseChange} />
                    <button onClick={this.addCaseCard} style={{margin: 5}}>
                        Voeg Casus toe
                    </button> Casus {this.state.case}
                
                </div>
                
                <ProductForm 
                    products={this.state.products} 
                    prcode={this.state.product} 
                    prcat={this.state.productCategory} 
                    afspraak={this.state.afspraak} 
                    onProductChange={this.handleProductChange} 
                    onProductCategoryChange={this.handleProductCategoryChange} 
                    onAfspraakChange={this.handleAfspraakChange}
                      
                />
            
                <GemeenteForm gemeente={this.state.gemeente} onGemeenteChange={this.handleGemeenteChange} />

                <ZorgaanbiederForm zorgaanbieder={this.state.zorgaanbieder} onZorgaanbiederChange={this.handleZorgaanbiederChange} />

                    <AfspraakForm afspraken={this.state.afspraken} onAfspraakChange={this.handleAfspraakChange} />

                    <button onClick={this.addAfspraakCard} style={{margin: 5}}>
                        Maak afspraak
                    </button>

                    <button onClick={this.addDeclaratieCard} style={{margin: 5}}>
                        Declareer
                    </button>

                </div>


                </div>
                    <Board
                        //editable
                        onCardAdd={this.handleCardAdd}
                        onCardClick={this.handleCardClick}                
                        data={this.state.boardData}
                        draggable
                        onDataChange={this.shouldReceiveNewData}
                        eventBusHandle={this.setEventBus}
                        handleDragStart={this.handleDragStart}
                        handleDragEnd={this.handleDragEnd}
                        tagStyle={{fontSize: '80%'}}
                        style={{backgroundColor: 'darkorchid'}}
                        
                    />
                </div>
        )
    }
}

export default App
