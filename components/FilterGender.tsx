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
import { useStyles, ENGLISH, genderCopy } from '../constants/'
import { useLanguage } from '../hooks/'
const FilterGender = ({ fields, handleFieldsSelected }) => {
  const classes = useStyles()
  const { language } = useLanguage()
  return (
    <>
      <Grid item md={3} className={classes.desktopFilterContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel
            id="demo-simple-select-label"
            className={classes.menuItem}
          >
            {language === ENGLISH ? 'Gender' : 'Género'}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="genderSelected"
            value={fields.genderSelected}
            multiple
            className={classes.menuItemContainer}
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
            {genderCopy[language].map(name => {
              return (
                <MenuItem key={name} value={name}>
                  <Checkbox
                    checked={fields.genderSelected.indexOf(name) > -1}
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

export default FilterGender
