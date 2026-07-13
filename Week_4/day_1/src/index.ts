import express, {Request, Response} from 'express';
import userRoute from './routes/userRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', userRoute);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the API', routes: ['/api/hello', '/api/profile/:name', '/api/login'] });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});