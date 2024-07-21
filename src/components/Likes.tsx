import { dbConnect } from "@/utils/dbConnection";
import { Button } from "@radix-ui/themes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { FaRegThumbsUp } from "react-icons/fa";

export default function LikeButton({
  data,
  clerk,
}: {
  data: number | null;
  clerk: string | null;
}) {
  async function handleSubmit(formdata: FormData) {
    "use server";
    const db = dbConnect();

    const tableData = await db.query(
      `SELECT likes FROM social_posts WHERE id = ${data}`
    );
    const wrangledLikes = Number(tableData.rows[0].likes) + 1;
    await db.query(`UPDATE social_posts SET likes = ($1) WHERE id = ${data}`, [
      wrangledLikes,
    ]);
    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <>
      {" "}
      <form action={handleSubmit}>
        <Button>
          Like <FaRegThumbsUp />
        </Button>
      </form>
    </>
  );
}
