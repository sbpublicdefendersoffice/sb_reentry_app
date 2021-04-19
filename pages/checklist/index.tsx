import { useRouter } from 'next/router'
import Head from 'next/head'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Paper from '@material-ui/core/Paper'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { ENGLISH } from '../../constants/language'
import Grid from '@material-ui/core/Grid'
import { useLanguage, useGlobalSearch } from '../../hooks'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import ListItemText from '@material-ui/core/ListItemText'

const probations = [
  {
    name: 'Santa Maria PRRC',
    spanishName: 'Santa Maria PRRC',
    phone: '(805) 346-7620',
    address: '124 W Carmen Lane, Suite K',
    cityStateZip: 'Santa Maria, CA 93458',
  },
  {
    name: 'Santa Barbara PRRC',
    spanishName: 'Santa Barbara PRRC',
    phone: '(805) 692-4890',
    address: '4500 Hollister Avenue',
    cityStateZip: 'Santa Barbara, CA 93110',
  },
  {
    name: 'Santa Maria PRRC',
    spanishName: 'Santa Maria PRRC',
    phone: '(805) 346-7620',
    address: '124 W Carmen Lane, Suite K',
    cityStateZip: 'Santa Maria, CA 93458',
  },
  {
    name: 'Santa Barbara Adult Services',
    spanishName: 'Servicios para adultos de Santa Bárbara',
    phone: '(805) 882-3700',
    address: '117 East Carrillo Street',
    cityStateZip: 'Santa Barbara, CA 93101',
  },
  {
    name: 'Lompoc Adult & Juvenile Services',
    spanishName: 'Servicios para adultos y menores de Lompoc',
    phone: '(805) 737-7800',
    address: '415 East Cypress Avenue',
    cityStateZip: 'Lompoc, CA 93436',
  },
  {
    name: 'Santa Maria Adult & Juvenile Services',
    spanishName: 'Servicios para adultos y menores de Santa María',
    phone: '(805) 803-8500',
    address: '2121 South Centerpointe Parkway',
    cityStateZip: 'Santa Maria, CA 93455',
  },
  {
    name: 'Ventura County Regional Office',
    spanishName: 'Oficina Regional del Condado de Ventura',
    phone: '(805) 382-8151',
    address: '1555 West 5th Street, Suite #102',
    cityStateZip: 'Oxnard, CA 93030',
  },
  {
    name: 'San Luis Obispo Store Front',
    spanishName: 'Frente de la tienda de San Luis Obispo',
    phone: '(805) 347-0058',
    address: '1775 South McClellan Street',
    cityStateZip: 'Santa Maria, CA 93454',
  },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: '1.5rem',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      minHeight: '10rem',
    },
    paperCard: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      minHeight: '22rem',
    },
    link: { cursor: 'pointer' },
  }),
)

const Checklist = () => {
  const classes = useStyles()
  const { push } = useRouter()
  const { language } = useLanguage()
  const { setSearchResults } = useGlobalSearch()

  const pushToSearch = e => {
    const { title } = e.target
    if (title) {
      setSearchResults(null)
      push('/search', `search?query=${title}`)
    }
  }

  return (
    <div>
      <Head>
        <title>{`Santa Barbara Reentry | ${
          language === ENGLISH
            ? '72 hour checklist'
            : 'Lista de verificación de 72 horas'
        }`}</title>
      </Head>
      <Typography
        style={{ marginTop: '3rem' }}
        align="center"
        variant="h2"
        component="h2"
      >
        {language === ENGLISH
          ? '72 Hour Checklist'
          : 'Lista de verificación de 72 horas'}
      </Typography>
      <Typography
        style={{
          marginTop: '2rem',
          marginBottom: '2rem',
          padding: '2rem',
          textAlign: 'justify',
        }}
        align="center"
        variant="h5"
        component="h5"
      >
        {language === ENGLISH
          ? 'Welcome back. We are wishing you a successful transition back into Santa Barbara County. The first 72 hours can be an important part of your transitions. This guide will help you have a better understanding on some of the resources that you might need in those first days being out. We hope that these resources can help you in your transition needs and quality of life.'
          : 'Bienvenido de nuevo. Le deseamos una exitosa transición de regreso al condado de Santa Bárbara. Las primeras 72 horas pueden ser una parte importante de sus transiciones. Esta guía lo ayudará a comprender mejor algunos de los recursos que podría necesitar durante los primeros días de publicación. Esperamos que estos recursos puedan ayudarlo en sus necesidades de transición y calidad de vida.'}
      </Typography>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              {language === ENGLISH
                ? 'Report To Your Probation or Parole Officer'
                : 'Informe a su oficial de libertad condicional o bajo palabra'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  {' '}
                  <Typography>
                    {language === ENGLISH
                      ? 'When first releasing it is recommended to check in with your probation officer withing 24 hours, or as ordered by the Court, or as instructed by an officer. Please reach out to Probation or Parole in the resource below for any additional questions that you may have'
                      : 'Al ser liberado por primera vez, se recomienda que se registre con su oficial de libertad condicional dentro de las 24 horas, o según lo ordene el Tribunal, o según las instrucciones de un oficial. Comuníquese con Libertad condicional o Libertad bajo palabra en el recurso a continuación para cualquier pregunta adicional que pueda tener.'}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  {' '}
                  <Typography className={classes.heading}>
                    <h5>
                      {language === ENGLISH
                        ? 'Santa Barbara Probation Agency'
                        : 'Agencia de Libertad Condicional de Santa Bárbara'}
                    </h5>
                    <div
                      style={{
                        display: 'flex',
                        textAlign: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <p>
                        {' '}
                        {language === ENGLISH ? 'Website:' : 'Sitio web:'}{' '}
                      </p>
                      <a
                        href="https://www.sbprobation.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {' '}
                        https://www.sbprobation.org/
                      </a>
                    </div>
                  </Typography>
                </Paper>
              </Grid>
              <h2
                style={{
                  marginBottom: '2rem',
                  marginTop: '2rem',
                  width: '100%',
                  textAlign: 'center',
                  justifyContent: 'center',
                }}
              >
                {' Probation Report & Resource Center (PRRC)'}
              </h2>

              {probations.map((probation, key) => {
                return (
                  <Grid item xs={6} key={key} sm={4}>
                    <Paper className={classes.paperCard}>
                      <List>
                        <ListItem
                          style={{ fontWeight: 'bold', fontSize: '1.5rem' }}
                        >
                          <ListItemText
                            style={{
                              textAlign: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {probation.name}
                          </ListItemText>
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            style={{
                              textAlign: 'center',
                              justifyContent: 'center',
                            }}
                            primary={probation.phone}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            style={{
                              textAlign: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <div>{probation.address}</div>
                            <div>{probation.cityStateZip}</div>
                          </ListItemText>
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                )
              })}

              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <List>
                    <ListItem>
                      <ListItemText
                        style={{
                          textAlign: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div>
                          {language === ENGLISH
                            ? 'Division of Adult Parole Operations'
                            : 'División de Operaciones de Libertad Condicional para Adultos:'}{' '}
                        </div>
                        <div>
                          {'Website: '}
                          <a
                            href="https://www.cdcr.ca.gov/parole/northern-region-directory/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {language === ENGLISH
                              ? 'Northern County Directory'
                              : 'Directorio del norte del condado'}
                          </a>
                        </div>
                      </ListItemText>
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>
              {' '}
              {language === ENGLISH
                ? 'Important documents'
                : 'Documentos importantes'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography>
                  {language === ENGLISH
                    ? 'It is important that you have obtain these documents as soon as you can. They may be required to benefit from some of the resources provided of this application'
                    : 'Es importante que obtenga estos documentos lo antes posible. Es posible que deban beneficiarse de algunos de los recursos proporcionados en esta aplicación.'}
                </Typography>
                <Typography>
                  <h4 style={{ marginBottom: '2rem' }}>
                    {language === ENGLISH
                      ? 'Here are some of the most important documents to obtain'
                      : 'Estos son algunos de los documentos más importantes para obtener'}
                  </h4>
                </Typography>
                <Typography>
                  <div>
                    <a
                      style={{ display: 'block' }}
                      href="https://countyofsb.org/care/recorder/vital-records/births.sbc"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {language === ENGLISH
                        ? 'Birth Certificate (Santa Barbara County)'
                        : 'Certificado de nacimiento (condado de Santa Bárbara)'}
                    </a>
                    <a
                      style={{ display: 'block' }}
                      href="https://www.cdc.gov/nchs/w2w/index.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {language === ENGLISH
                        ? 'Birth Certificate (Outside of Santa Barbara County)'
                        : 'Certificado de nacimiento (fuera del condado de Santa Bárbara)'}
                    </a>
                    <a
                      style={{ display: 'block' }}
                      href="https://www.ssa.gov/ssnumber/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {language === ENGLISH
                        ? 'Social Security Card'
                        : 'Tarjeta de seguro Social'}
                    </a>
                    <a
                      style={{ display: 'block' }}
                      href="https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/renew-your-driver-license-dl-or-identification-card-id/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {language === ENGLISH
                        ? `Identification Card or Driver's License (California)`
                        : 'Tarjeta de identificación o licencia de conducir (California)'}
                    </a>
                    <p style={{ marginTop: '2rem' }}>
                      {language === ENGLISH
                        ? '* Obtaining or replacing some of these documents do have associated fees, but waivers are available.'
                        : '* Obtener o reemplazar algunos de estos documentos tiene tarifas asociadas, pero hay exenciones disponibles.'}
                    </p>
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>
              {language === ENGLISH
                ? 'Figuring out food resources you will need'
                : 'Averiguar los recursos alimentarios que necesitará'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography>
                  <div style={{ marginBottom: '2rem' }}>
                    {language === ENGLISH
                      ? 'Find a food pantry or place that is located in your area. There are also many food assistance programs that will support you with your needs'
                      : 'Busque una despensa de alimentos o un lugar que se encuentre en su área. También hay muchos programas de asistencia alimentaria que lo ayudarán con sus necesidades.'}
                  </div>
                </Typography>

                <Typography>
                  <h4 style={{ marginBottom: '2rem' }}>
                    {language === ENGLISH
                      ? 'Click on a category below to begin your reenty resource search'
                      : 'Haga clic en una categoría a continuación para comenzar su búsqueda de recursos de reingreso'}
                  </h4>
                </Typography>
                <Typography>
                  <div>
                    <a
                      title="pantry"
                      tabIndex={0}
                      className={classes.link}
                      style={{ display: 'block' }}
                      onClick={pushToSearch}
                    >
                      {language === ENGLISH
                        ? 'Food Pantries'
                        : 'Despensas de alimentos'}
                    </a>
                    <a
                      title="meals"
                      tabIndex={0}
                      className={classes.link}
                      style={{ display: 'block' }}
                      onClick={pushToSearch}
                    >
                      {language === ENGLISH
                        ? 'Food Meals'
                        : 'Comidas alimenticias'}
                    </a>
                    <a
                      title="cal fresh"
                      tabIndex={0}
                      className={classes.link}
                      style={{ display: 'block' }}
                      onClick={pushToSearch}
                    >
                      Cal-Fresh ({' '}
                      {language === ENGLISH
                        ? 'Food Stamps'
                        : 'Cupones de alimentos'}
                      )
                    </a>
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>
              {language === ENGLISH
                ? 'Address your medical needs'
                : 'Aborde sus necesidades médicas'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography>
                  {language === ENGLISH
                    ? 'Prioritize your medical needs. There are plenty of resources that you will find to get started below'
                    : 'Priorice sus necesidades médicas. Hay muchos recursos que encontrará para comenzar a continuación.'}
                </Typography>
                <Typography>
                  <h4 style={{ marginBottom: '2rem' }}>
                    {language === ENGLISH
                      ? 'Click on a category below to begin your search for medical resources'
                      : 'Haga clic en una categoría a continuación para comenzar su búsqueda de recursos médicos'}
                  </h4>
                </Typography>
                <Typography>
                  <div>
                    <a
                      title="medical"
                      tabIndex={0}
                      className={classes.link}
                      style={{ display: 'block' }}
                      onClick={pushToSearch}
                    >
                      Medi-Cal
                    </a>
                    <a
                      title="enrollment"
                      tabIndex={0}
                      className={classes.link}
                      style={{ display: 'block' }}
                      onClick={pushToSearch}
                    >
                      {language === ENGLISH
                        ? 'Health Insurance Information & Enrollment Assistance'
                        : 'Información sobre seguros médicos y asistencia para la inscripción'}
                    </a>
                    <a
                      title="clinic"
                      tabIndex={0}
                      className={classes.link}
                      style={{ display: 'block' }}
                      onClick={pushToSearch}
                    >
                      {language === ENGLISH
                        ? 'Medical Clinics'
                        : 'Clínicas Médicas'}
                    </a>
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>
              {language === ENGLISH
                ? 'Resources and support for those in sobriety'
                : 'Recursos y apoyo para quienes están sobrios'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography>
                  {language === ENGLISH
                    ? 'One of the greatest habits that you can create while re-entering into society is staying sober. Feel free to check out many of the resources that will support you through out your journey'
                    : 'Uno de los mejores hábitos que puede crear al volver a entrar en la sociedad es mantenerse sobrio. No dude en consultar muchos de los recursos que lo ayudarán a lo largo de su viaje.'}
                </Typography>
                <Typography>
                  <h4 style={{ marginBottom: '2rem' }}>
                    {language === ENGLISH
                      ? 'Click on a category below to begin your search for sober living resources'
                      : 'Haga clic en una categoría a continuación para comenzar su búsqueda de recursos para una vida sobria'}
                  </h4>
                </Typography>
                <Typography>
                  <div>
                    <a
                      title="sober living"
                      tabIndex={0}
                      className={classes.link}
                      style={{ display: 'block' }}
                      onClick={pushToSearch}
                    >
                      {language === ENGLISH
                        ? 'Sober Living Homes'
                        : 'Viviendas sobrias'}
                    </a>
                    <a
                      title="alcoholics anonymous"
                      tabIndex={0}
                      className={classes.link}
                      style={{ display: 'block' }}
                      onClick={pushToSearch}
                    >
                      AA
                    </a>
                    <a
                      title="narcotics anonymous"
                      tabIndex={0}
                      className={classes.link}
                      style={{ display: 'block' }}
                      onClick={pushToSearch}
                    >
                      NA
                    </a>
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>
              {language === ENGLISH
                ? 'Look into getting support for your mental health needs'
                : 'Busque apoyo para sus necesidades de salud mental'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography>
                  {language === ENGLISH
                    ? 'With all of the added pressure of re-entering into society we recommend reaching out for help if you feel you need this to be addressed'
                    : 'Con toda la presión adicional de reingresar a la sociedad, recomendamos buscar ayuda si cree que necesita que se aborde este problema.'}
                </Typography>
                <Typography>
                  <h4 style={{ marginBottom: '2rem' }}>
                    {language === ENGLISH
                      ? 'Click on a category below to begin your search for mental health resources'
                      : 'Haga clic en una categoría a continuación para comenzar su búsqueda de recursos de salud mental'}
                  </h4>
                </Typography>
                <Typography>
                  <div>
                    <a
                      title="mental health"
                      tabIndex={0}
                      className={classes.link}
                      style={{ display: 'block' }}
                      onClick={pushToSearch}
                    >
                      {language === ENGLISH
                        ? 'Mental Wellness Information and Education'
                        : 'Evaluación de bienestar mental'}
                    </a>
                    <a
                      tabIndex={0}
                      className={classes.link}
                      style={{ display: 'block' }}
                      onClick={() =>
                        push('/search/[id]', '/search/recncoC6502aH2qYs')
                      }
                    >
                      {language === ENGLISH
                        ? 'Behavioral Wellness'
                        : 'Bienestar conductual'}
                    </a>
                    {/* <a style={{ display: 'block' }} href="">
                      {language === ENGLISH
                        ? 'Suicide Prevention Hotlines'
                        : 'Líneas directas para la prevención del suicidio'}
                    </a>
                    <a style={{ display: 'block' }} href="">
                      {language === ENGLISH
                        ? 'General Crisis Intervention Hotlines'
                        : 'Líneas directas generales de intervención en casos de crisis'}
                    </a>

                    <a style={{ display: 'block' }} href="">
                      {language === ENGLISH
                        ? 'Psychiatric Response Hotline'
                        : 'Línea directa de respuesta psiquiátrica'}
                    </a> */}
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>
              {language === ENGLISH
                ? 'Start your Job Search'
                : 'Comience su búsqueda de empleo'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography>
                  {language === ENGLISH
                    ? 'Obtaining a job is critical for financial stability'
                    : 'Obtener un trabajo es fundamental para la estabilidad financiera'}
                </Typography>
                <Typography>
                  <h4 style={{ marginBottom: '2rem' }}>
                    {language === ENGLISH
                      ? 'Click on a category below to help begin your job search'
                      : 'Haga clic en una categoría a continuación para ayudarlo a comenzar su búsqueda de trabajo'}
                  </h4>
                </Typography>
                <Typography>
                  <div>
                    <a
                      style={{ display: 'block' }}
                      href="https://www.70millionjobs.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      70 Million Jobs
                    </a>
                    <a
                      style={{ display: 'block' }}
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                    <a
                      style={{ display: 'block' }}
                      href="https://www.indeed.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Indeed
                    </a>
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>
              {language === ENGLISH
                ? 'Tips for a successful re-entry'
                : 'Consejos para un reingreso exitoso'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography>
                  {language === ENGLISH
                    ? 'We are wishing you a successful transition into society. As you so there are many organinzations that are in Santa Barbara County that are willing to support. Dont be afraid to ask for help when you need. Your community believes in you!'
                    : 'Le deseamos una transición exitosa a la sociedad. Al igual que usted, hay muchas organizaciones en el condado de Santa Bárbara que están dispuestas a apoyar. No tema pedir ayuda cuando la necesite. ¡Tu comunidad cree en ti!'}
                </Typography>
                <Typography>
                  <h4 style={{ marginBottom: '2rem' }}>
                    {language === ENGLISH
                      ? 'Tips that can help'
                      : 'Consejos que pueden ayudar'}
                  </h4>
                </Typography>
                <Typography>
                  <div>
                    <ul style={{ listStyle: 'square' }}>
                      <li style={{ marginBottom: '2rem', marginLeft: '2rem' }}>
                        {language === ENGLISH
                          ? 'Build a community of support by reaching out to others who are living positive lives'
                          : 'Construya una comunidad de apoyo al acercarse a otras personas que están viviendo una vida positiva.'}
                      </li>
                      <li style={{ marginBottom: '2rem', marginLeft: '2rem' }}>
                        {language === ENGLISH
                          ? 'Staying sober is critical to staying focused in your goals'
                          : 'Mantenerse sobrio es fundamental para mantenerse enfocado en sus objetivos'}
                      </li>
                      <li style={{ marginBottom: '2rem', marginLeft: '2rem' }}>
                        {language === ENGLISH
                          ? 'Not being ashamed of your past. Recognizing that we all make mistakes and the community is welcoming you back into society with lots of resources that can help in your transition'
                          : 'No avergonzarse de su pasado. Reconocer que todos cometemos errores y que la comunidad le da la bienvenida a la sociedad con muchos recursos que pueden ayudarlo en su transición.'}
                      </li>
                      <li style={{ marginBottom: '2rem', marginLeft: '2rem' }}>
                        {language === ENGLISH
                          ? 'Watching your circle. Incareration often times is a test to see who is truly there for you. Choose the people you have around you wisely. This could be a big investment or a huge expense. Choose wisely'
                          : 'Observando tu círculo. La atención a menudo es una prueba para ver quién está realmente ahí para usted. Elija sabiamente a las personas que tiene a su alrededor. Esto podría ser una gran inversión o un gasto enorme. Elegir sabiamente'}
                      </li>
                    </ul>
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}
export default Checklist
