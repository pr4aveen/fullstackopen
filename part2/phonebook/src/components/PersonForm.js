import React from 'react'

const PersonForm = ({addEntry, handleNameInputChange, handleNumberInputChange}) => {
    return (<form onSubmit={addEntry}>
    <div>
      name: <input onChange={handleNameInputChange} />
    </div>
    <div>
      number: <input onChange={handleNumberInputChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>)
}

export default PersonForm