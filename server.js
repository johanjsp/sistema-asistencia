const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'tu-clave-secreta-super-segura-cambiala-en-produccion';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Middleware para verificar token
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token.replace('Bearer ', ''), SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.userId = decoded.id;
    req.username = decoded.username;
    req.userRol = decoded.rol;
    next();
  });
};

// Middleware para verificar si es admin
const verificarAdmin = (req, res, next) => {
  if (req.userRol !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requieren permisos de administrador.' });
  }
  next();
};

// Registro de nuevo usuario
app.post('/api/register', async (req, res) => {
  const { username, password, nombre } = req.body;

  if (!username || !password || !nombre) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    // Verificar si el usuario ya existe
    db.get('SELECT * FROM usuarios WHERE username = ?', [username], async (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Error en el servidor' });
      }
      if (row) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }

      // Hash de la contraseña
      const passwordHash = await bcrypt.hash(password, 10);

      // Insertar nuevo usuario
      db.run('INSERT INTO usuarios (username, password_hash, nombre) VALUES (?, ?, ?)',
        [username, passwordHash, nombre],
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'Error al crear usuario' });
          }
          res.json({ message: 'Usuario creado exitosamente', userId: this.lastID });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
  }

  db.get('SELECT * FROM usuarios WHERE username = ?', [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Verificar contraseña
    const passwordValida = await bcrypt.compare(password, user.password_hash);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Generar token
    const token = jwt.sign(
      { id: user.id, username: user.username, rol: user.rol },
      SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login exitoso',
      token: token,
      user: {
        id: user.id,
        username: user.username,
        nombre: user.nombre,
        rol: user.rol
      }
    });
  });
});

// Registrar entrada
app.post('/api/entrada', verificarToken, (req, res) => {
  const userId = req.userId;
  const timestamp = new Date().toISOString();

  db.run('INSERT INTO asistencias (usuario_id, tipo, timestamp) VALUES (?, ?, ?)',
    [userId, 'entrada', timestamp],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error al registrar entrada' });
      }
      res.json({ 
        message: 'Gracias has llegado',
        timestamp: timestamp
      });
    }
  );
});

// Registrar salida
app.post('/api/salida', verificarToken, (req, res) => {
  const userId = req.userId;
  const timestamp = new Date().toISOString();

  db.run('INSERT INTO asistencias (usuario_id, tipo, timestamp) VALUES (?, ?, ?)',
    [userId, 'salida', timestamp],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error al registrar salida' });
      }
      res.json({ 
        message: 'Gracias, que tengas buen día',
        timestamp: timestamp
      });
    }
  );
});

// Obtener historial de asistencias del usuario
app.get('/api/mis-asistencias', verificarToken, (req, res) => {
  const userId = req.userId;

  db.all(
    'SELECT * FROM asistencias WHERE usuario_id = ? ORDER BY timestamp DESC LIMIT 10',
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener asistencias' });
      }
      res.json(rows);
    }
  );
});

// ============= ENDPOINTS DE ADMINISTRADOR =============

// Obtener todos los usuarios (solo admin)
app.get('/api/admin/usuarios', verificarToken, verificarAdmin, (req, res) => {
  db.all(
    'SELECT id, username, nombre, rol, fecha_creacion FROM usuarios ORDER BY nombre',
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener usuarios' });
      }
      res.json(rows);
    }
  );
});

// Obtener todas las asistencias con información del usuario (solo admin)
app.get('/api/admin/asistencias', verificarToken, verificarAdmin, (req, res) => {
  const { fecha, usuario_id } = req.query;
  
  let query = `
    SELECT 
      a.id, 
      a.tipo, 
      a.timestamp,
      u.id as usuario_id,
      u.nombre,
      u.username
    FROM asistencias a
    INNER JOIN usuarios u ON a.usuario_id = u.id
    WHERE 1=1
  `;
  
  const params = [];
  
  if (fecha) {
    query += ' AND DATE(a.timestamp) = DATE(?)';
    params.push(fecha);
  }
  
  if (usuario_id) {
    query += ' AND a.usuario_id = ?';
    params.push(usuario_id);
  }
  
  query += ' ORDER BY a.timestamp DESC';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Error al obtener asistencias' });
    }
    res.json(rows);
  });
});

// Obtener resumen de asistencias por usuario (solo admin)
app.get('/api/admin/resumen', verificarToken, verificarAdmin, (req, res) => {
  const { fecha_inicio, fecha_fin } = req.query;
  
  let query = `
    SELECT 
      u.id,
      u.nombre,
      u.username,
      COUNT(CASE WHEN a.tipo = 'entrada' THEN 1 END) as total_entradas,
      COUNT(CASE WHEN a.tipo = 'salida' THEN 1 END) as total_salidas,
      MIN(CASE WHEN a.tipo = 'entrada' THEN a.timestamp END) as primera_entrada,
      MAX(CASE WHEN a.tipo = 'salida' THEN a.timestamp END) as ultima_salida
    FROM usuarios u
    LEFT JOIN asistencias a ON u.id = a.usuario_id
    WHERE u.rol = 'trabajador'
  `;
  
  const params = [];
  
  if (fecha_inicio && fecha_fin) {
    query += ' AND DATE(a.timestamp) BETWEEN DATE(?) AND DATE(?)';
    params.push(fecha_inicio, fecha_fin);
  }
  
  query += ' GROUP BY u.id, u.nombre, u.username ORDER BY u.nombre';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Error al obtener resumen' });
    }
    res.json(rows);
  });
});

// Obtener estadísticas generales (solo admin)
app.get('/api/admin/estadisticas', verificarToken, verificarAdmin, (req, res) => {
  const queries = {
    totalUsuarios: 'SELECT COUNT(*) as total FROM usuarios WHERE rol = "trabajador"',
    registrosHoy: 'SELECT COUNT(*) as total FROM asistencias WHERE DATE(timestamp) = DATE("now")',
    entradasHoy: 'SELECT COUNT(*) as total FROM asistencias WHERE DATE(timestamp) = DATE("now") AND tipo = "entrada"',
    salidasHoy: 'SELECT COUNT(*) as total FROM asistencias WHERE DATE(timestamp) = DATE("now") AND tipo = "salida"'
  };
  
  const estadisticas = {};
  let completadas = 0;
  
  Object.keys(queries).forEach(key => {
    db.get(queries[key], [], (err, row) => {
      if (!err) {
        estadisticas[key] = row.total;
      }
      completadas++;
      
      if (completadas === Object.keys(queries).length) {
        res.json(estadisticas);
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
