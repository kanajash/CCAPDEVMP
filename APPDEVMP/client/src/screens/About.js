import React from 'react';
import { Card } from 'react-bootstrap';

function About() {
  return (
    <div className="container mt-5">
      <Card className="p-4 shadow">
        <h2 className="mb-4">About This Application</h2>

        <p>This web application was developed as a full-featured room booking system using the Model-View-Controller (MVC) architecture. It includes secure user authentication, admin functionality, and proper integration between frontend views and backend database operations.</p>

        <h5 className="mt-4 fw-bold">✅ Project Requirements Implemented</h5>
        <div className="ms-3">
          <p>• The project follows the <strong>Model-View-Controller (MVC)</strong> architecture.</p>
          <p>• All content manipulated in the frontend views is <strong>reflected in the MongoDB database</strong> in real time.</p>
          <p>• <strong>CRUD operations</strong> are implemented for all major features (Users, Rooms, Bookings).</p>
          <p>• At least <strong>5 sample data entries</strong> exist for each applicable feature (users, rooms, bookings).</p>
          <p>• <strong>User authentication</strong> is properly implemented using <strong>JWT</strong> for secure sessions.</p>
          <p>• Sessions persist until the user either <strong>logs out or closes the browser</strong>.</p>
          <p>• <strong>Password hashing</strong> is implemented using <code>bcryptjs</code>. No passwords are stored in plain text.</p>
          <p>• <strong>Front-end and back-end form validation</strong> are both implemented to ensure data integrity.</p>
        </div>

        <h5 className="mt-4 fw-bold">📦 NPM Packages & Third-Party Libraries Used</h5>
        <div className="ms-3">
          <p>• <strong>React</strong> – Frontend library for building user interfaces</p>
          <p>• <strong>React Router</strong> – Handles routing between screens</p>
          <p>• <strong>React Bootstrap</strong> – Bootstrap components for React</p>
          <p>• <strong>Axios</strong> – For making HTTP requests</p>
          <p>• <strong>Moment.js</strong> – Date formatting and manipulation</p>
          <p>• <strong>Stripe Checkout</strong> – Payment integration</p>
          <p>• <strong>SweetAlert2</strong> – Pop-up alerts and confirmations</p>
          <p>• <strong>Express.js</strong> – Backend web framework for routing and APIs</p>
          <p>• <strong>Mongoose</strong> – ODM for MongoDB to manage schema and queries</p>
          <p>• <strong>Bcryptjs</strong> – Password hashing for secure authentication</p>
          <p>• <strong>JsonWebToken</strong> – JWT-based authentication system</p>
          <p>• <strong>CORS</strong> – Middleware to allow cross-origin requests</p>
          <p>• <strong>dotenv</strong> – (Optional) Manage environment variables in a secure way</p>
        </div>

        <p className="mt-4">All packages were installed via <code>npm</code> and are listed in the project’s <code>package.json</code> file. This ensures full transparency and easy project replication.</p>
      </Card>
    </div>
  );
}

export default About;
