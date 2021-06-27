import { Router } from 'express';

import { userRouter } from './controllers';

// tslint:disable-next-line:no-var-requires
const appInfo = require('../package.json');

const router = Router();
router.get('/version', (req, res) => {
  const { version, name, description } = appInfo;
  console.info(
    `version = ${version}, name = ${name}, description = ${description}`,
  );

  if (!(typeof version && version)) {
    console.error(
      'An error occurred while trying to get version: Version not defined',
    );
    res.status(400).send(new Error('Version not defined'));
  }

  res.json({
    description,
    name,
    version,
  });
});

router.get('/health-check', (req, res) => {
  res.send('I am OK');
});

router.use('/user', userRouter);

export default router;
