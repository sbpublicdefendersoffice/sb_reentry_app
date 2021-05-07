import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '90%',
      height: '100%',
      fontFamily: 'Roboto',
    },
    heading: {
      fontSize: '2rem',
      fontFamily: 'Roboto',
    },
    linkHeading: {
      fontSize: '2rem',
      fontFamily: 'Roboto',
      display: 'block',
      cursor: 'pointer',
      borderBottom: 'none !important',
      color: 'black !important',
      '&:hover': {
        backgroundColor: 'grey !important',
      },
    },

    accordDescription: {
      fontSize: '1.5rem',
      fontFamily: 'Roboto',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      minHeight: '10rem',
    },
    paperModal: {
      padding: theme.spacing(2),
      textAlign: 'center',
      marginTop: '2rem',
      margin: 'auto',
      width: '80%',
      color: theme.palette.text.secondary,
      height: '40rem',
      overflow: 'scroll',
      '@media (max-width: 500px)': {
        width: '100%',
        marginLeft: '0rem',
      },
    },
    fontSize: {
      fontSize: '1.6rem',
    },
    ulist: {
      listStyle: 'square',
      fontSize: '1.6rem',
      fontFamily: 'Roboto',
      marginTop: '2rem',
    },
    h4Style: {
      marginTop: '2rem',
      marginBottom: '2rem',
      fontSize: '2rem',
      width: '100%',
      textAlign: 'center',
      fontFamily: 'Roboto',
    },
    listItem: {
      marginBottom: '2rem',
      marginLeft: '2rem',
    },
    listItemText: {
      fontSize: '1.6rem',
      textAlign: 'center',
      justifyContent: 'center',
    },
    centerFlex: {
      fontSize: '1.6rem',
      textAlign: 'center',
      display: 'block',
      justifyContent: 'center',
      fontFamily: 'Roboto',
    },
    centerCard: {
      marginBottom: '2rem',
      marginTop: '2rem',
      marginLeft: '2rem',
      width: 'auto',
      textAlign: 'center',
      justifyContent: 'center',
    },
    pageDescription: {
      marginTop: '2rem',
      marginBottom: '2rem',
      padding: '2rem',
      fontSize: '1.8rem',
      textAlign: 'justify',
    },
    aBlock: {
      display: 'block !important',
      backgroundColor: 'none',
      margin: '1rem 1rem 1rem 1rem',
      fontSize: '1.8rem',
      minWidth: '40%',
      borderBottom: 'none',
    },
    paperCard: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      minHeight: '22rem',
    },

    media: {
      height: '30rem',
    },
    card: {
      width: '40rem',
      height: '100%',
      display: 'block',
      '@media (max-width: 700px)': {
        width: '100%',
      },
    },

    cardContent: {
      textAlign: 'center',
      marginTop: '3rem',
      overflow: 'auto',
      pointerEvents: 'auto',
    },
    checklistRoot: {
      width: '100%',
    },
    checklistHeading: {
      fontSize: '1.5rem',
    },
    checklistPaper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      minHeight: '10rem',
    },
    checklistPaperCard: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      minHeight: '22rem',
    },
    flyerRoot: {
      maxWidth: '90%',
      marginLeft: '2rem',
      marginRight: '2rem',
      height: '18rem',
      '@media (max-width: 700px)': {
        maxWidth: '100%',
        marginLeft: '0rem',
        marginRight: '0rem',
        marginTop: '2rem',
      },
    },

    flyerCardContent: {
      textAlign: 'center',
      width: '100%',

      height: '18rem !important',
      justifyContent: 'center',
      backgroundColor: '#13395E',
      color: 'white',
    },
    flyerMedia: {
      width: '12rem',
      height: '13.5rem',
      overflow: 'auto',
    },
    flyerPaper: {
      backgroundColor: 'white',
      width: '50%',
      height: '100%',
      position: 'fixed',
      top: '50%',
      transform: 'translateY(-50%)',
      padding: '1rem',
      borderColor: 'white !important',
      overflow: 'auto',
      maxHeight: '70rem',
      '@media (max-width: 500px)': {
        width: '100%',
        marginLeft: '0rem',
      },
    },

    flyerIcons: {
      position: 'fixed',
      color: '#13395e',
      margin: 'auto',
      fontSize: '3rem',
    },
    flyerImage: {
      position: 'fixed',
      width: ' 50%',
      marginLeft: '30rem',

      fontSize: '3rem',
      '@media (max-width: 500px)': {
        marginTop: '10rem',
        width: '100%',
        marginLeft: '-3rem',
      },
    },
  }),
)
