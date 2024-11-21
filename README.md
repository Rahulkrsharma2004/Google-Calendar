# **Google Calendar**
This project demonstrates the integration of Google Calendar with a web application MERN stack full Frontend and Backend, allowing users to authenticate using their Google account, access their calendar in real-time, and create events directly from the application and also show on UI.


## **Features**

- Google OAuth 2.0 login functionality.
- Fetch and display events from the user's Google Calendar in a user-friendly table format.
- Create new calendar events.
- Responsive design for seamless use across devices.

---
## **Image**
<img width="953" alt="1stimg" src="https://github.com/user-attachments/assets/6af29683-84c1-4b26-bd24-cbdf921f0139">
<img width="924" alt="3rdimg" src="https://github.com/user-attachments/assets/d39c3131-a7ac-478f-ae0b-a5ba6c1785df">
<img width="952" alt="Captureoooorr" src="https://github.com/user-attachments/assets/23475dbd-a45b-429f-a006-e2cb132cb200">
<img width="921" alt="newtwo" src="https://github.com/user-attachments/assets/6d905bb5-9a1e-4f10-8abd-6dda7b67d674">
<img width="933" alt="7thimg" src="https://github.com/user-attachments/assets/b49d3506-a076-40e1-af4d-701736af5f2e">

## Authentication Flow

 **Login**:
   - Users log in using Google OAuth 2.0.
   - After granting permissions, users are redirected back with an authorization code.

 **Token Exchange**:
   - The server exchanges the authorization code for access and refresh tokens.
   - Tokens are used to authenticate API requests.

 **User Information**:
   - The server verifies the ID token and retrieves user info.
   - User info is stored in the database for session management.


## Technologies Used

- **React.js**: Frontend library for building user interfaces.
- **Node.js**: Backend runtime environment for executing JavaScript code.
- **Express.js**: Web framework for Node.js to build backend APIs.
- **Vanilla CSS**: For styling the application.
- **React Router**: For navigation and routing within the React application.

---

## **Getting Started**  
- First clone the repository --
- Cloning Frontend and Backend --
- cd frontend-calendar/
- Run the command in terminal **npm run dev**

