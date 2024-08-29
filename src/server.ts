import express, { Request, Response } from 'express';
import 'dotenv/config';
import { AppDataSource } from './data-source';
import routes from './routes/route';
import { errorMiddleware } from './middlewares/error';

AppDataSource.initialize().then(() => {


    const app = express();


    app.use(express.json());

    app.use(routes)

    app.use(errorMiddleware)
    
    return app.listen(process.env.PORT,()=>{
        console.log("rodando")
    });
});
