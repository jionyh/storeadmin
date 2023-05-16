import React, { useState } from 'react'
import { Person } from '@/components/Person'

function BookingForm() {
  const [persons, setPerson] = useState([1])
  const [state, setState] = useState({
    produto1: '',
  })

  let handleAddPerson = (e: any) => {
    setPerson([...persons, persons.length + 1])
    console.log(e)
  }

  return (
    <>
      {persons.map((i) => (
        <Person
          state={state}
          setState={setState}
          id={i}
          key={persons.length + Math.random()}
        />
      ))}
      <button
        onClick={handleAddPerson}
        className='btn btn-main mt-2'>
        <i className='fas fa-plus'></i> ADD PERSON
      </button>
    </>
  )
}

export default BookingForm
