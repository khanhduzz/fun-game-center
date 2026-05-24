// lib/supabaseErrorHandler.ts
import { PostgrestError } from "@supabase/supabase-js";

const POSTGRES_ERROR_MAP: Record<string, string> = {
  "23505": "This item or email address is already registered",
  "23503": "Action failed: This references an item that does not exist",
  "22P02": "Invalid data format sent to the server",
  "42P01": "System maintenance configuration error (Table missing)",
  "P0001": "Database function rule violation",
};

/**
 * Intercepts Supabase/Postgres errors and converts them to standard, clean responses.
 */
export function handleSupabaseError(error: PostgrestError, customFallback?: string) {
  // 1. Look up the specific Postgres error code
  const friendlyMessage = POSTGRES_ERROR_MAP[error.code];

  if (friendlyMessage) {
    return Response.json({ error: friendlyMessage }, { status: 400 });
  }

  // 2. Handle unauthorized/expired row-level security states explicitly 
  if (error.message?.toLowerCase().includes("row-level security") || error.details?.includes("policy")) {
    return Response.json({ error: "Access Denied: You don't have permission 🔒" }, { status: 403 });
  }

  // 3. Fallback to a custom message or the raw database message if it's benign
  return Response.json(
    { error: customFallback || error.message || "A database anomaly occurred" }, 
    { status: 400 }
  );
}