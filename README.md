# Pantry Tracker

This project is a web application that helps you keep track of ingredients in your pantry, recipes, and shopping lists. It uses TypeScript, Express, TailwindCSS, and PostgreSQL. Users can log in with their Google account for authentication.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Node.js and npm: [Install Node.js and npm](https://nodejs.org/)
- PostgreSQL: [Install PostgreSQL](https://www.postgresql.org/download/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/Let_Me_COOK.git
   cd Let_Me_COOK
   ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. Create an `.env` file. 
    ```
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    DATABASE_URL=postgres://pantry_user:mypassword@localhost:5432/pantry
    SESSION_SECRET=your_generated_session_secret
    ```
   1. Replace `your_google_client_id` and `your_google_client_secret` with the credentials you obtain from the Google Developer Console. **See Additional Details.**
    2. Replace `pantry_user` and `mypassword` with your PostgreSQL username and password. **See Additional Details.**
    3. Use this command to generate secure random string and replace `your_generated_session_secret`
    ```
    node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"
    ``` 
4. **Run the application**
```bash
npx ts-node src/index.ts
```
1. Open your browser and navigate to http://localhost:3000

### Usage
No website functionality yet.

##  Additional Details
1. **Google OAuth Setup:**
   - To obtain `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, follow these steps:
     - Go to the [Google Cloud Console](https://console.cloud.google.com/).
     - Create a new project or select an existing project.
     - Navigate to `APIs & Services` > `Credentials`.
     - Click on `Create Credentials` and select `OAuth 2.0 Client IDs`.
     - Set the application type to `Web application`.
     - Add `http://localhost:3000/auth/google/callback` to the list of authorized redirect URIs.
     - Click `Create` to get your `Client ID` and `Client Secret`.
2. **Postgres:**
    1. Install Postgres from the above Prerequisites section.
    2. Start PostgreSQL Client with `$ psql -U postgres` in the command line. If this doesn't work, Add the PostgreSQL bin directory (e.g., `C:\Program Files\PostgreSQL\<version>\bin`) to your PATH environment variable.
    3. Create the User and Grant Privileges
```bash
CREATE DATABASE pantry;
CREATE USER pantry_user WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE pantry TO pantry_user;
```   

## Project ideas for later
1. `ingredients` should also have a `price` column (could be populated by current prices, either user-given or from an API)