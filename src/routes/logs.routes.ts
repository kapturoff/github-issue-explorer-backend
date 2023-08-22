import { Router } from 'express';

import * as LogsController from '../controllers/logs.controller';

const router = Router();

router.get('/', LogsController.listLogs);

export default router;
