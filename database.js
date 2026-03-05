const path = require('path');

// Detectar si usar PostgreSQL (producción) o SQLite (desarrollo)
const usePostgres = !!process.env.DATABASE_URL;

let db;

if (usePostgres) {
  // Configuración PostgreSQL
  const { Pool } = require('pg');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  // Wrapper para hacer que PostgreSQL use la misma API que SQLite
  db = {
    run: async (sql, params = [], callback = () => {}) => {
      try {
        // Convertir sintaxis SQLite a PostgreSQL
        let pgSql = sql
          .replace(/INTEGER PRIMARY KEY AUTOINCREMENT/gi, 'SERIAL PRIMARY KEY')
          .replace(/DATETIME/gi, 'TIMESTAMP')
          .replace(/TEXT/gi, 'VARCHAR(255)')
          .replace(/CURRENT_TIMESTAMP/gi, 'NOW()');
        
        // Convertir ? a $1, $2, $3...
        let paramIndex = 0;
        pgSql = pgSql.replace(/\?/g, () => `$${++paramIndex}`);

        // Si es un INSERT, agregar RETURNING id para obtener el lastID
        let result;
        if (pgSql.trim().toUpperCase().startsWith('INSERT')) {
          pgSql += ' RETURNING id';
          result = await pool.query(pgSql, params);
          // Crear contexto con lastID para simular SQLite
          const context = { lastID: result.rows[0]?.id };
          callback.call(context, null);
        } else {
          result = await pool.query(pgSql, params);
          callback(null);
        }
      } catch (err) {
        callback(err);
      }
    },
    
    get: async (sql, params = [], callback) => {
      try {
        let pgSql = sql;
        let paramIndex = 0;
        pgSql = pgSql.replace(/\?/g, () => `$${++paramIndex}`);

        const result = await pool.query(pgSql, params);
        callback(null, result.rows[0]);
      } catch (err) {
        callback(err, null);
      }
    },
    
    all: async (sql, params = [], callback) => {
      try {
        let pgSql = sql;
        let paramIndex = 0;
        pgSql = pgSql.replace(/\?/g, () => `$${++paramIndex}`);

        const result = await pool.query(pgSql, params);
        callback(null, result.rows);
      } catch (err) {
        callback(err, null);
      }
    },

    serialize: (callback) => {
      callback();
    }
  };

  console.log('✅ Conectado a PostgreSQL (Producción)');
  inicializarTablas();

} else {
  // Configuración SQLite (desarrollo local)
  const sqlite3 = require('sqlite3').verbose();
  
  db = new sqlite3.Database(path.join(__dirname, 'asistencia.db'), (err) => {
    if (err) {
      console.error('❌ Error al conectar con la base de datos:', err);
    } else {
      console.log('✅ Conectado a SQLite (Desarrollo Local)');
      inicializarTablas();
    }
  });
}

// Crear las tablas si no existen
function inicializarTablas() {
  const queries = usePostgres ? {
    usuarios: `
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        nombre VARCHAR(255) NOT NULL,
        rol VARCHAR(50) DEFAULT 'trabajador' CHECK(rol IN ('admin', 'trabajador')),
        fecha_creacion TIMESTAMP DEFAULT NOW()
      )
    `,
    asistencias: `
      CREATE TABLE IF NOT EXISTS asistencias (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER NOT NULL,
        tipo VARCHAR(50) NOT NULL CHECK(tipo IN ('entrada', 'salida')),
        timestamp TIMESTAMP NOT NULL,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
      )
    `
  } : {
    usuarios: `
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        nombre TEXT NOT NULL,
        rol TEXT DEFAULT 'trabajador' CHECK(rol IN ('admin', 'trabajador')),
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `,
    asistencias: `
      CREATE TABLE IF NOT EXISTS asistencias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        tipo TEXT NOT NULL CHECK(tipo IN ('entrada', 'salida')),
        timestamp DATETIME NOT NULL,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
      )
    `
  };

  db.serialize(() => {
    // Tabla de usuarios
    db.run(queries.usuarios, (err) => {
      if (err) {
        console.error('❌ Error al crear tabla usuarios:', err);
      } else {
        console.log('✅ Tabla usuarios lista');
        crearAdminPorDefecto();
      }
    });

    // Tabla de asistencias
    db.run(queries.asistencias, (err) => {
      if (err) {
        console.error('❌ Error al crear tabla asistencias:', err);
      } else {
        console.log('✅ Tabla asistencias lista');
      }
    });
  });
}

// Crear usuario admin por defecto
async function crearAdminPorDefecto() {
  const bcrypt = require('bcryptjs');
  const adminUsername = 'admin';
  const adminPassword = 'admin123'; // Cambiar en producción
  
  db.get('SELECT * FROM usuarios WHERE username = ?', [adminUsername], async (err, row) => {
    if (!row) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      db.run(
        'INSERT INTO usuarios (username, password_hash, nombre, rol) VALUES (?, ?, ?, ?)',
        [adminUsername, passwordHash, 'Administrador', 'admin'],
        (err) => {
          if (err) {
            console.error('Error al crear admin:', err);
          } else {
            console.log('Usuario admin creado (usuario: admin, contraseña: admin123)');
          }
        }
      );
    }
  });
}

module.exports = db;
