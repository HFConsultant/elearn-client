# elearn-client
E-Learning Platform (Full-Stack Javascript)

Technologies and architectural considerations:
Next.js was chosen for its performance enhancements of React by strategically rendering selected content on the server instead of the client while maintaining all of the advantages of the React framework.
Future scalability and cost were driving considerations on the structuring of this application.  AWS microservices for deployment and content storage were chosen. Specifically, the EC2 Linux VM instance for deploying both the back-end server and front-end SPA allows for unlimited horizontal scaling as well as regional scaling world-wide. In addition, AWS S3 object storage is the lowest cost option with unlimited growth potential.
Mongo Atlas was chosen as a managed user database because it is arguably the most critical component for platform management and user experience. Therefore, keeping it separate in every way and being monitored provides the highest level of security and safety.
Employing Stripe as the payment processing service adds a reputable financial partner and level of security that takes away a potential barrier for mass adoption.  

How does this elearning platform work?
All existing courses are displayed on the home page. In order to ‘Enroll’ in them, the user needs to create an account through ‘Registering’ and then logging in.  A preview of each course is available without an account.
Once a user has an account, they can ‘Become an Instructor’. By selecting this option it takes them to the Stripe website to create an account to receive payments and redirects them back upon completion. On the back-end, once the Stripe account is verified, the role of ‘Instructor’ is added to the user’s profile in Mongo Atlas. 
As an ‘Instructor’, the user has access to the platform's course creation functionality.  A form becomes available with text fields to Title the course and then Describe the course. In addition, an image can be uploaded that will represent the course. There are options to set the price of the course as well as offer it for free.
Once the course exists, unlimited ‘Lessons’ can be added. Another form becomes available to Title and describe each lesson. The main content of each lesson should be a video file that is easily uploaded. 
Options for editing, viewing the number of enrolled users and publishing the course are available under the ‘Instructor’ view only available to Instructors.  All of these routes are protected on the back-end through vigorous algorithms running with each API request.
All users have a ‘Dashboard’ that displays all of the courses they are enrolled in.
