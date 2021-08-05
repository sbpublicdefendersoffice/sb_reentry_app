import React from 'react'
import {
  Grid,
  FormControl,
  Select,
  InputLabel,
  Input,
  Checkbox,
  Chip,
  MenuItem,
  ListItemText,
  Typography,
} from '@material-ui/core/'
import { useStyles, ENGLISH, categoryServiceFilter } from '../constants/'
import { useLanguage } from '../hooks/'
const FilterService = ({ fields, handleFieldsSelected, routeCategory }) => {
  const classes = useStyles()
  const { language } = useLanguage()
  let newServiceFilter =
    categoryServiceFilter[routeCategory][
      `${routeCategory.replace(' ', '')}ServiceCopy`
    ]
  return (
    <>
      {' '}
      <Grid item xs={6} className={classes.desktopFilterContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel
            id="demo-simple-select-label"
            className={classes.menuItem}
          >
            {language === ENGLISH ? 'Service' : 'Servicio'}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="serviceSelected"
            className={classes.menuItemContainer}
            value={fields.serviceSelected}
            multiple
            onChange={handleFieldsSelected}
            input={<Input />}
            renderValue={selected => (
              <div className={classes.chips}>
                {(selected as string[]).map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
          >
            {newServiceFilter[language].map(name => {
              return (
                <MenuItem key={name} value={name}>
                  <Checkbox
                    checked={fields.serviceSelected.indexOf(name) > -1}
                  />
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography className={classes.menuItem}>
                        {name}
                      </Typography>
                    }
                  />
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Grid>
    </>
  )
}

export default FilterService
