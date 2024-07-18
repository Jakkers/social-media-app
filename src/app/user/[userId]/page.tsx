// //import the connection to our database --> you need a users table in your db (id, clerk_id, username, bio, location...)
// //TODO set up your .env.local file with supabase and clerk environment variables
// //TODO you will need a utils file with your connection string set-up
// // import clerk stuff
// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";

// export default function UserIdPage() {
//   //we need the user id from clerk auth
//   //! the userId is a alphanumerical string that clerk creates AFTER the user signs up for clerk in the sign-up page (<SignUp/>)
//   const { userId } = auth(); //this userId is the clerk id --> same value
//   console.log(userId);

//   //we need a form for the user to add the data
//   // we need a handle submit
//   async function handleSubmit(formData) {
//     //we need to specify that we are in the server
//     //we need to activate the dbConnection
//     //we need to get the formData input
//     const name = formData.get("name");
//     //we need to insert data in the database 9SQL is incomplete)
//     await db.query(`INSERT INTO...(clerk_id) VALUES $1, $2, $3`, [userId]);
//     // you need to revalidatePath and redirect
//   }
//   return (
//     <div>
//       <h1>User Profile</h1>
//       {/* you need a form here  */}
//       <h1>Your data</h1>
//       {/* Current users data goes here --> look below for clues ↓ */}
//     </div>
//   );
// }

// //=============================== Show current users data ===============================//
// //put this function in the above function

// import { currentUser } from "@clerk/nextjs/server";

// export default async function UserIdPage() {
//   const { userId } = auth();
//   //check is we have current user data
//   if (userId) {
//     //add a SQL query getting the users data
//   }
//   //we are going to access the current user data
//   const userData = await currentUser();
//   console.log(userData);

//   return (
//     <>
//       {/* you can conditionaly render an element here to redirect the user to complete their profiles, and then show the users data --> use tenery opperator */}
//       <h1>Current User</h1>
//       <p>
//         Welcome! your name is:{userData?.firstName} {userData?.lastName}
//       </p>
//       <p>Your email is:</p>
//     </>
//   );
// }
