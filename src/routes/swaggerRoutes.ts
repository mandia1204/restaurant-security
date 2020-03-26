import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

const swaggerRoutes = (app: Express) => {
  const SWAGGER_PATH = `${__dirname}/../swagger.yaml`;
  const swaggerDocument = yaml.load(SWAGGER_PATH);
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get('/.ambassador-internal/openapi-docs', (_, res) => {
    res.redirect('../swagger/');
  });
};

export default swaggerRoutes;
