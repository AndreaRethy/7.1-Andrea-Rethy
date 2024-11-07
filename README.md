# 7.1 Andrea Rethy - App de Blog

## Description

This blog app allows users to register and log in to create and interact with content. It supports two user roles: ADMIN and USER, each with specific permissions.

### **Key Features**

**User Management:**

* **Registration & Login:** Secure sign-up and authentication using password encryption and Jason Web Tokens.
* **Roles:** ADMINs can manage all users and publications; USERS can manage their own content.

**Content Creation & Interaction:**

* **Publications:** Create, view, edit, delete, and recover personal posts.
* **Engagement:** Read & Like publications from other users.

**Admin Capabilities:**

* **User Oversight:** View all users, ban or reactivate accounts.
* **Content Control:** Delete any publication (it will be removed from DB completely).

**Technical Highlights:**

* **Built With:** TypeScript, Express API, MySQL database using Prisma ORM, React with Tailwind.
* **Testing:** Unit tests with Vitest, API routes test with Rest Client, Continues Integration with GitHub Actions
* **Architecture:** Clean Architecture for scalable and maintainable code.
* **Documentation:** Comprehensive API documentation with Swagger. To access Swagger documentation follow local setup instructions until backend is server is running. Access link: http://localhost:3000/api/v1/docs

## Local Setup Instructions

### Environment Variables Needed

Make sure to add the following variables in a `.env` file:

```
DATABASE_URL=
ACCESS_TOKEN_SECRET=
PORT=
```

Fill in the appropriate values for your environment configuration.

### Run the application locally

1. **Compile TypeScript**:

   ```
   tsc
   ```
2. **Start Database Server**

   * Ensure that your MySQL server is running.
3. **Start Backend Server**:

   ```
   cd server && npm run dev
   ```
4. **Start the Frontend**

   ```
   cd client && npm run dev
   ```
5. **Create an ADMIN user**

   After registering your first user open the DB with PhpMyAdmin and change their role to ADMIN. Following ADMIN users can have their rights granted by the original ADMIN.
