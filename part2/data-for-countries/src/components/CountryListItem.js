import React, {useState} from 'react'

import CountryFactsBreakdown from './CountryFactsBreakdown'



const CountryListItem = ({country}) => {
    const [showCountry, setShowCountry] = useState(false)

    const handleShowCountry = () => {
        setShowCountry(!showCountry)
    }
    
    return (
        <div>
            {country.name} <button onClick={handleShowCountry}>show</button>
           {showCountry ?  <CountryFactsBreakdown country={country}/> : ''}
        </div>

    )
}

export default CountryListItem