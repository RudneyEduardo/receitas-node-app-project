import { accounts } from './accounts/index.ts'
import { recipes } from './recipes/index.ts'
import {dashboard} from './dashboard/index.ts'

const routes = accounts.concat(recipes).concat(dashboard)

export { routes };
