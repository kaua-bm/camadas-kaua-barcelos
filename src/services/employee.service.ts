import { Employee, NewEmployee } from '../types'
import { NotFound, RuleViolation } from '../errors'
import { EmployeeRepository } from '../repositories/employee.repository'
import { CompanyRepository } from '../repositories/company.repository'

const MIN_SALARY = 1518
const INSS_RATE = 0.11

export class EmployeeService {
  constructor(
    private employees: EmployeeRepository,
    private companies: CompanyRepository
  ) {}

  async create(data: NewEmployee): Promise<Employee> {
    const company = this.companies.findById(data.companyId)
    if (!company) throw new NotFound('company')

    if (data.salary < MIN_SALARY) {
      throw new RuleViolation('salary below minimum wage')
    }

    const inss = data.salary * INSS_RATE
    const net = Math.round((data.salary - inss) * 100) / 100

    return this.employees.save({
      name: data.name,
      email: data.email,
      gross_salary: data.salary,
      net_salary: net,
      company_id: data.companyId
    })
  }

  async findByCompany(companyId: number): Promise<Employee[]> {
    return this.employees.findByCompany(companyId)
  }
}