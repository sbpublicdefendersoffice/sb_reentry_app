import { useState } from 'react'

export default function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState)

  return [
    fields,
    function (event) {
      setValues({
        ...fields,
        [event.target.name]: event.target.value,
      })
    },
  ]
}
