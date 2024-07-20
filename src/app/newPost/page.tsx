import Header from "@/components/Header";
import { dbConnect } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import NewPostForm from "@/components/NewPostForm";

export default async function NewPostPage() {
  const { userId } = auth(); //this userId is the clerk id --> same value
  //   console.log(userId);

  if (userId) {
    //add a SQL query getting the users data
    const db = dbConnect();
    await db.query(`SELECT * FROM users`);
  }

  return (
    <>
      <Header />
      <NewPostForm userId={userId} />
    </>
  );
}
