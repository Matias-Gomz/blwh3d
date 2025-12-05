import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;;

// Encriptar contraseña
export async function hashPass(pass) {
  return await bcrypt.hash(pass, 10);
}

// Comparar contraseña para verificar paso anterior
export async function comparePass(pass, hashedPass) {
    return await bcrypt.compare(pass, hashedPass);
    
}

// Generar token JWT
export function genToken(user){
  if (!SECRET) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno.");
  }
    return jwt.sign(
        {id: user.id, name: user.name},

        SECRET,
        {expiresIn: '4h'});

}

// pasar a safe users

export function safeUsers(users){
  return users.map(({id, name, role}) => ({id, name, role}));
}


//verificar token 
export function verifyToken(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guardamos el usuario dentro del request
    next();
  } catch (e) {
    return res.status(403).json({ message: "Token inválido" });
  }
}

//chequear admin
export function requireAdmin(users) {
  return (req, res, next) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(403).json({ message: "Usuario no encontrado" });
    if (user.role !== "admin") return res.status(403).json({ message: "Acceso solo para admins" });
    next();
  };
}
