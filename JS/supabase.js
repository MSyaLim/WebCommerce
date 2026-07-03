import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://xnchkxgjbrcpunodwkjo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuY2hreGdqYnJjcHVub2R3a2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwNTQ2MzYsImV4cCI6MjA5ODYzMDYzNn0.FQVrjCb262DIcR_-ujDLFBPAqPeFHoaueSIw6yoHSn8";

export const supabase = createClient(supabaseUrl, supabaseKey);