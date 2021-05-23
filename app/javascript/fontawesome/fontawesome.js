import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faGlobe, faCog, faAngleDown, faSearch, faLink } from '@fortawesome/free-solid-svg-icons'

import { faUser, faCopy } from '@fortawesome/free-regular-svg-icons'


library.add(faUser, faGlobe, faCog, faAngleDown, faSearch, faLink, faCopy)
dom.watch()
