// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mkdsvunqzdrmcghkgtwr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rZHN2dW5xemRybWNnaGtndHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3Mzk0NzMsImV4cCI6MjA1OTMxNTQ3M30.w2KX3fbWr5a7KyCZyy2i9-2K4UPPl1pOpMZlqJH82bI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);