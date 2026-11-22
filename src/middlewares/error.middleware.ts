import { Request, Response, NextFunction } from 'express'
import { InvalidInput, NotFound, RuleViolation } from '../errors'

export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof InvalidInput) {
    res.status(400).json({ error: error.message, fields: error.fields })
  } else if (error instanceof NotFound) {
    res.status(404).json({ error: error.message })
  } else if (error instanceof RuleViolation) {
    res.status(422).json({ error: error.message })
  } else {
    console.error(error)
    res.status(500).json({ error: 'internal server error' })
  }
}