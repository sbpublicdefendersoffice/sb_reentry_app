import { Options } from 'sequelize'

export interface DatabaseEnvs {
  development: Options
  production: Options
}
