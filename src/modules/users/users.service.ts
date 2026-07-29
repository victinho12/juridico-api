import { pool } from "../../config/database.js";
import {
  CreateUserInput,
  UpdateUserInput,
  User,
} from "../../types/user.types.js";

export async function findAll(): Promise<User[]> {
  const result = await pool.query("SELECT * FROM users ORDER BY id");
  return result.rows;
}

export async function findById(id: number): Promise<User | null> {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] ?? null;
}



export async function create(data: CreateUserInput): Promise<User> {
  const { name, email, phone, type } = data;
  const result = await pool.query(
    `INSERT INTO users (name, email, phone, type)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, email, phone, type]
  );
  return result.rows[0];
}

export async function update(
  id: number,
  data: UpdateUserInput
): Promise<User | null> {
  const existing = await findById(id);
  if (!existing) return null;

  const merged = { ...existing, ...data };
  const result = await pool.query(
    `UPDATE users SET name = $1, email = $2, phone = $3, type = $4
     WHERE id = $5 RETURNING *`,
    [merged.name, merged.email, merged.phone, merged.type, id]
  );
  return result.rows[0];
}

export async function remove(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
}
