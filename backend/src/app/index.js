import express from 'express';
import cors from "cors";
import globalErrorHandler from '../middlewares/globalErrorHandler.js';
import notFound from '../middlewares/notFound.js';
import router from '../routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger-output.json' with { type: 'json' };
import config from '../config/index.js';

const app = express();


app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// application routes
app.use(`/api/${config.API_VERSION}`, router);


app.get('/', (req, res) => {
    res.send('Backend is running.');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;