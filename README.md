# Reflections

🎯 Please mention the requirements you met and which goals you achieved for this assignment.

🎯 Were there any requirements or goals that you were not quite able to achieve?

🎯 If so, could you please tell us what was it that you found difficult about these tasks?

(Optional)
🏹 Feel free to add any other reflections you would like to share about your submission e.g.

What went really well and what could have gone better?
Detailing useful external sources that helped you complete the assignment (e.g Youtube tutorials).
Describing errors or bugs you encountered while completing your assignment.
Requesting feedback about a specific part of your submission.

## Useful notes

- Make a solid plan before starting to code
  - Includes Db Schema, wireframes, functionality etc...
- Focus on authentication as priority
- Db Schema:
  - You need at least two tables: a users table contianing clerk_id and a posts table connected to the users by the clerk_id. The clerk_id is the foreign key in the posts table. One-to-Many relationship --> one user has many posts.
  - If you are doing the likes stretch goal, you need a third table for likes.
  - If you are doing the followers stretch goal, you need a junction table for the follower_id and the followee_id --> **Many to Many relationship.** --> one user can folow many users, and those users can also follow many users.
- **Very important** --> When deploying to Vercel, remember to add **ALL** the environment variables (clerk and database!)
- If you are using TypeScript, make sure you don't have type errors, type errors break your deployment.

# Attributes

- Photo by <a href="https://unsplash.com/@lucabravo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Luca Bravo</a> on <a href="https://unsplash.com/photos/turned-on-gray-laptop-computer-XJXWbfSo2f0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
- Photo by <a href="https://unsplash.com/@valiantmade?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Valiant Made</a> on <a href="https://unsplash.com/photos/people-sitting-on-chair-in-front-of-table-with-candles-and-candles-UrzN-8K1PCE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
