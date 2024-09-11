import * as express from 'express';
import * as AccountsController from 'src/controllers/accounts';
import { validateBody, validateQuery } from './middlewares';
import { AddAccountSchema, ListQuerySchema, CountAccountsSchema } from './validationSchemes';

const router = express.Router();

router.get('/', validateQuery(ListQuerySchema), AccountsController.list);
router.get('/count', validateQuery(CountAccountsSchema), AccountsController.count);
router.post('/', validateBody(AddAccountSchema), AccountsController.addAccount);

export default router;
