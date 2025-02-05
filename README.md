# MyMemo - Note Taking App

A secure and user-friendly note-taking application built with the MERN stack (MongoDB, Express.js, React, Node.js). MyMemo allows users to create, store, and manage their notes in a secure environment with user authentication.

## Features

- **User Authentication**
  - Secure signup and login
  - Password hashing for security
  - JWT (JSON Web Token) based authentication

- **Note Management**
  - Create new notes with title and description
  - View all your notes in one place
  - Delete unwanted notes
  - Notes are private and user-specific

- **Security**
  - Encrypted passwords
  - Protected routes
  - Secure API endpoints
  - User-specific data access

- **Responsive Design**
  - Bootstrap-based UI
  - Mobile-friendly interface
  - Clean and intuitive design

## Tech Stack

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose ODM
  - JWT for authentication
  - bcryptjs for password hashing

- **Frontend**
  - HTML5
  - CSS3
  - JavaScript
  - Bootstrap 5
  - Fetch API

- **Development**
  - nodemon for development
  - MongoDB Compass (optional for database management)

## Prerequisites

Before running this project, ensure you have:

1. Node.js installed (version 14 or higher)
2. MongoDB installed and running
3. npm (Node Package Manager)
4. A text editor (VS Code recommended)
5. Git for version control

## Installation

1. Clone the repository:
```bash
git clone <https://github.com/samanthawongsf/notes-app>
cd notes-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up MongoDB:
```bash
# Start MongoDB (macOS)
brew services start mongodb-community

# Start MongoDB (Windows)
# Ensure MongoDB service is running
```

4. Create environment variables:
```bash
# Create a .env file in the root directory and add:
MONGO_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your-secret-key
PORT=3001
```

5. Start the development server:
```bash
npm start
```

The application will be running at `http://localhost:3001`

## Project Structure

```
notes-app/
├── controllers/           # Route controllers
│   ├── authController.js
│   └── noteController.js
├── middleware/           # Custom middleware
│   └── auth.js
├── models/              # Database models
│   ├── User.js
│   └── Note.js
├── public/              # Static files
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── auth.js
│       └── notes.js
├── routes/              # API routes
│   ├── auth.js
│   └── notes.js
├── pages/              # HTML pages
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   └── about.html
├── .env                # Environment variables
├── .gitignore
├── index.js           # Main application file
├── package.json
└── README.md
```

## API Documentation

### Authentication Endpoints

#### 1. User Signup
```
POST /api/auth/signup
Content-Type: application/json

Request Body:
{
    "email": "user@example.com",
    "password": "password123"
}

Response:
{
    "authToken": "jwt-token-here"
}
```

#### 2. User Login
```
POST /api/auth/login
Content-Type: application/json

Request Body:
{
    "email": "user@example.com",
    "password": "password123"
}

Response:
{
    "authToken": "jwt-token-here"
}
```

### Note Endpoints

#### 1. Get All Notes
```
GET /api/notes/getnotes
Authorization: auth-token jwt-token-here

Response:
[
    {
        "_id": "note-id",
        "title": "Note Title",
        "description": "Note Description",
        "user": "user-id",
        "date": "timestamp"
    }
]
```

#### 2. Add New Note
```
POST /api/notes/addnote
Content-Type: application/json
Authorization: auth-token jwt-token-here

Request Body:
{
    "title": "Note Title",
    "description": "Note Description"
}

Response:
{
    "_id": "note-id",
    "title": "Note Title",
    "description": "Note Description",
    "user": "user-id",
    "date": "timestamp"
}
```

#### 3. Delete Note
```
DELETE /api/notes/deletenote/:id
Authorization: auth-token jwt-token-here

Response:
{
    "success": "Note deleted"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 400: Bad Request (invalid input)
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Security Measures

1. Password Security
   - Passwords are hashed using bcryptjs
   - Minimum password length enforcement
   - Password strength validation

2. Authentication
   - JWT-based authentication
   - Protected routes
   - Token verification middleware

3. Data Security
   - User-specific data access
   - Input validation
   - MongoDB injection prevention

## Development

1. Run in development mode:
```bash
npm run dev
```

2. Watch for file changes:
```bash
nodemon index.js
```

3. Access development tools:
   - MongoDB Compass for database management
   - Browser DevTools for frontend debugging
   - Console logs for backend debugging

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

## Troubleshooting

Common issues and solutions:

1. MongoDB Connection Issues
   - Ensure MongoDB is running
   - Check connection string
   - Verify network connectivity

2. Authentication Issues
   - Clear browser localStorage
   - Check token expiration
   - Verify credentials

3. Note Operations Issues
   - Check authentication token
   - Verify user permissions
   - Validate input data

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Developer: [Samantha Wong]
- Email: [samanthawongsf@gmail.com]
- GitHub: [samanthawongsf]

## Acknowledgments

- Bootstrap for the UI components
- MongoDB for the database solution
- Express.js community for the excellent documentation
- Node.js community for the robust runtime environment