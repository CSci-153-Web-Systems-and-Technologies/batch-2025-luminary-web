This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## LUMINARY

Luminary is a community-driven e-book reading and publishing platform that gives users access to books, and other documents conveniently for entertainment, documentation and annotationb. 


## Getting Started


Open [https://luminary-books.vercel.app/login-page](https://luminary-books.vercel.app/login-page) with your browser to see the result.

You can choose to sign up if you haven't created your account yet, or sign in in one of two ways if you have:

Log-in with credentials via e-mail and password.

or Sign-in with E-Mail.

On log in, you will be redirected to a catalog of books you can select from at your convenience.

##Tech-Stack
- Next.js + TypeScript
- CSS
- Supabase/PostgreSQL for the backend
- Vercel for Deployment

##Project Structure

- src/app/ - Source for main pages and route handlers.
- src/app/general-components - Components that can be used in more than one page.
- src/ap/(page)/components - Components that are specific to the page it is stored in.
- src/app/(page)/styles - Styles specific to the page it is stored in.
- src/app/styles - Styling commonly shared by every page.

##Features

In this project, users are able to:
- View books
- Take notes of excerpts within specific books
- Bookmark specific pages.
- Keep track of their current read and the page they last left off.
- Keep a collection/playlist of books.
- Post a book that will be pending for approval until the admin's permission.

##Planned / Coming Soon
- An activity tracker that keeps track of a reader's activity.
- A statistics area for writers in their specific profile page.
- Access to profile pages of other specific users for interactivity among other users.
- An integrated Gemini API for guidance with annotation and note-taking in the book being read. 
