import React, { useState } from 'react'

type Props = {
  state: any
  setState: (e: any) => void
  id: any
}

export const Person = ({ state, setState, id }: Props) => {
  let inputName = `produto${id}`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setState({
      ...state,
      [name]: value,
    })
  }

  return (
    <div className='m-3'>
      <input
        className='border p-1'
        type='text'
        name={inputName}
        placeholder='digite'
        value={state[inputName]}
        onChange={handleChange}
      />
    </div>
  )
}
