# ⚙️ Workflow Automation System

A backend-focused workflow automation system built with **Node.js, Express.js, and PostgreSQL**. The application provides secure authentication, role-based access control, event-driven workflow execution, rule processing, activity logging, and workflow monitoring through REST APIs and a web dashboard.

---

## 🚀 Project Overview

The Workflow Automation System is designed to automate business processes based on predefined events and rules.

The system follows an event-driven workflow approach:

```text
User / System Event
        ↓
    Event API
        ↓
   Rule Engine
        ↓
Workflow Executor
        ↓
   Workflow Action
        ↓
    Workflow Logs
        ↓
     Metrics
        ↓
   Dashboard
✨ Key Features
🔐 Authentication & Authorization
User login using email and password
JWT-based authentication
Password hashing using bcrypt
Protected API routes
Role-based access control
Admin and User roles
Restricted access to authorized resources
⚡ Event-Driven Workflows
Create and trigger workflow events
Process events through the workflow engine
Automatically evaluate workflow rules
Execute workflows based on matching conditions
🧠 Rule Engine
Define workflow rules
Evaluate incoming events against rules
Determine whether a workflow should be executed
Separate rule processing from workflow execution
🔄 Workflow Execution
Execute workflows based on triggered events
Track workflow execution status
Handle successful and failed executions
Support retry tracking for failed workflow executions
📊 Workflow Logging
Store workflow execution history
Track SUCCESS and FAILED executions
Record errors during workflow execution
Maintain retry information
Monitor workflow activity
📈 Metrics & Monitoring
Workflow status summary
Activity monitoring
Execution statistics
API-based workflow monitoring
Dashboard for viewing workflow activity
👥 User Management
User creation and management
User roles
User-related APIs
Protected user operations
🖥️ Frontend Dashboard

The project includes a frontend interface for:

Login
Workflow monitoring
Activity tracking
Status summaries
Logout
Real-time-style workflow status visualization
🛠️ Technology Stack
Backend
Node.js
Express.js
JavaScript
REST APIs
JWT Authentication
bcrypt
Database
PostgreSQL
SQL
Database Triggers
Frontend
HTML5
CSS3
JavaScript
Development Tools
Visual Studio Code
Git
GitHub
Postman / REST Client
pgAdmin
📂 Project Structure
Workflow_Automation/
│
├── db/
│   └── Database configuration / SQL files
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── script.js
│   └── style.css
│
├── middlewares/
│   ├── auth.js
│   └── role.js
│
├── routes/
│   ├── auth.js
│   ├── events.js
│   ├── logs.js
│   ├── metrics.js
│   ├── rules.js
│   └── users.js
│
├── services/
│   ├── ruleEngine.js
│   └── workflowExecutor.js
│
├── index.js
├── package.json
├── package-lock.json
└── test.http
🔑 Authentication Flow

The application uses JWT-based authentication.

User Login
    ↓
Email + Password
    ↓
Password Verification
    ↓
JWT Token Generated
    ↓
Token Sent with API Requests
    ↓
Authentication Middleware
    ↓
Role Middleware
    ↓
Protected Resource

Passwords are securely stored using bcrypt hashing instead of storing plain-text passwords.

👤 Role-Based Access Control

The application supports role-based authorization.

For example:

ADMIN
 ├── User Management
 ├── Workflow Management
 ├── Rule Management
 └── Monitoring

USER
 ├── Authorized Workflows
 └── Authorized Resources

The role.js middleware verifies whether the authenticated user's role has permission to access a particular resource.

⚡ Event Processing

Events can be manually triggered through the event API.

POST /events

When an event is received:

The event is validated.
Relevant workflow rules are evaluated.
Matching rules are processed.
The workflow executor performs the required action.
The execution result is recorded in the workflow logs.
🧠 Rule Engine

The ruleEngine.js service is responsible for evaluating workflow conditions.

Incoming Event
      ↓
Rule Engine
      ↓
Check Conditions
      ↓
Rule Matched?
   ↙        ↘
 YES         NO
  ↓           ↓
Execute     Stop
Workflow

This separation makes the workflow system easier to extend with additional business rules.

🔄 Workflow Executor

The workflowExecutor.js service handles workflow execution after a rule is matched.

The execution process tracks:

Execution status
Successful workflows
Failed workflows
Error information
Retry information

Example workflow status:

SUCCESS
FAILED
📋 Workflow Logs

Workflow execution information is stored in PostgreSQL.

The logging system can be used to track:

Workflow execution
Execution status
Error messages
Retry count
Last retry time
Execution history

This makes it easier to monitor and troubleshoot failed workflows.

📊 Monitoring & Metrics

The project provides APIs for monitoring workflow execution.

Example endpoint:

GET /metrics/status-summary

The dashboard uses these metrics to display workflow status and activity.

Example:

Workflow Status
----------------
SUCCESS     → Completed workflows
FAILED      → Failed workflows
UNKNOWN     → Unrecognized status
🗄️ Database

PostgreSQL is used as the primary database.

The project uses database tables for storing application and workflow information, including:

Users
Workflow logs
Workflow-related data

Database triggers are also used for automatically recording certain user-related activities.

🔌 API Modules

The backend is organized into separate REST API modules.

Route	Purpose
/auth	Authentication and login
/users	User management
/events	Event triggering and processing
/logs	Workflow execution logs
/metrics	Workflow statistics and monitoring
/rules	Workflow rule management
⚙️ Installation
1. Clone the repository
git clone <your-github-repository-url>
2. Navigate to the project
cd Workflow_Automation
3. Install dependencies
npm install
4. Configure PostgreSQL

Create a PostgreSQL database for the application.

Example:

Database Name: workflow_automation
Host: localhost
Port: 5432

Configure the database connection according to your project configuration.

5. Start the server
node index.js

The server will start on:

http://localhost:3000
🧪 API Testing

The APIs can be tested using:

Postman
VS Code REST Client

The project also includes:

test.http

which can be used to test the REST APIs directly from Visual Studio Code.

📊 Project Architecture
                    ┌─────────────────┐
                    │    Frontend     │
                    │ HTML/CSS/JS     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Express Server │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        Authentication    Events         Metrics
              │              │              │
              ▼              ▼              ▼
        Authorization    Rule Engine     Logs
                             │
                             ▼
                    Workflow Executor
                             │
                             ▼
                       PostgreSQL
🎯**PROJECT OBJECTIVE**
The main objectives of this project are:**

Automate repetitive business workflows
Implement event-driven processing
Provide secure user authentication
Implement role-based authorization
Process configurable workflow rules
Track workflow execution
Handle workflow failures and retries
Provide monitoring and execution metrics

🔮 Future Enhancements
Email and notification workflow actions
Scheduled workflows
Drag-and-drop workflow builder
Advanced rule conditions
WebSocket-based real-time monitoring
Workflow execution queues
Multiple workflow action types
Advanced analytics and reporting
