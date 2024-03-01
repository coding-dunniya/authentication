authentication
---

A simple web application which allows users to 

1. Register - users can register on the application. Emails must be unique in the system.
2. Login - users can login and get an jwt access token in response
3. Profile - After successful authentication users can fetch their profile information.


Dependencies
---

1. express - the node web framework
2. jsonwebtoken - to generate and validate json web tokens
3. bcrypt - to hash and verify password
4. errors - Error utility functions
5. body-parser - Express middleware to parse json request body
6. lodash - utility functions
7. uuid - to generate unique uuid's
