import { library, dom } from '@fortawesome/fontawesome-svg-core'

// fas solid
import {
  faGlobe,
  faCog,
  faAngleDown,
  faSearch,
  faTachometerAlt,
  faListUl,
  faChartLine,
  faCommentDollar,
  faUser,
  faLock,
  faLink,
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons'

// fa regular
import {
  faFileAlt,
  faCopy,
  faTimesCircle
} from '@fortawesome/free-regular-svg-icons'


library.add(
  faUser,
  faGlobe,
  faCog,
  faAngleDown,
  faSearch,
  faTachometerAlt,
  faFileAlt,
  faListUl,
  faChartLine,
  faCommentDollar,
  faLock,
  faLink,
  faCopy,
  faTimesCircle,
  faChevronRight,
  faChevronLeft
)

dom.watch()
