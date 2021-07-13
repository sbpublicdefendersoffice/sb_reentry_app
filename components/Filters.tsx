import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import { useTheme, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { useLanguage } from '../hooks/'
import { Chip } from '@material-ui/core'
import {
  cityCopy,
  genderCopy,
  languageCopy,
  ENGLISH,
  useStyles,
} from '../constants/'
import { Filter } from '../types/filter'
function getStyles(name: string, FilterName: string[], theme: Theme) {
  return {
    fontWeight:
      FilterName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}
const CategoryFilters = ({
  citySelected,
  serviceSelected,
  genderSelected,
  languageSelected,
  handleSelected,
  MenuProps,
  newServiceFilter,
}: Filter) => {
  const classes = useStyles()
  const theme = useTheme()
  const { language } = useLanguage()
  return (
    <>
      <Grid item xs={12} sm={12} md={3}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            {language === ENGLISH ? 'City' : 'Ciudad'}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="setCitySelected"
            value={citySelected}
            multiple
            onChange={handleSelected}
            input={<Input />}
            renderValue={selected => (
              <div className={classes.chips}>
                {(selected as string[]).map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {cityCopy.map(name => {
              return (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, citySelected, theme)}
                >
                  <Checkbox checked={citySelected.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            {language === ENGLISH ? 'Service' : 'Servicio'}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="setServiceSelected"
            value={serviceSelected}
            multiple
            onChange={handleSelected}
            input={<Input />}
            renderValue={selected => (
              <div className={classes.chips}>
                {(selected as string[]).map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {newServiceFilter[language].map(name => {
              return (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, serviceSelected, theme)}
                >
                  <Checkbox checked={serviceSelected.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            {language === ENGLISH ? 'Language' : 'Idioma'}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="setLanguageSelected"
            value={languageSelected}
            multiple
            onChange={handleSelected}
            input={<Input />}
            renderValue={selected => (
              <div className={classes.chips}>
                {(selected as string[]).map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {languageCopy[language].map(name => {
              return (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, languageSelected, theme)}
                >
                  <Checkbox checked={languageSelected.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            {language === ENGLISH ? 'Gender' : 'Género'}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="setGenderSelected"
            value={genderSelected}
            multiple
            onChange={handleSelected}
            input={<Input />}
            renderValue={selected => (
              <div className={classes.chips}>
                {(selected as string[]).map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {genderCopy[language].map(name => {
              return (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, genderSelected, theme)}
                >
                  <Checkbox checked={genderSelected.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Grid>
    </>
  )
}
export default CategoryFilters
