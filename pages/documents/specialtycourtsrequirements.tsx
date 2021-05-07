import { specialCourtReqsPDF } from '../../constants/documents'
import PDFViewer from '../../components/PDFViewer'

const SpecialtyCourtsRequirementsLanding = () => (
  <PDFViewer src={specialCourtReqsPDF} />
)

export default SpecialtyCourtsRequirementsLanding
