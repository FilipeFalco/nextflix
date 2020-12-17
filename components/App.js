class App extends Component {
    constructor() {
        super()
        this.state = {
            movies:[],
            searchTerms: ''
        }
        this.apiKey = process.env.MOVIEDB_KEY
    }

    handleSubmit = () => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerms}`)
        .then(data => data.json())
        .then(data => {
            this.setState({ movies })
        })
    }
}