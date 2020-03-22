#API Contract

##Authorization

1. Login
    - Method : POST
    - Link : /auth/login
    - Request Body (JSON) : 
        * username - String
        * password - String
    - Response (JSON) : 
        * 200 
        ```
        message : Successful Login
        data : user.data
        ```
        * 406 
        ```
        message : Wrong username or password
        ```
        * 500
        ```
        message : error.message
        ```

2. Registration
    - Method : POST
    - Link : /auth/register
    - Request Body (Multipart Form) :
        * name - String
        * fullName - String
        * address - String
        * birthDate - Date (YYYY-MM-DD)
        * phoneNumber - String
        * email - String
        * username - String
        * password - String
        * IDCard - File
        * bankAccount - String
        * bankNumber - String
        * role - Enum (0 | 1 | 2 | 3 | 4 | 5)
    - Response (JSON) : 
        * 200 
        ```
        message : User Registered
        data : user.data
        ```
        * 406 
        ```
        message : Field still empty
        ```
        * 500
        ```
        message : error.message
        ```