## User Stories

🐿️ As a user, I am able to sign up for an account and create a user profile
🐿️ As a user, I am able to log in and out of my account
🐿️ As a user, I am able to create posts on my profile timeline
🐿️ As a user, I am able to see all posts by all users on a global timeline

## Stretch Stories

🐿️ As a user, I am able to see a list of other user's posts and/or profiles on the site
🐿️ As a user, I am able able to visit other user profiles
🐿️ As a user, I am able to follow other users
🐿️ As a user, I am able to like posts I think are good, and see how many likes a post has

## Wireframes

![Wireframe of Tech Ed Social](/public/social-wireframe.jpg)

## SQL Tables

![Diagram of SQL relational database](/public/social-schema.png)

### MVP version

![Diagram of SQL relational database MVP](/public/social-schema.png)

# Reflections

🎯 Please mention the requirements you met and which goals you achieved for this assignment.

- Use Clerk.com to set up user signup and login.
- Use the Clerk userId to associate posts with a user.
- Enable each user to create a profile associated with their userId, and a form to input their biography and location data, etc. with a URL similar to /user/[userId].
- Enable users to create posts associated with the userId, and display those posts on the user's profile page
- Show a 404 error if a user profile doesn't exist
- Use at least 1 Radix UI Primitive or similar
- Use TypeScript
  🏹 A user's biography cannot be blank. If a user logs in but doesn't have a biography set, they should be asked to fill one in
  🏹 Created a way for users to like a post

🎯 Were there any requirements or goals that you were not quite able to achieve?

- Enable users to have a limit on how many times they like a post
- Enable users to have a follower, followee relationship
- Enable users to visit another users profile

🎯 If so, could you please tell us what was it that you found difficult about these tasks?

- I wasn't sure how to add the additional tables needed and the relationship in the time I had
- I also found it difficult using params with how the pages were set up with clerk to create an edit post page

(Optional)
🏹 Feel free to add any other reflections you would like to share about your submission e.g.

What went really well and what could have gone better?

- I feel like getting used to TypeScript was a challenge but I learnt alot and know much more about how to use it.

- Using Radix Themes and Primitives really helped to give my UI a professional, consistent and easy to use experience

Detailing useful external sources that helped you complete the assignment (e.g Youtube tutorials).

- MDN, Radix and Next.js Docs

Describing errors or bugs you encountered while completing your assignment.

- There were many! most were around TypeScript, passing props and wrangling null data

Requesting feedback about a specific part of your submission.

- I would be interested in how to implement a like button that has a limit per user.

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
- Theo, Manny, Richard and Joe for rubberducking and debugging.
- Like page was adapted using Richards code
- Tech Educators logo (note, this project is educational only) https://pbs.twimg.com/profile_images/1697358675470389248/92BmtsFe_400x400.png
