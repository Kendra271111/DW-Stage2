import express, {Request, Response} from 'express';
import mainRoute from './routes/index';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', mainRoute);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the API', routes: ['/api/hello', '/api/profile/:name', '/api/login'] });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});