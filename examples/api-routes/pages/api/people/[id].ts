import { NextApiRequest, NextApiResponse } from 'next'
import { people } from '../../../data'
import { InferApiReturnType } from 'next/dist/shared/lib/utils'
import type { Person, ResponseError } from '../../../interfaces'

export type ABC = InferApiReturnType<typeof personHandler>

export default function personHandler(
  req: NextApiRequest,
  res: NextApiResponse<Person | ResponseError>
) {
  const { query } = req
  const { id } = query
  const person = people.find((p) => p.id === id)

  if (req.query.test === 'test') {
    return res.send('OK')
  }

  // // User with id exists
  return person
    ? res.status(200).json(person)
    : res.status(404).json({ message: `User with id: ${id} not found.` })
}
