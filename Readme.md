# API Details


## 1. Authentication endpoint:
- This will be a public endpoint.

- The request body will contain an arbitrary username/password pair. 
_Note:
Treat it as a mock authentication service and accept any
username/password._

- Return a signed JSON Web Token (JWT, https://jwt.io/) which can be used
for validation in future requests.




## 2. Virtual Classroom REST API endpoints:
The following endpoints should be protected. The JWT obtained in the
"Authentication" endpoint will be attached to each request. If the JWT is
missing or invalid, these endpoints should reject the request.
A virtual classroom refers to an online system that allows students and tutors
to communicate and collaborate through assignments.

- The virtual classroom will have the following features:

    There are two types of users in the system
    - Tutor
    - Student

- Assignments are the work assigned to students by the tutor.
- Assignment can only be created, updated and deleted by the tutor
- The assignment consists of description, list of students, published at
a and a deadline date
- Assignment published at is a date-time field at which the assignment
needs to be published, if the assignment is scheduled for future then
its status is SCHEDULED else ONGOING.
- A student can add only one submission for an assignment.
- A submission consists of a remark which will be a text field.
- If a student has added any submission for an assignment, then the
status of the assignment for that student gets updated to
SUBMITTED

**Create protected REST endpoints for the following:**

- Create/Update/Delete an assignment as a tutor
- Adding a submission for an assignment as a student
- Get the details of an assignment.
    - If the API is called by a student, then only the student's submission
should be returned
    - If the API is called by a tutor then all the submissions added for the assignment by the assigned students should be returned
- Assignment feed
    - For a tutor, the feed will return all the assignments created by the tutor
    - For students, the feed will return all the assignments assigned to the student.
    - The feed will have following filters:
        - published At(Assignment published date): Applicable for
student and tutor feed, which can have values
            - SCHEDULED
            - ONGOING
        - status (Submission status filter): Applicable for student feed only which can have values
            - ALL
            - PENDING
            - OVERDUE
            - SUBMITTED

*Notes:*

- You can use any database to store data
- No need to implement a frontend

*Important:*

- SQL files to create required tables should be present in the project.
- Attach a data model if you are using NoSQL.
- Attach an ER Diagram if you are using RDBMS.
- Attach API documentation with a request which can be executed directly.
You can use Postam Collection, Swagger etc for documentation.

## Bonus: 
Extra points for attempting these :)
1. Design a system to send notifications for upcoming assignments
Briefly describe the architecture, technologies to use and working details.
2. Deploy your code and send us the server URL
3. Implement the APIs in GraphQL
Implement all the above APIs as a GraphQL endpoint