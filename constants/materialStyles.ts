import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
    },
    heading: {
      fontSize: '2rem',
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
    },
    h4Style: {
      marginBottom: '2rem',
      fontSize: '2rem',
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
      justifyContent: 'center',
    },
    centerCard: {
      marginBottom: '2rem',
      marginTop: '2rem',
      marginLeft: '2rem',
      width: '100%',
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
    },
    paperCard: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      minHeight: '22rem',
    },
    card: {
      width: '40rem',
      height: '100%',
      display: 'block',
    },
    media: {
      height: '30rem',
    },
    cardContent: {
      textAlign: 'center',
      marginTop: '3rem',
    },
    flyerRoot: {
      maxWidth: '90%',
      marginLeft: '2rem',
      marginRight: '2rem',
      maxHeight: '100%',
      '@media (max-width: 700px)': {
        maxWidth: '100%',
        marginLeft: '0rem',
        marginRight: '0rem',
        marginTop: '2rem',
      },
    },
    flyerMedia: {
      height: '20rem',
      width: 'auto',
    },
    flyerCardContent: {
      textAlign: 'center',
      width: '100%',
      height: '10rem !important',
      justifyContent: 'center',
      backgroundColor: '#13395E',
      color: 'white',
    },
    flyerPaper: {
      backgroundColor: 'white',
      width: '50%',
      marginLeft: '50rem',
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
