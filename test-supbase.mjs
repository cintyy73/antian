import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const env = Object.fromEntries(
  readFileSync('.env', 'utf8').split(/\r?\n/)
    .filter(l => l.includes('=') && !l.trim().startsWith('#'))
    .map(l => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()])
);

console.log('URL:', env.NEXT_PUBLIC_SUPABASE_URL || 'FALTA');
console.log('Clave secreta:', env.SUPABASE_SERVICE_ROLE_KEY ? `presente (${env.SUPABASE_SERVICE_ROLE_KEY.length} caracteres)` : 'FALTA');

const supa = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const { data, error } = await supa.from('productos').select('nombre').limit(1);
console.log(error ? 'ERROR: ' + error.message : 'CONEXION OK -> ' + (data[0]?.nombre ?? 'tabla vacía'));