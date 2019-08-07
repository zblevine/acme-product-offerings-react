const API = 'https://acme-users-api-rev.herokuapp.com/api'

const Nav = ({companies, products, view}) => {
    const productLink = React.createElement('a', { href: '#products', className: view === 'products' ? 'active' : ''}, `Products (${products.length})`);
    const companyLink = React.createElement('a', { href: '#companies', className: view === 'companies' ? 'active' : ''}, `Companies (${companies.length})`);
    return React.createElement('div', {id: 'nav-btns'}, productLink, companyLink);
}

const CompanyList = ({companies}) => {
    const lis = companies.map(company => React.createElement('li', {key: company.id}, company.name));
    return React.createElement('ul', null, lis);
}

const ProductList = ({products}) => {
    const lis = products.map(product => React.createElement('li', {key: product.id}, `${product.name} - ${product.description}`));
    return React.createElement('ul', null, lis);
}

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
            console.log(companies);
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
        return React.createElement('div', null, nav, chosenView);
    }
}

const root = document.getElementById('app-root')
ReactDOM.render(React.createElement(App), root)