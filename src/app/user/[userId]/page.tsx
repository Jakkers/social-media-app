//import the connection to our database --> you need a users table in your db (id, clerk_id, username, bio, location...)
//TODO set up your .env.local file with supabase and clerk environment variables
//TODO you will need a utils file with your connection string set-up
// import clerk stuff
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

//importing db connection
import { dbConnect } from "@/utils/dbConnection";

//importing data from clerk
import { currentUser } from "@clerk/nextjs/server";

import { Flex, Text, Button } from "@radix-ui/themes";

// importing form component from radix ui
// import React from "react";
// import * as Form from "@radix-ui/react-form";

export default async function UserIdPage() {
  //we need the user id from clerk auth
  //! the userId is a alphanumerical string that clerk creates AFTER the user signs up for clerk in the sign-up page (<SignUp/>)
  const { userId } = auth(); //this userId is the clerk id --> same value
  console.log(userId);

  if (userId) {
    //add a SQL query getting the users data
    const db = dbConnect();
    await db.query(`SELECT * FROM users`);
  }
  //we are going to access the current user data
  const userData = await currentUser();
  console.log(userData);

  const userEmail = userData?.emailAddresses[0].emailAddress;
  //   console.log(userEmail);

  //we need a form for the user to add the data
  // we need a handle submit
  async function handleSubmit(formData: FormData) {
    "use server";
    //we need to specify that we are in the server
    //we need to activate the dbConnection
    //we need to get the formData input
    const bio = formData.get("bio");
    //we need to insert data in the database 9SQL is incomplete)
    const db = dbConnect();
    await db.query(
      `INSERT INTO users (first_name, last_name, username, email, bio, clerk_id) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        userData?.firstName,
        userData?.lastName,
        userData?.username,
        userEmail,
        bio,
        userId,
      ]
    );
    // you need to revalidatePath and redirect
  }
  return (
    <>
      <h1>
        <Text>User Profile</Text>
      </h1>
      <Flex direction="column" width="500px" gap="2">
        <form action={handleSubmit} className="flex flex-col gap-2">
          <label htmlFor="bio">Fill in your bio</label>
          <input
            className="border-solid border-2 rounded-sm border-slate-500 border-"
            type="text"
            name="bio"
            maxLength={500}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Flex>
      {/* you need a form here  */}
      <h1>Your data</h1>
      <Flex direction="column" width="10" gap="2">
        <Text>Your username: {userData?.username}</Text>
        <Text>
          Welcome! your name is:{userData?.firstName} {userData?.lastName}
        </Text>
        <Text>Your email is: {userEmail}</Text>
        <Text>Bio: </Text>
      </Flex>
      {/* Current users data goes here --> look below for clues ↓ */}
    </>
  );
}

//=============================== Show current users data ===============================//
//put this function in the above function

// export default async function UserIdPage() {
//   const { userId } = auth();
//   //check is we have current user data
//   if (userId) {
//     //add a SQL query getting the users data
//     await dbConnect.query(`SELECT * FROM users`);
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

// export default function UserIdPage() {
//   return (
//     <>
//       <h1>User Id Page</h1>
//     </>
//   );
// }
