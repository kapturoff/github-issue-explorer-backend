import { Router } from 'express';

import * as RepositoriesController from '../controllers/repositories.controller';

const router = Router();

router.get('/:owner', RepositoriesController.listRepositories);
router.get('/:owner/:repositoryName', RepositoriesController.getRepository);

export default router;
