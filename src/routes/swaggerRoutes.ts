import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import path from 'path';
import config from 'config';

const baseDir: string = config.get('baseDir');

const swaggerRoutes = (app: Express) => {
  const SWAGGER_PATH = path.join(baseDir, 'swagger.yaml');
  const swaggerDocument = yaml.load(SWAGGER_PATH);
  // @ts-ignores
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get('/.ambassador-internal/openapi-docs', (_, res) => {
    res.redirect('../swagger/');
  });
};

export default swaggerRoutes;
