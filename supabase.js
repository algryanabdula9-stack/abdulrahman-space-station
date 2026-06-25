const SUPABASE_URL = "https://sdorqlfwhuefepjhknxj.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkb3JxbGZ3aHVlZmVwamhrbnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzODU5NTEsImV4cCI6MjA5Nzk2MTk1MX0.eWm1MDVI7GB6ACe8W1Og0F1N7rP7UPBGvB5Rhb1sb0U";
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
async function getUser(){ const {data} = await db.auth.getUser(); return data.user; }
async function requireUser(){ const user = await getUser(); if(!user){ location.href='login.html'; return null;} return user; }
async function logout(){ await db.auth.signOut(); location.href='login.html'; }
