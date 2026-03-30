import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// This is a simple diagnostic API route to test your Supabase connection.
// Visit http://localhost:3000/api/test-supabase in your browser.

export async function GET() {
  // Check if the client was able to initialize
  if (!supabase) {
    return NextResponse.json(
      {
        success: false,
        status: "DISCONNECTED",
        message: "Supabase client is not initialized. Please enter valid keys into .env.local and restart the server.",
      },
      { status: 500 }
    );
  }

  try {
    // Attempt to query the 'blogs' table with a 5 second timeout to prevent infinite hanging
    const { data, error, status } = await supabase
      .from('blogs')
      .select('slug')
      .limit(1)
      .abortSignal(AbortSignal.timeout(5000));

    if (error) {
      // The database responded, but threw an error (e.g. table doesn't exist, RLS violation)
      return NextResponse.json(
        {
          success: false,
          status: "DATABASE_ERROR",
          message: "Reached Supabase, but encountered a database error. Have you run the schema.sql in the Supabase SQL Editor?",
          supabase_error: error.message,
          hint: error.hint || "None",
        },
        { status: 500 }
      );
    }

    // Success! Data was returned (even if empty)
    return NextResponse.json(
      {
        success: true,
        status: "CONNECTED",
        message: "Successfully connected to your Supabase Project!",
        database_table_checked: "blogs",
        records_found: data.length > 0 ? "Yes" : "No, the table is empty but the connection is perfect.",
        http_status: status,
      },
      { status: 200 }
    );
  } catch (err: any) {
    // Network failure (invalid URL, Supabase project down, missing internet)
    return NextResponse.json(
      {
        success: false,
        status: "NETWORK_FAILURE",
        message: "Client failed to communicate with the Supabase API. Check your Project URL.",
        error: err.message || "Unknown Network Error",
      },
      { status: 500 }
    );
  }
}
