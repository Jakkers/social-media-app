import Header from "@/components/Header";
import { Heading, Separator, Flex, Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function EditProfilePage() {
  //getting userId to make sure only the users info is updates
  const { userId } = auth();
  if (userId) {
    //add a SQL query getting the users data
    const db = dbConnect();
    await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId]);
  }
  // getting data to populate default info
  const db = dbConnect();
  const usersInfo = (
    await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId])
  ).rows[0];
  console.log(usersInfo);

  async function handleSubmit(formData: FormData) {
    "use server";
    const email = formData.get("email");
    const bio = formData.get("bio");
    const userImage = formData.get("user_image");
    const db = dbConnect();
    await db.query(
      `UPDATE users SET email = $1, bio = $2, user_image = $3 WHERE clerk_id = $4`,
      [email, bio, userImage, userId]
    );

    revalidatePath("/user(.*)");
    redirect("/user/profile");
  }
  return (
    <>
      <Header />
      <Heading>Edit Profile</Heading>
      <Separator my="3" size="4" />
      <Flex direction="column" gap="2">
        <form action={handleSubmit} className="flex flex-col gap-2">
          <label htmlFor="email">Change your email</label>
          <input
            type="text"
            className="border-solid border-2 rounded-sm border-slate-500"
            name="email"
            defaultValue={usersInfo?.email}
            required
          />
          <label htmlFor="bio">Change your bio</label>
          <textarea
            className="border-solid border-2 rounded-sm border-slate-500"
            name="bio"
            maxLength={500}
            rows={4}
            defaultValue={usersInfo?.bio}
            required
          />
          <label htmlFor="user_image">Change your profile picture (url)</label>
          <input
            type="text"
            className="border-solid border-2 rounded-sm border-slate-500"
            name="user_image"
            defaultValue={usersInfo?.user_image}
            required
          />
          <Text>If you need image hosting click the link below</Text>
          <Link
            href="https://postimages.org/"
            target="blank"
            className="text-sky-500"
          >
            Create Image URL
          </Link>
          <Button type="submit">Submit</Button>
        </form>
      </Flex>
    </>
  );
}
