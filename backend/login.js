import express from 'express';
import "dotenv/config";
import { hashPass, comparePass, genToken, safeUsers, verifyToken, requireAdmin } from './Helpers/auth.js';




const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Middleware => ${req.method} ${req.url}`);
  next();
}); 

let users = [];

async function loadUsers() {
  users = [
    { id: 1, name: "juan", pass: await hashPass("1234"), role: "admin" },
    { id: 2, name: "ana", pass: await hashPass("abcd"), role: "user" },
    { id: 3, name: "luis", pass: await hashPass("contraseñacomplicada.com"), role: "admin" },
    { id: 4, name: "maria", pass: await hashPass("qwerty"), role: "user" },
    { id: 5, name: "carlos", pass: await hashPass("zxcvb"), role: "user" },
    { id: 6, name: "sara", pass: await hashPass("asdfg"), role: "user" },
  ];
}

await loadUsers();



//ruta home
app.get('/', (req, res) => {
    res.send('Bienvenido al sistema');
});

///users

app.get('/users', verifyToken, requireAdmin(users), (req, res) => {
  res.send(safeUsers(users));
});


//login
app.post('/login', async (req, res) => {
    const { name, pass } = req.body;
    if (!name || !pass) {
        return res.status(400).json({ message: "Faltan datos." });
    }

    //buscar usuario en array
    const user = users.find(u => u.name === name);
    if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado." });
    }

    //comparar contraseña
    const isValid = await comparePass(pass,user.pass)
    if (!isValid) {
         return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    const token = genToken(user);
    return res.json({ token });
});


//register 
app.post('/register',async (req,res) =>{
  const {name, pass} = req.body;
  if (!name || !pass) {
    return res.status(400).json({message: "contraseña incorrecta 😞."})
    }
    //verificar si usuario existe
    const existingUser = users.find(u => u.name === name);
    if (existingUser) {
      return res.status(409).json({message: "El usuario ya existe 😞."})
    } 

    const newId = Math.floor(Math.random() * 1000);
    const hashedPassword = await hashPass(pass);

    const newUser = {id: newId, name, pass: hashedPassword, role: 'user'};

    users.push(newUser);

  return res.status(201).json({message: "usuario creado 👍. "})
})


app.delete('/users/:id',verifyToken,requireAdmin(users), (req,res) => {
  const id = Math.floor(Number(req.params.id))

  const index = users.findIndex(usuario => usuario.id === id )

  if (index === -1) {
    return res.status(404).json({ message: "Usuario no encontrado." })
    
  }

  if (users[index].role === 'admin') {
    return res.status(403).json({ message: "No se puede eliminar un usuario administrador." });
  }

  console.log("El usuario " + users[index].name + ", fue eliminado.");
  
  const message =  "El usuario " + users[index].name + " fue eliminado."; 

  users.splice(index,1)

  return res.status(200).json({message})

  })

  ///productos ruta

  app.get('/products', (req,res) => {
    const products = [
      {id: 1, name: 'Foxy withered', price: 5000.00},
      {id: 2, name: 'pochita', price: 5000.00},
      {id: 3, name: 'Freddy withered', price: 5000.00},
      {id: 4, name: 'Chica withered', price: 5000.00},
      {id: 5, name: 'Bonnie withered', price: 5000.00},
      {id: 6, name: 'Golden Freddy', price: 5000.00},
      {id: 7, name: 'Springtrap', price: 5000.00},
      {id: 8, name: 'Puppet', price: 4000.00},
    ]; 
    res.json(products);
  });



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 
  