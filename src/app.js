import express from 'express';
import empleadosRoutes from './routes/empleados.routes.js';
import indexRutes from './routes/index.routes.js';

const app = express();

app.use(express.json());

app.use(indexRutes);
app.use('/api', empleadosRoutes);

// Para manejar los errores enlas ruta que no existen.
app.use((req, res, next) => {
    res.status(404).json({message: "Ruta no existe"})
});

export default app;
