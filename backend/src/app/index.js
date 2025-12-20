import express from 'express';

import globalErrorHandler from '../middlewares/globalErrorHandler.js';
import notFound from '../middlewares/notFound.js';
import router from '../routes/index.js';

const app = express();

app.use(express.json());

// application routes
app.use('/api/v1', router);

app.get('/', (req, res) => {
    res.send('Backend is running.');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;