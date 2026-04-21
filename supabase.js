import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://fwpkvimozkyshshosbgx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3cGt2aW1vemt5c2hzaG9zYmd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNzM0MTksImV4cCI6MjA5MTk0OTQxOX0.Q8IPJ-H-5HvTHSDDfgLCq0veuhbvLUXTEo20B2cdEa4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);