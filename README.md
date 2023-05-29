# Cloud-Based Invoice Management System

This project is a Minimum Viable Product (MVP) for a cloud-based invoice management system. It has been built using React and Tailwind CSS for the frontend, and Firebase for the backend.

## Features

- User Authentication: Users can sign up, log in, and log out securely using Firebase Authentication.
- Dashboard: Users are provided with a clean and intuitive dashboard where they can view important information and access various modules.
- Product Management: Users can manage their products/services by adding, editing, and deleting items from their inventory.
- Invoice Management: Users can create, view, edit, and delete invoices. They can also generate PDF versions for easy sharing and printing.
- Customer Management: Users can manage their customer database by adding, editing, and deleting customer profiles.
- Reporting: Users can generate reports on sales, revenue, and other key metrics to gain insights into their business performance.

## Prerequisites

- Node.js: Make sure you have Node.js installed on your local machine. You can download it from [https://nodejs.org](https://nodejs.org).

## Getting Started

1. Clone the repository to your local machine:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd cloud-based-invoice-management-system
```

3. Install the dependencies:

```bash
npm install
```

4. Set up Firebase project:
   - Create a new Firebase project at [https://firebase.google.com](https://firebase.google.com).
   - Enable Firebase Authentication, Firestore, and Storage in your project.
   - Obtain your Firebase project configuration credentials.

5. Configure Firebase credentials:
   - Create a new file named `.env` in the project's root directory.
   - Copy and paste the following content into the `.env` file:

```plaintext
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
```

Replace `YOUR_API_KEY`, `YOUR_AUTH_DOMAIN`, `YOUR_PROJECT_ID`, `YOUR_STORAGE_BUCKET`, `YOUR_SENDER_ID`, and `YOUR_APP_ID` with the actual Firebase project configuration values.

6. Start the development server:

```bash
npm start
```

7. Open your browser and visit [http://localhost:5173](http://localhost:5173) to see the application in action.

## Deployment

To deploy the application to a production environment, you can follow the instructions provided by Firebase Hosting. Make sure to set up the Firebase project accordingly and update the necessary configurations for the production environment.

## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).