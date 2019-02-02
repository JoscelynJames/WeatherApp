import React from 'react'

const SearchByZip = () => {
  return (
    <form className="zip-container">
      <input name="zipcode" type="number" className="zip-code-input" />
      <button htmlFor="zipcode" type="submit" className="zip-code-submit">
        Search
      </button>
    </form>
  )
}

export default SearchByZip
