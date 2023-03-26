import  express  from 'express';
import {getNotas, getNota, createNota} from './database.js';

const app = express();

// permite usar el post
app.use(express.json());

app.listen(process.env.MYSQL_PORT, () =>{
  console.log(`Andando en el puerto ${process.env.MYSQL_PORT}`);
});

app.get("/notas", async (req, res) => {
  try{
    const notas = await getNotas();
    if(notas === undefined){
      throw new Error("No se pudo obtener las notas");
    }
  }catch(error){
    return next(error);
  }

  res.send(notas);
})

app.get("/notas/:id", async (req, res) => {
  const id = req.params.id;
  const nota = await getNota(id);

  res.send(nota);
})

app.post("/notas", async (req, res) => {
  const {titulo, contenido} = req.body;
  const nota = await createNota(titulo, contenido);

  res.status(200).send(nota);
})

app.use(errorHandler);