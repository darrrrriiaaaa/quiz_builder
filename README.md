# Quiz Builder 🎓

Quiz Builder is a web application for creating, viewing, and taking quizzes. You can create your own quizzes, add questions of different types (boolean, input, checkbox), and manage them easily.

## Features

- Create new quizzes with any number of questions.
- Support for different question types:
  - Boolean (Yes/No)
  - Input (free text answer)
  - Checkbox (select one or multiple correct answers)
- View quizzes and their questions.
- Delete quizzes.
- Clean and simple interface (React + Tailwind CSS).

## Technologies

- **Frontend:** React, React Router, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express, Prisma, PostgreSQL (or another database)
- **API:** REST

## Project Structure

quiz_builder/
├─ backend/ # Express server with Prisma
├─ frontend/ # React application
├─ package.json
└─ README.md


## Installation

1. Clone the repository:
```bash
git clone https://github.com/darrrrriiaaaa/quiz_builder.git
cd quiz_builder
```

2. Install backend dependencies:
```cd backend
npm install
```

3. Configure the database in a .env file:
```DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"```

4. Run Prisma migrations:
```npx prisma migrate dev --name init```

5. Start the server:
```npm run dev```

6. Install frontend dependencies and start:
```cd ../frontend
npm install
npm run dev
```

7. Open http://localhost:3000


## Usage

Click "Create new quiz" to create a quiz.

Add questions and options.

Click on the quiz title to view its questions.

Use the Delete button to remove a quiz.


##Contributing

If you want to help, open a pull request or an issue. Any improvements are welcome!
