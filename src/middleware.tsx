import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

//I want to tell Clerk what routes are protected
const isProtectedRoute = createRouteMatcher([
  "/user(.*)",
  "/posts(.*)",
  "/newPost(.*)",
  "/editProfile(.*)",
]);

//to define public and protected routes
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

//the matcher is finding a a correlation bewteen your routes and the routes you specified in clerkMiddleware()
//the matcher is written using regex
//regular expressions are used to find matches in patterns
//find matches where the route starts with / and don't filter anything that comes after. Find all matches.
//! Don't change this line
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
