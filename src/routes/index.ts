import { accounts } from './accounts/index.ts'
import { recipes } from './recipes/index.ts'

const routes = accounts.concat(recipes)
export { routes };
