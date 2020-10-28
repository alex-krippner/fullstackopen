import React  from 'react'

import CountryFactsBreakdown from './CountryFactsBreakdown'
import CountryListItem from './CountryListItem'

const CountryData = ({searchResult}) => {

    return (
        <div>
            {searchResult.length > 10 ? 'Too many matches, specify another filter' : searchResult.map((country,idx, array) => {
                let resultOutput;
                if (array.length <= 10) resultOutput = <CountryListItem country={country} />
                if (array.length === 1) resultOutput = <CountryFactsBreakdown country={country}/>
                
                return (
                <div key={country.alpha2Code}>{resultOutput}</div>
                    )
                })
            }
        </div>
    )
}

export default CountryData