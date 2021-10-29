import { makeStyles, createStyles } from '@mui/styles'
import { Theme } from '@mui/material'
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '90%',
      height: '100%',
      margin: 'auto',
      fontFamily: 'Roboto',
      textAlign: 'center',
    },
    landingPageContainer: {
      width: '100%',
      textAlign: 'center',
    },
    heading: {
      fontSize: '2rem !important',
      fontFamily: 'Roboto',
      textAlign: 'left',
      '@media (max-width: 1000px)': {
        textAlign: 'center !important',
        margin: 'auto',
      },
    },
    menu: {
      paddingTop: '0 !important',
      color: 'pink',
    },
    dropDownItems: {
      color: 'white !important',
      backgroundColor: '#13385e !important',
    },
    dropDownBurgerItems: {
      color: 'white !important',
      backgroundColor: '#13385e !important',
      marginLeft: '1.2rem !important',
    },
    subMenuItem: {
      wordWrap: 'break-word',
      color: 'var(--light)',
      fontSize: 'var(--med-text)',
      display: 'block !important',
      margin: '0 var(--margin-std)',
      borderBottom: '0.25rem solid transparent',
      fontWeight: 100,
      '&:hover': {
        borderBottom: '.25rem solid #00a968',
      },
    },
    subMenuItemInButton: {
      wordWrap: 'break-word',
      color: 'var(--light)',
      fontSize: 'var(--med-text)',
      margin: '0 var(--margin-std)',
      borderBottom: '0.25rem solid transparent',
      fontWeight: 100,
      marginLeft: '2rem',
    },
    badge: {
      '& > *': {
        margin: '1rem',
      },
    },
    linkHeading: {
      fontSize: '2rem',
      fontFamily: 'Roboto',
      display: 'block',
      cursor: 'pointer',
      borderBottom: 'none !important',
      color: 'black !important',
      '&:hover': {
        borderBottom: '.25rem solid #00a968',
      },
    },
    accordDescription: {
      fontSize: '1.5rem !important',
      fontFamily: 'Roboto !important',
      width: '100%',
      padding: '.4rem !important',
      display: 'inline-flex !importnat',
      textAlign: 'justify',
      wordBreak: 'break-word',
      '@media (max-width: 1275px)': {
        textAlign: 'center',
        padding: '3rem',
      },
    },
    greenButton: {
      textAlign: 'center',
      backgroundColor: '#04A868 !important',
      color: 'white !important',
      marginBottom: '1rem !important',
    },
    disabledButton: {
      textAlign: 'center',
      // backgroundColor: '#04A868 !important',
      // color: 'white !important',
      marginBottom: '1rem !important',
    },
    accordDescriptionLink: {
      fontSize: '1.5rem',
      fontFamily: 'Roboto',
      textAlign: 'center',
      wordBreak: 'break-word',
      cursor: 'pointer',
      overflow: 'auto !important',
      borderBottom: 'none !important',
      color: '#12385e !important',
      '@media (max-width: 1275px)': {
        margin: 'auto',
        textAlign: 'center',
      },
      '&:hover': {
        borderBottom: '.25rem solid green !important',
      },
    },
    formControl: {
      margin: '1rem',
      minWidth: 120,
      maxWidth: 300,
      fontSize: '2rem',
      display: 'flex',
    },
    desktopFilterContainer: {
      flexBasis: '0rem',
      display: 'flex',
      margin: 'auto',
      marginBottom: '2rem',
      justifyContent: 'center',
      '@media (max-width: 1275px)': {
        margin: '1rem',
      },
    },
    menuItemContainer: {
      display: 'flex',
      fontSize: '1.4rem',
      height: 'auto',
      minWidth: '13rem',
    },
    menuLabel: {
      fontSize: '1.4rem',
      '@media (max-width: 1275px)': {
        margin: 'auto',
        width: '8rem',
      },
    },
    menuItem: {
      fontSize: '1.4rem',
      '@media (max-width: 1275px)': {
        margin: 'auto',
        width: '14rem',
      },
    },
    paper: {
      padding: '1.2rem',
      textAlign: 'center',
      color: '#12385E !important',
      minHeight: '10rem',
    },
    paperModal: {
      padding: '1.2rem',
      textAlign: 'center',
      marginTop: '2rem',
      margin: 'auto',
      width: '80%',
      color: '#12385E !important',
      overflow: 'scroll',
      '@media (max-width: 500px)': {
        width: '100%',
        marginLeft: '0rem',
      },
    },
    filterModal: {
      top: '45%',
      left: '50%',
      transform: `translate(-50%, -50%)`,
    },
    landingPageDescription: {
      fontSize: '1.6rem',
      '@media (max-width: 500px)': {
        width: '100%',
        marginLeft: '1rem',
      },
    },
    aboutPaper: {
      textAlign: 'center',
      width: '80%',
      margin: 'auto',
      justifyContent: 'center',
      display: 'flex',
      color: 'black',
    },
    aboutPaperIconCards: {
      padding: '1.2rem',
      textAlign: 'center',
      width: '30rem',
      minWidth: '11rem',
      color: 'black',
      overflow: 'hidden',
    },
    appBar: {
      top: 'auto !important',
      bottom: 0,
      backgroundColor: '#12385E !important',
      display: 'none !important',
      justifyContent: 'space-between',
      '@media (max-width: 1275px)': {
        display: 'flex !important',
      },
    },
    footerIcons: {
      flexGrow: 1,
    },
    aboutP: {
      width: '80%',
      fontSize: '1.6rem',
      margin: 'auto',
      marginTop: '2rem',
      marginBottom: '2rem',
    },
    fontSize: {
      fontSize: '1.6rem',
    },
    checkMarks: {
      fontSize: '1.6rem',
      padding: '.2rem',
    },
    ulist: {
      listStyle: 'square',
      fontSize: '1.6rem',
      fontFamily: 'Roboto',
      marginTop: '2rem',
      textAlign: 'left',
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
    paperFilter: {
      position: 'absolute',
      width: 400,
      backgroundColor: '#12385E !important',
      border: '2px solid #000',
      boxShadow: 'initial',
      padding: '1.4rem',
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
      fontSize: '1.8rem !important',
      minWidth: '40%',
      borderBottom: 'none',
    },
    paperCard: {
      padding: '1.2rem',
      textAlign: 'center',
      color: '#12385E !important',
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
    icons: {
      color: '#13395e',
      margin: 'auto',
      fontSize: '8rem !important',
      '@media (max-width: 500px)': {
        flexGrow: 3,
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
      padding: '1.2rem',
      textAlign: 'center',
      color: '#12385E !important',
      minHeight: '10rem',
    },
    checklistPaperCard: {
      padding: '1.2rem',
      textAlign: 'center',
      color: '#12385E !important',
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
    arraignIconsM: {
      display: 'flex',
      marginLeft: '5.5rem',
      '@media (max-width: 700px)': {
        textAlign: 'center',
        marginLeft: '14rem',
      },
      '@media (max-width: 500px)': {
        textAlign: 'center',
        marginLeft: '8.5rem',
      },
    },
    arraignIcons: {
      display: 'flex',
      textAlign: 'center',
      marginLeft: '14rem',
      '@media (max-width: 700px)': {
        textAlign: 'center',
        marginLeft: '15rem',
      },
      '@media (max-width: 500px)': {
        textAlign: 'center',
        marginLeft: '8rem',
      },
    },
    arraignPP: {
      width: '95%',
      display: 'flex',
      marginTop: '1.5rem',
      marginBottom: '2rem',
      '@media (max-width: 700px)': {
        textAlign: 'center',
        width: '90%',
        display: 'flex',
        marginLeft: '1.5rem',
      },
      '@media (max-width: 500px)': {
        textAlign: 'center',
        width: '85%',
        display: 'flex',
        marginLeft: '1.5rem',
      },
    },
    arraignP: {
      width: '90%',
      display: 'flex',
      marginTop: '1.5rem',
      marginBottom: '2rem',
      '@media (max-width: 700px)': {
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        padding: '2rem',
      },
      '@media (max-width: 500px)': {
        textAlign: 'center',
        width: '95%',
        display: 'flex',
      },
    },
    arraignTextCenter: {
      marginTop: '1rem',
      '@media (max-width: 700px)': {
        textAlign: 'center',
      },
    },
    flyerCardContent: {
      textAlign: 'center',
      width: '100%',
      height: '23rem !important',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: '#13395E',
      color: 'white',
      '@media (max-width: 700px)': {
        height: 'auto !important',
      },
    },
    downloadButtons: {
      marginTop: '3rem !important',
      '@media (max-width: 700px)': {
        margin: 'auto !important',
      },
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
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 4,
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
