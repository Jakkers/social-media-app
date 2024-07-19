//set up the database in here
//import pg package

import pg from "pg";

export function dbConnect() {
  const connectionString = process.env.NEXT_PUBLIC_DB_URL;
  const db = new pg.Pool({
    connectionString: connectionString,
  });

  //we return db, so it is available outside this function
  return db;
}
