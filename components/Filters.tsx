import { useTheme, Theme } from '@material-ui/core/styles'
import { useLanguage } from '../hooks/'
import {
  Chip,
  Typography,
  Checkbox,
  FormControl,
  MenuItem,
  Grid,
  InputLabel,
  Input,
  Select,
  ListItemText,
} from '@material-ui/core'
import {
  cityCopy,
  genderCopy,
  languageCopy,
  categoryServiceFilter,
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
  routeCategory,
}: Filter) => {
  const classes = useStyles()
  const theme = useTheme()
  const { language } = useLanguage()
  let newServiceFilter =
    categoryServiceFilter[routeCategory][
      `${routeCategory.replace(' ', '')}ServiceCopy`
    ]
  return (
    <>
      <Grid container>
        <Grid item md={3}>
          <FormControl className={classes.formControl}>
            <InputLabel
              className={classes.menuItem}
              id="demo-simple-select-label"
            >
              {language === ENGLISH ? 'City' : 'Ciudad'}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="setCitySelected"
              value={citySelected}
              className={classes.menuItem}
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
                    className={classes.menuItem}
                    style={{ fontSize: '4rem !important' }}
                  >
                    <Checkbox checked={citySelected.indexOf(name) > -1} />
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
        <Grid item md={3}>
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
              name="setServiceSelected"
              className={classes.menuItem}
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
        <Grid item md={3}>
          <FormControl className={classes.formControl}>
            <InputLabel
              id="demo-simple-select-label"
              className={classes.menuItem}
            >
              {language === ENGLISH ? 'Language' : 'Idioma'}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="setLanguageSelected"
              value={languageSelected}
              className={classes.menuItem}
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
        <Grid item md={3}>
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
              name="setGenderSelected"
              value={genderSelected}
              multiple
              className={classes.menuItem}
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
      </Grid>
    </>
  )
}
export default CategoryFilters
