const API = 'https://acme-users-api-rev.herokuapp.com/api'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            products: [],
            companies: [],
            view: ''
        }
    }
    componentDidMount() {
        /* api calls */
        Promise.all([
            fetch(`${API}/products`),
            fetch(`${API}/companies`)
        ]).then(responses => {
            return Promise.all(responses.map(response => response.json()))
        }).then(([products, companies]) => {
            this.setState({companies, products})
        })
        /* setups */
        const hashLoader = (ev = {}) => {
            let view = window.location.hash.slice(1)
            view = view ? view : 'companies'
            this.setState({ view })
        }
        window.addEventListener('hashchange', ev => hashLoader(ev))
        hashLoader()
    }
    render() {
        const { companies, products, view } = this.state
        const nav = React.createElement(Nav, { companies, products, view })
        const chosenView = view === 'companies' ? React.createElement(CompanyList, { companies }) : React.createElement(ProductList, { products })
        return React.createElement('div', null, nav, chosenView)
    }
}

const root = document.getElementById('app-root')
ReactDOM.render(React.createElement(App), root)