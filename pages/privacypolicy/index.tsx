import { PrivacyPolicyData } from '../../constants/privacypolicy-data'
import useLanguage from '../../hooks/useLanguage'
import { useStyles } from '../../constants/materialStyles'
const PrivacyPolicyPage = () => {
  const classes = useStyles()
  const { language } = useLanguage()
  const activeCopy = PrivacyPolicyData[language]
  return (
    <div style={{ width: '95%' }}>
      <h1
        style={{ marginTop: '7rem', marginBottom: '2rem', textAlign: 'center' }}
      >
        Privacy Policy
      </h1>
      <p className={classes.centerFlex}>
        {activeCopy.intro}
        <a
          style={{ color: 'black', borderBottom: 'none' }}
          href={activeCopy.twoelevenlink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {activeCopy.twoeleven}
        </a>{' '}
        {activeCopy.learnMore}
      </p>
      <h1 className={classes.h4Style}>{activeCopy.overview}</h1>{' '}
      <p className={classes.centerFlex}>{activeCopy.overviewDescription}</p>{' '}
      <h1 className={classes.h4Style}>{activeCopy.weCollect}</h1>
      <p className={classes.centerFlex}> {activeCopy.weCollectDescription} </p>
      <ul className={classes.ulist} style={{ margin: '2rem' }}>
        <li>{activeCopy.weCollectLineOne}</li>
        <li>{activeCopy.weCollectLineTwo}</li>
        <li>{activeCopy.weCollectLineThree}</li>
        <li>{activeCopy.weCollectLineFour}</li>{' '}
        <li> {activeCopy.weCollectLineFive}</li>
      </ul>{' '}
      <p className={classes.centerFlex}>{activeCopy.weCollectClosing}</p>
      <h1 className={classes.h4Style}>{activeCopy.weUse}</h1>
      <p className={classes.centerFlex}> {activeCopy.weUseDescription}</p>
      <h1 className={classes.h4Style}>{activeCopy.weShare}</h1>
      <p className={classes.centerFlex}>
        {activeCopy.weShareDescription}
        <a
          style={{ color: 'black', borderBottom: 'none' }}
          href={activeCopy.sbpdHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {activeCopy.sbpd}
        </a>{' '}
        {activeCopy.weDisclose}
      </p>
      <h1 className={classes.h4Style}>{activeCopy.howWeProtect}</h1>
      <p className={classes.centerFlex}>{activeCopy.howWeProtectDescription}</p>
      <h1 className={classes.h4Style}>{activeCopy.changes}</h1>
      <p className={classes.centerFlex}>{activeCopy.changesDescription}</p>
      <h1 className={classes.h4Style}>{activeCopy.effectiveDate}</h1>
      <p className={classes.centerFlex}>
        {activeCopy.effectiveDateDescription}
      </p>
      <h1 className={classes.h4Style}>{activeCopy.questions}</h1>
      <p className={classes.centerFlex}>{activeCopy.questionsDescription}</p>
      <a
        style={{
          width: '95%',
          fontSize: '1.6rem',
          borderBottom: 'none',
        }}
        href={`mailto: ${activeCopy.contactEmail}`}
      >
        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          {activeCopy.contactEmail}
        </p>
      </a>
      <p className={classes.centerFlex} style={{ marginTop: '1rem' }}>
        {activeCopy.doOurBest}
      </p>
    </div>
  )
}
export default PrivacyPolicyPage
