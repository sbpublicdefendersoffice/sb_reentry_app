import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Grid from '@material-ui/core/Grid'
import { useStyles } from '../constants/materialStyles'
const ImportantDocumentsAccordian = ({ activeCopy }) => {
  const classes = useStyles()
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography className={classes.heading}>
          {' '}
          {activeCopy.importantDocuments}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.fontSize}>
              {activeCopy.importantDocumentsDescription}
            </Typography>
            <Typography>
              <h4 className={classes.h4Style}>
                {activeCopy.importantDocumentsClick}
              </h4>
            </Typography>
            <Typography>
              <div>
                <a
                  className={classes.aBlock}
                  href="https://countyofsb.org/care/recorder/vital-records/births.sbc"
                >
                  {activeCopy.birthCertificate}
                </a>
                <a
                  className={classes.aBlock}
                  href="https://www.cdc.gov/nchs/w2w/index.htm"
                >
                  {activeCopy.birthCertificateOutside}
                </a>
                <a
                  className={classes.aBlock}
                  href="https://www.ssa.gov/ssnumber/"
                >
                  {activeCopy.socialSecurity}
                </a>
                <a
                  className={classes.aBlock}
                  href="https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/renew-your-driver-license-dl-or-identification-card-id/"
                >
                  {activeCopy.id}
                </a>
                <p className={classes.fontSize}>{activeCopy.disclaimer}</p>
              </div>
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
ImportantDocumentsAccordian.propTypes = {
  activeCopy: {},
}
export default ImportantDocumentsAccordian
