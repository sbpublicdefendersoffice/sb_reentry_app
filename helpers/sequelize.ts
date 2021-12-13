import { Sequelize, DataTypes, ModelOptions } from 'sequelize'
import { serialize } from 'v8'

import postgresEnv from '../constants/database-creds'
import { AllModels } from '../types/sequelize'

const { TEXT, INTEGER, FLOAT, DATE, BOOLEAN, ARRAY, UUID } = DataTypes
const opt: ModelOptions = { timestamps: false }

let sql,
  orgObj,
  locObj,
  servObj,
  schObj,
  useObj,
  clientObj,
  cboObj,
  locOrgObj,
  servLocObj,
  schLocObj,
  servOrgObj,
  schOrgObj

const initDb = (): AllModels => {
  try {
    if (!sql) {
      sql = new Sequelize(postgresEnv)

      sql
        .authenticate()
        .then(() => {
          console.log('SQL database connection established')
        })
        .catch(err => {
          console.error(`Unable to connect to SQL database: ${err}`)
        })

      orgObj = sql.define(
        'organizations',
        {
          // id: { primaryKey: true, type: INTEGER },
          name_english: { type: TEXT },
          name_spanish: { type: TEXT },
          website: { type: TEXT },
          languages_spoken_english: { type: TEXT },
          languages_spoken_spanish: { type: TEXT },
          customers_served_english: { type: TEXT },
          customers_served_spanish: { type: TEXT },
          notes_english: { type: TEXT },
          notes_spanish: { type: TEXT },
          categories_english: { type: ARRAY(TEXT) },
          categories_spanish: { type: ARRAY(TEXT) },
          tags_english: { type: ARRAY(TEXT) },
          tags_spanish: { type: ARRAY(TEXT) },
        },
        opt,
      )

      locObj = sql.define(
        'locations',
        {
          // id: {
          //   primaryKey: true,
          //   // type: UUID,
          //   autoIncrement: true,
          //   // allowNull: false,
          // },
          latitude: { type: FLOAT },
          longitude: { type: FLOAT },
          zip: { type: INTEGER },
          city: { type: TEXT },
          name: { type: TEXT },
          website: { type: TEXT },
          address: { type: TEXT },
          address_2: { type: TEXT },
          state: { type: TEXT },
          phone: { type: TEXT },
          email: { type: TEXT },
          notes: { type: TEXT },
        },
        opt,
      )

      servObj = sql.define(
        'services',
        {
          // id: { primaryKey: true, type: INTEGER },
          name_english: { type: TEXT },
          name_spanish: { type: TEXT },
        },
        opt,
      )

      schObj = sql.define(
        'schedules',
        {
          // id: { primaryKey: true, type: INTEGER },
          open_time: { type: TEXT },
          close_time: { type: TEXT },
          days: { type: TEXT },
          notes: { type: TEXT },
        },
        opt,
      )

      useObj = sql.define(
        'is_this_usefuls',
        {
          // id: {
          //   primaryKey: true,
          //   type: INTEGER,
          // },
          created_at: {
            type: DATE,
          },
          is_useful: { type: BOOLEAN },
          route: { type: TEXT },
          language: { type: TEXT },
          comment: { type: TEXT },
        },
        opt,
      )

      clientObj = sql.define(
        'clients',
        {
          // id: {
          //   primaryKey: true,
          //   type: INTEGER,
          // },
          created_at: {
            type: DATE,
          },
          email: { type: TEXT },
          hasAppliedForExpungement: { type: BOOLEAN },
          hasBeenNotifiedOfExpungement: { type: BOOLEAN },
          expungementEmail: { type: TEXT },
          expungementXMessageId: { type: TEXT },
          commPrefs: { type: ARRAY(TEXT) },
          hashedPassword: { type: TEXT },
          verificationString: { type: TEXT },
          passwordResetCode: { type: TEXT },
          isVerified: { type: BOOLEAN },
        },
        opt,
      )

      cboObj = sql.define(
        'cbos',
        {
          created_at: {
            type: DATE,
          },
          org: { type: TEXT },
          orgId: { type: INTEGER },
          email: { type: TEXT },
          hashedPassword: { type: TEXT },
          verificationString: { type: TEXT },
          passwordResetCode: { type: TEXT },
          isVerified: { type: BOOLEAN },
        },
        opt,
      )
      locOrgObj = sql.define(
        'locations_organizations',
        {
          locations_id: { type: INTEGER },
          organizations_id: { type: INTEGER },
        },
        opt,
      )

      servOrgObj = sql.define(
        'services_organizations',
        {
          services_id: { type: INTEGER },
          organizations_id: { type: INTEGER },
        },
        opt,
      )

      servLocObj = sql.define(
        'services_locations',
        {
          services_id: { type: INTEGER },
          locations_id: { type: INTEGER },
        },
        opt,
      )

      schOrgObj = sql.define(
        'schedules_organizations',
        {
          schedules_id: { type: INTEGER },
          organizations_id: { type: INTEGER },
        },
        opt,
      )
      schLocObj = sql.define(
        'schedules_locations',
        {
          schedules_id: { type: INTEGER },
          locations_id: { type: INTEGER },
        },
        opt,
      )
      let tempArray = [servOrgObj, locOrgObj, schLocObj, servLocObj]
      tempArray.forEach(model => model.removeAttribute('id'))

      orgObj.belongsToMany(locObj, {
        through: 'locations_organizations',
        foreignKey: 'organizations_id',
      })

      orgObj.belongsToMany(servObj, {
        through: 'services_organizations',
        foreignKey: 'organizations_id',
      })

      orgObj.belongsToMany(schObj, {
        through: 'schedules_organizations',
        foreignKey: 'organizations_id',
      })
      locObj.belongsToMany(orgObj, {
        through: 'locations_organizations',
        foreignKey: 'locations_id',
      })

      locObj.belongsToMany(servObj, {
        through: 'services_locations',
        foreignKey: 'locations_id',
      })

      locObj.belongsToMany(schObj, {
        through: 'schedules_locations',
        foreignKey: 'locations_id',
      })

      servObj.belongsToMany(orgObj, {
        through: 'services_organizations',
        foreignKey: 'services_id',
      })

      servObj.belongsToMany(locObj, {
        through: 'services_locations',
        foreignKey: 'services_id',
      })

      schObj.belongsToMany(orgObj, {
        through: 'schedules_organizations',
        foreignKey: 'schedules_id',
      })

      schObj.belongsToMany(locObj, {
        through: 'schedules_locations',
        foreignKey: 'schedules_id',
      })

      sql
        .sync({ force: false })
        .then(() => console.log('Database models created'))
    }

    return {
      orgObj,
      locObj,
      servObj,
      schObj,
      useObj,
      clientObj,
      cboObj,
      servLocObj,
      locOrgObj,
      schLocObj,
      servOrgObj,
    }
  } catch (err) {
    console.error(`Error setting up database: ${err}`)
  }
}

export default initDb
