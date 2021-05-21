import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faGlobe, faCog, faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons'

import { faUser } from '@fortawesome/free-regular-svg-icons'


library.add(faUser, faGlobe, faCog, faAngleDown, faSearch)
dom.watch()
