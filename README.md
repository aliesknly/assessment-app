# Assessments App

🎯 **Objective**

Assessments App is a web application designed to create, manage, and \
evaluate assessments aimed at selecting candidates for different job \
positions, roles, and professional categories.

🧩 **Overview**

The application enables organizations to build structured evaluations \
to objectively measure candidates' technical skills, cognitive \
abilities, behavior, interpersonal skills, and psychological traits.

These assessments provide detailed insights that support decision-making \
in recruitment processes, helping determine whether a candidate meets \
the requirements for a specific role.

## User Flow

1. **User Registration:** Users register and authenticate via Firebase Auth.
2. **Company Information:** Users provide company details (name, address, \
   phone, mission, objectives) they are applying for.
3. **Position Selection:** Users specify the job position they are applying \
   for within the company.
4. **Assessment Access:** Users can view and take assessments related to \
   their selected position, tailored considering the company type and \
   position requirements.

🏗️ **Architecture & Tech Stack**

The project is built using modern, scalable, and secure technologies:

- **Next.js**: A React framework for building modern web applications, \
  supporting Server-Side Rendering (SSR), Static Site Generation (SSG), \
  and API Routes.
- **MongoDB**: A NoSQL database used to store users, assessments, \
  questions, results, and system configurations.
- **Firebase Authentication**: Authentication service used to securely \
  manage users, supporting multiple sign-in methods and role-based \
  access control.
- **Material UI**: React component library for building responsive, \
  accessible UI components.

🧱 **Project Modules**

1. **Skill Categories**
   - Assessments can be classified by skill type, such as:
     - Problem-solving
     - Behavior
     - Interpersonal skills
     - Customer service
     - And others

2. **Position-Based Categories**
   - Evaluations organized by job role:
     - Manager
     - Leader
     - Customer Service
     - Other specific roles

3. **Assessments**
   - Assessments are collections of questions designed to evaluate \
     specific skills or job positions.
   - Key features:
     - Configurable question sets
     - Generated based on skills or roles
     - Minimum and maximum number of questions per assessment

4. **Questions & Evaluation**
   - Supports multiple question types:
     - Multiple selection
     - Single selection
     - Text input
   - Evaluation Logic: Automatic or manual (admin/manager review), \
     each question contributes a percentage to the final score.

5. **Reports & Results**
   - Results are displayed through structured reports.
   - Access restricted by user role:
     - Administrator
     - Manager
     - Candidate

6. **Users & Roles**
   - User management with different permission levels.
   - Secure authentication via Firebase.
   - Admin panel to create, invite, update, and delete users, \
     assign roles and permissions.

## Project Structure

```
.
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── login/          # Login page
│   │   ├── profile/        # User profile page
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable React components
│   │   └── AuthGuard.tsx   # Route protection component
│   ├── config/             # Configuration files
│   │   └── themeConfig.ts  # Material UI theme
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication context
│   └── lib/                # Utility libraries
│       ├── firebase-admin.ts # Firebase Admin SDK
│       └── firebase-client.ts # Firebase Client SDK
├── .env.local              # Environment variables (not committed)
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js 18+
- Bun package manager (recommended)
- Firebase project with Authentication enabled
- MongoDB database (for future data storage)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aliesknly/assessment-app.git
   cd assessment-app
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Set up environment variables:
   - Copy `.env.local` and configure Firebase keys \
     (see `.env.local` section above).

4. Run the development server:

   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Roadmap

Basándome en la descripción del proyecto, aquí va una sugerencia \
de roadmap dividido en fases:

### Fase 1: Core Authentication & User Management (En progreso)

- Firebase Auth integration
- User registration and login
- **Onboarding Flow:**
  - Company information input (name, address, phone, mission, objectives)
  - Position selection for job application
  - Basic profile setup
- User roles (Admin, Manager, Candidate)
- Protected routes
- Basic profile page

### Fase 2: Assessment Creation & Assignment

- Create/edit assessments with categories (skills, positions)
- Question types: Multiple choice, Single choice, Text input
- Question management (CRUD)
- Assessment configuration (min/max questions)
- **Assessment Filtering & Display:**
  - Filter assessments by company type and position
  - Personalized dashboard showing relevant assessments for candidates

### Fase 3: Assessment Taking

- Candidate interface to take assessments
- Real-time question navigation
- Auto-save progress
- Time limits and validation

### Fase 4: Evaluation & Reporting

- Automatic evaluation for choice questions
- Manual review system for text answers
- Score calculation and percentage contributions
- Reports dashboard with role-based access

### Fase 5: Admin Panel & Advanced Features

- User management (invite, assign roles)
- Assessment analytics and statistics
- Export results (PDF, CSV)
- Integration with MongoDB for data persistence
- Advanced evaluation algorithms

### Fase 6: Production & Optimization

- Deployment setup (Vercel, Firebase Hosting)
- Performance optimization
- Testing suite (unit, integration, e2e)
- Security hardening
- Multi-language support
