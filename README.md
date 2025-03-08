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

### Tech Stack Used
- Next.js
- Typescript
- Block Note
- Clerk Auth
- Prisma
- ShadCN UI
