import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
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
      display: 'flex',
    },
    centerCard: {
      marginBottom: '2rem',
      marginTop: '2rem',
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
      display: 'block',
      fontSize: '1.6rem',
    },
    paperCard: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      minHeight: '22rem',
    },
    media: {
      height: '20rem',
    },
    cardContent: {
      textAlign: 'center',
      marginTop: '3rem',
    },
  }),
)
