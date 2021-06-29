# social-media-svc
A Nodejs app using [Express 4](http://expressjs.com/).

## Running Locally

**Step 1:** Make sure you have [Node.js](http://nodejs.org/) installed.

**Step 2:** Run these commands i.e., to clone the repo and installing dependencies:
```sh
git clone https://github.com/tanishkul/social-media-svc.git
npm install
```

**Step 3:** Create a file .env for the config variables which will be same as the .env.example.
```sh
NODE_ENV=dev
PORT=9000
MONGO_URL=mongodb://localhost:27017/social-media-db
```
- **NODE_ENV** is the node environment.
- **PORT** is the port number on which the node server will be running.
- **MONGO_URL** is the mongoDB connection string.

**STEP 4:** Start the service, using this command:
```sh
npm start
```
Your app should now be running on [localhost:9000](http://localhost:9000/api/).

**NOTE:** If you change value of any .env variable, then you have to restart the service.

## API DOCUMENTATION

### 1. Register/Sign up User
**Request**

`POST /api/user/` 
**For locally:** http://localhost:9000/api/user/

**Request Body(form-data)**:<br>

      name:user1
      email:user1@gmail.com
      password:12345
      image: --ATTACH THE IMAGE FILE

 **Response**
    
      {
    "data": {
        "name": "user1",
        "email": "user1@gmail.com",
        "image": {
            "fieldname": "image",
            "originalname": "image.jpg",
            "encoding": "7bit",
            "mimetype": "image/jpeg",
            "id": "60dae50fde38067813603247",
            "filename": "image.jpg",
            "metadata": null,
            "bucketName": "uploads",
            "chunkSize": 261120,
            "size": 1177042,
            "md5": "7206efeed9c426174613b37998f9fffa",
            "uploadDate": "2021-06-29T09:17:04.043Z",
            "contentType": "image/jpeg"
        }
    },
    "message": "User registered successfully",
    "status": "OK"
    }
    
### 2. Login/Sign in User
**Request**

`POST /api/user/login/` 
**For locally:** http://localhost:9000/api/user/

**Request Body**:<br>

      email:user1@gmail.com
      password:12345

 **Response**
    
      {
    "data": {
        "email": "user1@gmail.com",
        "id": "60d9f2683caba04e1b5b28aa",
        "name": "user1",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkOWYyNjgzY2FiYTA0ZTFiNWIyOGFhIn0sImlhdCI6MTYyNDk1ODM5OSwiZXhwIjoxNjI0OTY4Mzk5fQ.fgZZE0oXQhc_CgkT-R1Z6xRDOk3ky1qptyuMMV5Uw4w"
    },
    "message": "User loggedIn successfully",
    "status": "OK"
    }
    
### 3. Create Post
**Request**

`POST /api/post/` 
**For locally:** http://localhost:9000/api/post/

**Request Headers**:<br>

      Authorization: token

**Request Body**:<br>

      title:post1<br>
      description:post1_description
      image: --ATTACH THE IMAGE FILE

 **Response**
    
      {
    "data": {
        "description": "post1_description",
        "image": {
            "id": "60dad09b8892805778f98993",
            "contentType": "image/jpeg"
        },
        "title": "post1",
        "userId": "60d9f2683caba04e1b5b28aa",
        "originalId": "60dad09b8892805778f98995",
        "id": "60dad09b8892805778f98995"
    },
    "message": "Post created successfully",
    "status": "OK"
    }
    
### 4. Get all Post
**Request**

`GET /api/post/` 
**For locally:** http://localhost:9000/api/post/

**Request Headers**:<br>

      Authorization: token

 **Response**
    
      {
    "data": [{
        "description": "post1_description",
        "image": {
            "id": "60dad09b8892805778f98993",
            "contentType": "image/jpeg"
        },
        "title": "post1",
        "userId": "60d9f2683caba04e1b5b28aa",
        "originalId": "60dad09b8892805778f98995",
        "id": "60dad09b8892805778f98995"
    }],
    "message": "Post fetched successfully",
    "status": "OK"
    }
    
 ### 5. Get Post by Id
**Request**

`GET /api/post/:id` 
**For locally:** http://localhost:9000/api/post/60dad09b8892805778f98995

**Request Headers**:<br>

      Authorization: token

 **Response**
    
      {
    "data": {
        "description": "post1_description",
        "image": {
            "id": "60dad09b8892805778f98993",
            "contentType": "image/jpeg"
        },
        "title": "post1",
        "userId": "60d9f2683caba04e1b5b28aa",
        "originalId": "60dad09b8892805778f98995",
        "id": "60dad09b8892805778f98995"
    },
    "message": "Post fetched successfully",
    "status": "OK"
    }
    
 ### 6. Update Post
**Request**

`PUT /api/post/:id` 
**For locally:** http://localhost:9000/api/post/60dad09b8892805778f98995

**Request Headers**:<br>

      Authorization: token

**Request Body**:<br>

      title:post1<br>
      description:post1_description
      image: --ATTACH THE IMAGE FILE

 **Response**
    
      {
    "data": {
        "description": "post1_description",
        "image": {
            "id": "60dad09b8892805778f98993",
            "contentType": "image/jpeg"
        },
        "title": "post1",
        "userId": "60d9f2683caba04e1b5b28aa",
        "originalId": "60dad09b8892805778f98995",
        "id": "60dad09b8892805778f98995"
    },
    "message": "Post updated successfully",
    "status": "OK"
    }
    
 ### 7. Delete Post
**Request**

`DELETE /api/post/:id` 
**For locally:** http://localhost:9000/api/post/60dad09b8892805778f98995

**Request Headers**:<br>

      Authorization: token

 **Response**
    
      {
    "data": {
        "description": "post1_description",
        "image": {
            "id": "60dad09b8892805778f98993",
            "contentType": "image/jpeg"
        },
        "title": "post1",
        "userId": "60d9f2683caba04e1b5b28aa",
        "originalId": "60dad09b8892805778f98995",
        "id": "60dad09b8892805778f98995",
        "deletedAt": "2021-06-29T05:40:16.389Z"
    },
    "message": "Post deleted successfully",
    "status": "OK"
    }
 
    
## Database and query design
  In this nodejs service, mongoose is used to save the user and post. The images data of user is stored in the uploads.files and post's image in posts.files.
