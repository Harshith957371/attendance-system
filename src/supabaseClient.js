import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://bdwexxqsiolkdcevhyex.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkd2V4eHFzaW9sa2RjZXZoeWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MzMxMTUsImV4cCI6MjA4OTUwOTExNX0.xmagm1N0xE90KsO1_pU3AY503YZbzZbYbCUKv0kxisM";

export const supabase = createClient(supabaseUrl, supabaseKey);