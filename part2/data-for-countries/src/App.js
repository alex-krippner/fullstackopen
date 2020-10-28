import React, {useState, useEffect} from 'react'
import axios from 'axios'

import CountrySearch from './components/CountrySearch'
import CountryData from './components/CountryData'
const App = () => {

    const [countriesDB, setCountriesDB] = useState([])
    const [search, setSearch] = useState('')
    const getCountriesData = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountriesDB(response.data)
                }
            )
    }
    useEffect(getCountriesData,[])
    
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const searchDB = (cntry, srch) =>{         
        const lowerCaseCntry = cntry.name.toLowerCase()
        const lowerCaseSrch = srch.toLowerCase()

        const result = lowerCaseCntry.includes(lowerCaseSrch)
        return result;
    }
    
    // write search functionality
    const searchResult = countriesDB.filter(country => searchDB(country, search)) 
    // display data

    return( 
        <div>
            <CountrySearch search={search} handleSearch={handleSearch}/>
            <CountryData searchResult={searchResult}/>
        </div>
    )
}

export default App