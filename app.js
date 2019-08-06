const API = 'https://acme-users-api-rev.herokuapp.com/api'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            products: [],
            companies: []
        }
    }
    render() {
        Promise.all([
            fetch(`${API}/products`),
            fetch(`${API}/companies`)
        ]).then(responses => {
            return Promise.all(responses.map(response => response.json()))
        }).then(([products, companies]) => {
            this.setState({companies, products})
        })
        const {products, companies} = this.state
        const h1DataCount = React.createElement('h1', null, `Acme - We have ${products.length} Products and ${companies.length} Companies`)
        const ulProducts = React.createElement('ul', null, products.map(product => React.createElement('li', null, product.name)))
        const ulCompanies = React.createElement('ul', null, companies.map(company => React.createElement('li', null, company.name)))
        const divDataContainer = React.createElement('div', {id: 'data'}, ulProducts, ulCompanies)
        return React.createElement('div', null, h1DataCount, divDataContainer)
    }
}

const root = document.getElementById('app-root')
ReactDOM.render(React.createElement(App), root)