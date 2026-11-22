import { NewEmployee } from '../types'
import { InvalidInput } from '../errors'

// Valida apenas o FORMATO dos dados. Regras de negócio ficam no service.
export function employeeDTO(body: unknown): NewEmployee {
  const b = (body ?? {}) as Record<string, unknown>
  const invalid: string[] = []

  const name = typeof b.name === 'string' ? b.name.trim() : ''
  if (name.length < 3) invalid.push('name')

  const email = typeof b.email === 'string' ? b.email.trim() : ''
  if (!email.includes('@')) invalid.push('email')

  const salary = Number(b.salary)
  const salaryGiven = b.salary !== undefined && b.salary !== null && b.salary !== ''
  if (!salaryGiven || !Number.isFinite(salary)) invalid.push('salary')

  const companyId = Number(b.companyId)
  if (!Number.isInteger(companyId) || companyId <= 0) invalid.push('companyId')

  if (invalid.length > 0) throw new InvalidInput(invalid)

  return { name, email, salary, companyId }
}