/* eslint-disable */
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
} from '@mui/material'
import { useStyles, ENGLISH, cityCopy } from '../constants/'
import { useLanguage } from '../hooks/'

const FilterCity = ({ fields, handleFieldsSelected }) => {
  const classes = useStyles()
  const { language } = useLanguage()
  return (
    <>
      {' '}
      <Grid item xs={12} lg={6} className={classes.desktopFilterContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel
            id="demo-simple-select-label"
            className={classes.menuItem}
          >
            {language === ENGLISH ? 'City' : 'Ciudad'}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="citySelected"
            value={fields.citySelected}
            className={classes.menuItemContainer}
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
            {cityCopy.map(name => {
              return (
                <MenuItem key={name} value={name} className={classes.menuItem}>
                  <Checkbox checked={fields.citySelected.indexOf(name) > -1} />
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

export default FilterCity
