import express, {Request, Response} from 'express';
import mainRoute from './routes/index';
import { logMiddleware } from './middlewares/logMiddleware'
import { apiKeyMiddleware } from './middlewares/apiKeyMiddleware'
import { ErrorHandler } from './middlewares/errorHandler'

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', apiKeyMiddleware, mainRoute);
app.use(ErrorHandler)

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the API', routes: ['/api/hello', '/api/profile/:name', '/api/login'] });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});