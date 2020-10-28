import React from 'react'

const CountrySearch = ({search, handleSearch}) =>  {

    return (
        <div>
            find countries <input value={search} onChange={handleSearch}/>
        </div>
        )
}

export default CountrySearch