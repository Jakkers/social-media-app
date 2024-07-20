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

import {
  Flex,
  Text,
  Button,
  Heading,
  Separator,
  Table,
  Strong,
  Card,
  Box,
  Avatar,
} from "@radix-ui/themes";
import Header from "@/components/Header";
import Link from "next/link";

// importing form component from radix ui
// import React from "react";
// import * as Form from "@radix-ui/react-form";

export default async function UserIdPage() {
  //we are going to access the current user data
  const userData = await currentUser();
  console.log(userData);
  //we need the user id from clerk auth
  //! the userId is a alphanumerical string that clerk creates AFTER the user signs up for clerk in the sign-up page (<SignUp/>)
  const { userId } = auth(); //this userId is the clerk id --> same value
  //   console.log(userId);

  if (userId) {
    //add a SQL query getting the users data
    const db = dbConnect();
    await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId]);
  }
  //getting info to display bio
  const db = dbConnect();
  const usersInfo = (
    await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId])
  ).rows;

  const userEmail = userData?.emailAddresses[0].emailAddress;
  //   console.log(userEmail);
  // const userImage = userData?.externalAccounts[0].imageUrl;
  // console.log(userImage);

  //we need a form for the user to add the data
  // we need a handle submit
  async function handleSubmit(formData: FormData) {
    "use server";
    //we need to specify that we are in the servers
    //we need to activate the dbConnection
    //we need to get the formData input
    const bio = formData.get("bio");
    const username = formData.get("username");
    //we need to insert data in the database 9SQL is incomplete)
    const db = dbConnect();
    await db.query(
      `INSERT INTO users (first_name, last_name, username, email, bio, user_image, clerk_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        userData?.firstName,
        userData?.lastName,
        username,
        userEmail,
        bio,
        userData?.externalAccounts[0].imageUrl,
        userId,
      ]
    );
    // you need to revalidatePath and redirect
  }

  if (usersInfo.length > 0) {
    return (
      <>
        <Header />
        <Flex direction="row" justify="between">
          <Heading>Profile</Heading>{" "}
          <Link href="/editProfile">
            <Button>Edit Profile</Button>
          </Link>
        </Flex>
        <Separator my="3" size="4" />
        {/* Mapping a user card so they can see how their profile looks at a glance  */}
        {usersInfo.map((item) => (
          <Box key={item.id}>
            <Card>
              <Flex gap="3" align="center">
                <Avatar
                  size="3"
                  src={item.user_image}
                  radius="full"
                  fallback="T"
                />
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {item.first_name} {item.last_name}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    @{item.username}
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Box>
        ))}
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell> {userData?.username}</Table.RowHeaderCell>
              <Table.Cell>
                {" "}
                {userData?.firstName} {userData?.lastName}
              </Table.Cell>
              <Table.Cell>{userEmail}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
        {/* <Flex direction="column" width="10" gap="2">
          <Text>Username</Text>
          <Text>{userData?.username}</Text>
          <br></br>
          <Text>Name</Text>
          <Text>
            {userData?.firstName} {userData?.lastName}
          </Text>
          <br></br>
          <Text>Email</Text>
          <Text>{userEmail}</Text>
          <br></br> */}
        <br></br>
        <Text>
          <Strong>Bio</Strong>
        </Text>
        <Separator my="3" size="4" />
        {usersInfo.map((item) => (
          <Text key={item.id}>{item.bio}</Text>
        ))}
        {/* </Flex> */}
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Flex direction="row" justify="between">
          <Heading>Profile</Heading>{" "}
        </Flex>
        <Separator my="3" size="4" />
        <Flex direction="column" gap="2">
          <form action={handleSubmit} className="flex flex-col gap-2">
            <label htmlFor="username">Fill in your username</label>
            <input
              type="text"
              className="border-solid border-2 rounded-sm border-slate-500"
              name="username"
              required
            />
            <label htmlFor="bio">Fill in your bio</label>
            <textarea
              className="border-solid border-2 rounded-sm border-slate-500"
              name="bio"
              maxLength={500}
              rows={4}
              required
            />
            <Button type="submit">Submit</Button>
          </form>
        </Flex>
      </>
    );
  }
}

//   return (
//     <>
//       <Header />
//       <Flex direction="row" justify="between">
//         <Heading>Profile</Heading>{" "}
//         <Link href="/editProfile">
//           <Button>Edit Profile</Button>
//         </Link>
//       </Flex>
//       <Separator my="3" size="4" />
//       <Flex direction="column" gap="2">
//         <form action={handleSubmit} className="flex flex-col gap-2">
//           <label htmlFor="username">Fill in your username</label>
//           <input
//             type="text"
//             className="border-solid border-2 rounded-sm border-slate-500"
//             name="username"
//             required
//           />
//           <label htmlFor="bio">Fill in your bio</label>
//           <textarea
//             className="border-solid border-2 rounded-sm border-slate-500"
//             name="bio"
//             maxLength={500}
//             rows={4}
//             required
//           />
//           <Button type="submit">Submit</Button>
//         </form>
//       </Flex>
//       {/* you need a form here  */}
//       {/* Need to conditionaly render this and bio  */}
//       <Flex direction="column" width="10" gap="2">
//         <Text>Username</Text>
//         <Text>{userData?.username}</Text>
//         <br></br>
//         <Text>Name</Text>
//         <Text>
//           {userData?.firstName} {userData?.lastName}
//         </Text>
//         <br></br>
//         <Text>Email</Text>
//         <Text>{userEmail}</Text>
//         <br></br>
//         <Text>Bio</Text>
//         {usersInfo.map((item) => (
//           <Text key={item.id}>{item.bio}</Text>
//         ))}
//       </Flex>
//       {/* <NewPostForm userId={userId} /> */}
//       {/* Current users data goes here --> look below for clues ↓ */}
//     </>
//   );
// }

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
