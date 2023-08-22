import { Router } from 'express';

import * as IssuesController from '../controllers/issues.controller';

const router = Router();

router.get('/:owner/:repositoryName', IssuesController.listIssues);
router.get('/:owner/:repositoryName/:id', IssuesController.getIssue);

export default router;
