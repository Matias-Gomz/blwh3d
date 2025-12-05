import express from 'express';
import "dotenv/config";

const app = express();

app.use(express.json());


app.use((req, res, next) => {
  console.log(`Middleware => ${req.method} ${req.url}`);
  next();
});


// Datos de ejemplo (simulando una base de datos)
const users = [
    {id: 1, name: 'Ana', age: 23, pass: '1ersd444' },
    {id: 2, name: 'Luis', age: 54, pass: 'aaa13444'},
    {id: 3, name: 'Carla', age: 22, pass: 'sd1234' },
  ];


  /// ruta raiz
app.get('/', (req, res) => {
  res.send('Welcome to Express.js!');
});


// Devolvemos un JSON de usuarios (como haría una API real)
app.get('/users', (req, res) => {
  res.json(users); // Express convierte automáticamente el objeto a JSON
});

//Create

app.post('/users', (req,res) => {

  const {name, age} = req.body;

  if (!name||!age){

    return res.status(400).json({ message: "Faltan datos." });
  }
const newUser = {id:Math.floor(Math.random() * 1000), name, age};

  users.push(newUser);

  console.log('Nuevo usuario recibido.');

 return res.status(201).json(newUser);
})


//////Read
app.get('/users/:name', (req,res) =>{
  const name = req.params.name.toLowerCase();
  const user = users.find(user => user.name.toLowerCase() === name);

  if (user) {
    return res.json(user);
    
  }else{
    return res.status(404).json({message: 'Usuario no encontrado.'})
  }
})

///////Update
app.put('/users/:id', (req,res) =>{

  const id = Math.floor(Number(req.params.id))

  const index = users.findIndex(usuario => usuario.id === id )

  const {name, age} = req.body;

  

  if (index === -1) {
    return res.status(404).json({ message: "Usuario no encontrado." })
    
  }
  const mensaje = []

  if (req.body.name) {
    const oldname = users[index].name

    users[index].name = req.body.name
    
    const newname = users[index].name

    const respose1 = "El nombre del usuario " + oldname + " fue cambiado a " + newname + ".";
    
    mensaje.push(respose1)
  }

    if (req.body.age && req.body.age >= 0 && req.body.age <= 122) {
      const oldage = users[index].age

      users[index].age = req.body.age

      const newage = users[index].age

      const respose2 = "La edad del usuario " + users[index].name + " fue cambiada de " + oldage + " a " + newage + ".";
      
      mensaje.push(respose2)
  }

  return res.status(202).json({mensaje})


})

///////Delete
app.delete('/users/:id', (req,res) => {
  const id = Math.floor(Number(req.params.id))

  const index = users.findIndex(usuario => usuario.id === id )

  if (index === -1) {
    return res.status(404).json({ message: "Usuario no encontrado." })
    
  }

  console.log("El usuario " + users[index].name + ", fue eliminado.");
  
  const message =  "El usuario " + users[index].name + " fue eliminado."; 

  users.splice(index,1)

  return res.status(200).json({message})

  
    
  

})





const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor Express corriendo en http://localhost:${PORT}`);
});