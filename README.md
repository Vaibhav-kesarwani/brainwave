# Brainwave

Brainwave is a modern and intuitive note-taking application built using **Next.js**. It is designed to help users efficiently capture, organize, and manage their notes with a seamless and user-friendly experience.

## Features

- 📝 **Rich Text Editing** - Create and format notes with ease.
- 🔍 **Powerful Search** - Quickly find your notes using a robust search functionality.
- 📂 **Organized Note Management** - Categorize your notes for better organization.
- ☁️ **Cloud Sync** - Access your notes from any device.
- 🔄 **Autosave** - Never lose your progress with real-time saving.
- 🎨 **Dark Mode** - Customize your experience with a beautiful dark theme.

# Website Preview
<img width="1470" alt="1" src="https://github.com/user-attachments/assets/65942f3c-0481-4cec-a48c-42b68a5ddc3a" />
<img width="1470" alt="2" src="https://github.com/user-attachments/assets/63d9bac2-9839-488d-8c4a-a480d83619a2" />
<img width="1470" alt="3" src="https://github.com/user-attachments/assets/4090a9a3-180e-445e-98f9-ebabf501f696" />
<img width="1470" alt="4" src="https://github.com/user-attachments/assets/125049f0-3e79-4db1-9634-8dd1582ee988" />



## Tech Stack

Brainwave is built with the following technologies:

- **Next.js** - A React framework for fast, server-rendered applications.
- **Tailwind CSS** - For styling and responsive design.
- **TypeScript** - Ensuring type safety and maintainability.
- **Prsim** - For database storage.
- **Clerk** - For authentication and user management.

### Inorder to test the application locally:
1. Clone the repository: `git clone https://github.com/actuallyakshat/nota-rapida.git`
2. Install dependencies: `pnpm install`
3. Set Environment Variables:
     ```
     DATABASE_URL
     CLERK_SECRET_KEY
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
     NEXT_PUBLIC_CLERK_SIGN_IN_URL
     NEXT_PUBLIC_CLERK_SIGN_UP_URL
     ```
4. Migrate Prisma Scehmas: `pnpm dlx prisma migrate dev --name migration_name` and then `npx prisma generate`  
5. Run the local server: `pnpm dev`
