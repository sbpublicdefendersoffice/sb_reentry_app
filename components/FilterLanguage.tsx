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
} from '@material-ui/core/'
import { useStyles, ENGLISH, languageCopy } from '../constants/'
import { useLanguage } from '../hooks/'
const FilterLanguage = ({ fields, handleFieldsSelected }) => {
  const classes = useStyles()
  const { language } = useLanguage()
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label" className={classes.menuItem}>
        {language === ENGLISH ? 'Language' : 'Idioma'}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name="languageSelected"
        value={fields.languageSelected}
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
        {languageCopy[language].map(name => {
          return (
            <MenuItem key={name} value={name}>
              <Checkbox checked={fields.languageSelected.indexOf(name) > -1} />
              <ListItemText
                disableTypography
                primary={
                  <Typography className={classes.menuItem}>{name}</Typography>
                }
              />
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default FilterLanguage
