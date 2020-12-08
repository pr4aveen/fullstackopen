import React from 'react'
import CountryInfo from './CountryInfo'

const Filter = ({countries, setCountries}) => {
    if (countries.length > 10) {
      return <div>too many results</div> 
    } else if (countries.length === 1) {
      return <CountryInfo data={countries["0"]} />
    } else if (countries.length === 0) {
      return <div>no data found</div>
    } else {
      return countries.map(entry => {
        return (
            <div key={entry.name}>
                {entry.name} 
                <button onClick={() => setCountries([entry])}>
                    show
                </button>
            </div>)
    })
  }
}

export default Filter