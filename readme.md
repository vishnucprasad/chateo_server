# chateo_server

## **Chateo API**

**API**: [http://localhost:3000](http://localhost:3000)

**Authentication**: JWT token authentication is required for all requests except for the verification endpoints.

<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->

1. [Verify Phone](#1-verify-phone)
    1. [Verify Phone](#i-example-request-verify-phone)
1. [Verify OTP](#2-verify-otp)
    1. [Verify OTP](#i-example-request-verify-otp)
1. [Resend OTP](#3-resend-otp)
    1. [Resend OTP](#i-example-request-resend-otp)
1. [Refresh Token](#4-refresh-token)
    1. [Refresh Token](#i-example-request-refresh-token)
1. [Get auth](#5-get-auth)
    1. [Get auth](#i-example-request-get-auth)
1. [Update Profile](#6-update-profile)
    1. [Update Profile](#i-example-request-update-profile)
1. [New Chat](#7-new-chat)
    1. [New Chat](#i-example-request-new-chat)
1. [New Group Chat](#8-new-group-chat)
    1. [New Group Chat](#i-example-request-new-group-chat)
1. [Add Member](#9-add-member)
    1. [Add Member](#i-example-request-add-member)
1. [Remove Member](#10-remove-member)
    1. [Remove Member](#i-example-request-remove-member)
1. [Make As Admin](#11-make-as-admin)
    1. [Make As Admin](#i-example-request-make-as-admin)
1. [Dismiss As Admin](#12-dismiss-as-admin)
    1. [Dismiss As Admin](#i-example-request-dismiss-as-admin)
1. [Edit Group](#13-edit-group)
    1. [Edit Group](#i-example-request-edit-group)
1. [Update Group Permissions](#14-update-group-permissions)
    1. [Update Group Permissions](#i-example-request-update-group-permissions)
1. [Update Settings](#15-update-settings)
    1. [Update Settings](#i-example-request-update-settings)
1. [Delete Group](#16-delete-group)
    1. [Delete Group](#i-example-request-delete-group)
1. [Get All Chats](#17-get-all-chats)
    1. [Get All Chats](#i-example-request-get-all-chats)
1. [New Message](#18-new-message)
    1. [New Message](#i-example-request-new-message)

## Endpoints

---

### 1. Verify Phone

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/v1/auth/verify/phone
```

**_Body:_**

```js
{
    "countryCode": "+91",
    "phone": "8157983670"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Verify Phone

**_Body:_**

```js
{
    "countryCode": "+91",
    "phone": "9876543210"
}
```

#### I. Example Response: Verify Phone

```js
{
    "error": false,
    "verification": {
        "sid": "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "to": "+919876543210",
        "status": "pending"
    },
    "message": "An OTP has been sent to +91 9876543210"
}
```

**_Status Code:_** 200

<br>

### 2. Verify OTP

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/v1/auth/verify/otp
```

**_Body:_**

```js
{
    "countryCode": "+91",
    "phone": "8157983670",
    "otp": "2704"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Verify OTP

**_Body:_**

```js
{
    "countryCode": "+91",
    "phone": "9876543210",
    "otp": "2504"
}
```

#### I. Example Response: Verify OTP

```js
{
    "error": false,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ3NDUwYzk1ZWM0MGJkNjZhOWEyNjciLCJyb2xlIjoidXNlciIsImlhdCI6MTY4MjM5MjgwMywiZXhwIjoxNjgyMzkzNDAzfQ.f1sqx_Xi_xoFDrVHehFSzDcKSnyum3wN98H9oWBWjgA",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ3NDUwYzk1ZWM0MGJkNjZhOWEyNjciLCJyb2xlIjoidXNlciIsImlhdCI6MTY4MjM5MjgwMywiZXhwIjoxNjg3NTc2ODAzfQ.Y7yyXhHqRgD6aVGCWaDQWN6fTpxW46-_4bFB7_nC_Ig",
    "user": {
        "_id": "6447450c95ec40bd66a9a267",
        "countryCode": "+91",
        "phone": "9876543210",
        "isVerified": true,
        "isProfileCompleted": false,
        "__v": 0
    },
    "message": "OTP verified"
}
```

**_Status Code:_** 200

<br>

### 3. Resend OTP

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/v1/auth/verify/resendotp
```

**_Body:_**

```js
{
    "countryCode": "+91",
    "phone": "8157983670",
    "currentSid": "VE4f8dbe0ce45e32fbacb09d576984968b"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Resend OTP

**_Body:_**

```js
{
    "countryCode": "+91",
    "phone": "9876543210",
    "currentSid": "VE4f8dbe0ce45e32fbacb09d576984968b"
}
```

#### I. Example Response: Resend OTP

```js
{
    "error": false,
    "verification": {
        "sid": "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "to": "+919876543210",
        "status": "pending"
    },
    "message": "An OTP has been sent to +91 9876543210"
}
```

**_Status Code:_** 200

<br>

### 4. Refresh Token

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/v1/auth/refresh
```

**_Body:_**

```js
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQzZGI5YWE0ODBlY2FkYzFlNjBjNzMiLCJyb2xlIjoidXNlciIsImlhdCI6MTY4MjU2ODYzOCwiZXhwIjoxNjg3NzUyNjM4fQ.pkedQXbjzDR5kue5qX6MAsXcSW8AK_NKDa292xDEhXI"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Refresh Token

**_Body:_**

```js
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQzZGI5YWE0ODBlY2FkYzFlNjBjNzMiLCJyb2xlIjoidXNlciIsImlhdCI6MTY4MjM5MDkyMywiZXhwIjoxNjg3NTc0OTIzfQ.MQ868xwXuNOxy9Hq_wWkMawWQ6brOu6XbOllQJxhHf8"
}
```

#### I. Example Response: Refresh Token

```js
{
    "error": false,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQzZGI5YWE0ODBlY2FkYzFlNjBjNzMiLCJyb2xlIjoidXNlciIsImlhdCI6MTY4MjM5NDQ1NiwiZXhwIjoxNjgyMzk1MDU2fQ.tEwZjrhKwnYBU2j2rqZH_afXzHVGrAK21wBeCfHxlW0",
    "message": "Access token refreshed successfully"
}
```

**_Status Code:_** 200

<br>

### 5. Get auth

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://localhost:3000/api/v1/auth
```

**_More example Requests/Responses:_**

#### I. Example Request: Get auth

**_Body: None_**

#### I. Example Response: Get auth

```js
{
    "error": false,
    "user": {
        "_id": "6447450c95ec40bd66a9a267",
        "countryCode": "+91",
        "phone": "9876543210",
        "isVerified": true,
        "isProfileCompleted": false,
        "__v": 0
    }
}
```

**_Status Code:_** 200

<br>

### 6. Update Profile

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: http://localhost:3000/api/v1/auth
```

**_Body:_**

```js
{
    "firstName": "Vishnu",
    "lastName": "C Prasad",
    "isProfileCompleted": true
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Update Profile

**_Body:_**

```js
{
    "firstName": "Chateo",
    "lastName": "API",
    "isProfileCompleted": true
}
```

#### I. Example Response: Update Profile

```js
{
    "error": false,
    "user": {
        "_id": "6447450c95ec40bd66a9a267",
        "countryCode": "+91",
        "phone": "9876543210",
        "isVerified": true,
        "isProfileCompleted": true,
        "__v": 0,
        "firstName": "Chateo",
        "lastName": "API"
    }
}
```

**_Status Code:_** 200

<br>

### 7. New Chat

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/v1/chat/new
```

**_Body:_**

```js
{
    "to": "6446991e8f13b245851d2294",
    "message": {
        "text": "Hello"
    }
}
```

**_More example Requests/Responses:_**

#### I. Example Request: New Chat

**_Body:_**

```js
{
    "to": "6446991e8f13b245851d2294",
    "message": {
        "text": "Hello"
    }
}
```

#### I. Example Response: New Chat

```js
{
    "error": false,
    "chat": {
        "members": [
            "6443db9aa480ecadc1e60c73",
            "6446991e8f13b245851d2294"
        ],
        "messages": [
            "64473f381ec66e17fa6d769c"
        ],
        "_id": "64473f381ec66e17fa6d769b",
        "__v": 0
    }
}
```

**_Status Code:_** 200

<br>

### 8. New Group Chat

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/v1/chat/group/new
```

**_Body:_**

```js
{
    "groupDetails": {
        "name": "Brainstorm"
    },
    "members": [
        {"userId": "6446991e8f13b245851d2294"},
        {"userId": "6447450c95ec40bd66a9a267"}
    ]
}
```

**_More example Requests/Responses:_**

#### I. Example Request: New Group Chat

**_Body:_**

```js
{
    "groupDetails": {
        "name": "Brainstorm"
    },
    "members": [
        {"userId": "6446991e8f13b245851d2294"},
        {"userId": "6447450c95ec40bd66a9a267"}
    ]
}
```

#### I. Example Response: New Group Chat

```js
{
    "error": false,
    "chat": {
        "name": "Brainstorm",
        "createdAt": 1682441949286,
        "modifiedAt": 1682441949286,
        "isActive": true,
        "isMuted": false,
        "permissions": {
            "sendMessages": "everyone",
            "manageGroup": "everyone"
        },
        "members": [
            {
                "userId": "6443db9aa480ecadc1e60c73",
                "isOwner": true,
                "isAdmin": true,
                "_id": "644806e03ad08eba4ae0f74f"
            },
            {
                "userId": "6446991e8f13b245851d2294",
                "isOwner": false,
                "isAdmin": false,
                "_id": "644806e03ad08eba4ae0f750"
            },
            {
                "userId": "6447450c95ec40bd66a9a267",
                "isOwner": false,
                "isAdmin": false,
                "_id": "644806e03ad08eba4ae0f751"
            }
        ],
        "messages": [],
        "_id": "644806e03ad08eba4ae0f74e",
        "__v": 0
    }
}
```

**_Status Code:_** 200

<br>

### 9. Add Member

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/v1/chat/group/member
```

**_Body:_**

```js
{
    "chatId": "644807523ad08eba4ae0f753",
    "userId": "64489734c6c9612a46d1da43"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Add Member

**_Body:_**

```js
{
    "chatId": "644807523ad08eba4ae0f753",
    "userId": "64489734c6c9612a46d1da43"
}
```

#### I. Example Response: Add Member

```js
{
    "error": false,
    "chat": {
        "permissions": {
            "sendMessages": "everyone",
            "manageGroup": "everyone"
        },
        "_id": "644807523ad08eba4ae0f753",
        "name": "Brainstorm",
        "createdAt": 1682441949286,
        "modifiedAt": 1682484411412,
        "isActive": true,
        "isMuted": false,
        "members": [
            {
                "userId": "6443db9aa480ecadc1e60c73",
                "isOwner": true,
                "isAdmin": true,
                "_id": "644807523ad08eba4ae0f754"
            },
            {
                "userId": "6446991e8f13b245851d2294",
                "isOwner": false,
                "isAdmin": false,
                "_id": "644807523ad08eba4ae0f755"
            },
            {
                "userId": "6447450c95ec40bd66a9a267",
                "isOwner": false,
                "isAdmin": false,
                "_id": "644807523ad08eba4ae0f756"
            },
            {
                "userId": "64489734c6c9612a46d1da43",
                "isOwner": false,
                "isAdmin": false,
                "_id": "6448acbb8aded062d864252f"
            }
        ],
        "messages": [],
        "__v": 0
    }
}
```

**_Status Code:_** 200

<br>

### 10. Remove Member

**_Endpoint:_**

```bash
Method: DELETE
Type: RAW
URL: http://localhost:3000/api/v1/chat/group/member
```

**_Body:_**

```js
{
    "chatId": "644807523ad08eba4ae0f753",
    "userId": "64489734c6c9612a46d1da43"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Remove Member

**_Body:_**

```js
{
    "chatId": "644807523ad08eba4ae0f753",
    "userId": "64489734c6c9612a46d1da43"
}
```

#### I. Example Response: Remove Member

```js
{
    "error": false,
    "chatId": "644807523ad08eba4ae0f753",
    "userId": "64489734c6c9612a46d1da43"
}
```

**_Status Code:_** 200

<br>

### 11. Make As Admin

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/v1/chat/group/admin
```

**_Body:_**

```js
{
    "chatId": "644807523ad08eba4ae0f753",
    "userId": "64489734c6c9612a46d1da43"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Make As Admin

**_Body:_**

```js
{
    "chatId": "644807523ad08eba4ae0f753",
    "userId": "64489734c6c9612a46d1da43"
}
```

#### I. Example Response: Make As Admin

```js
{
    "error": false,
    "chat": {
        "permissions": {
            "sendMessages": "everyone",
            "manageGroup": "everyone"
        },
        "_id": "644807523ad08eba4ae0f753",
        "name": "Brainstorm",
        "createdAt": 1682441949286,
        "modifiedAt": 1682516335387,
        "isActive": true,
        "isMuted": false,
        "members": [
            {
                "userId": "6443db9aa480ecadc1e60c73",
                "isOwner": true,
                "isAdmin": true,
                "_id": "644807523ad08eba4ae0f754"
            },
            {
                "userId": "6446991e8f13b245851d2294",
                "isOwner": false,
                "isAdmin": false,
                "_id": "644807523ad08eba4ae0f755"
            },
            {
                "userId": "6447450c95ec40bd66a9a267",
                "isOwner": false,
                "isAdmin": false,
                "_id": "644807523ad08eba4ae0f756"
            },
            {
                "userId": "64489734c6c9612a46d1da43",
                "isOwner": false,
                "isAdmin": true,
                "_id": "6449287e20afc5a50b84b005"
            }
        ],
        "messages": [],
        "__v": 0
    }
}
```

**_Status Code:_** 200

<br>

### 12. Dismiss As Admin

**_Endpoint:_**

```bash
Method: DELETE
Type: RAW
URL: http://localhost:3000/api/v1/chat/group/admin
```

**_Body:_**

```js
{
    "chatId": "644807523ad08eba4ae0f753",
    "userId": "64489734c6c9612a46d1da43"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Dismiss As Admin

**_Body:_**

```js
{
    "chatId": "644807523ad08eba4ae0f753",
    "userId": "64489734c6c9612a46d1da43"
}
```

#### I. Example Response: Dismiss As Admin

```js
{
    "error": false,
    "chat": {
        "permissions": {
            "sendMessages": "everyone",
            "manageGroup": "everyone"
        },
        "_id": "644807523ad08eba4ae0f753",
        "name": "Brainstorm",
        "createdAt": 1682441949286,
        "modifiedAt": 1682520219964,
        "isActive": true,
        "isMuted": false,
        "members": [
            {
                "userId": "6443db9aa480ecadc1e60c73",
                "isOwner": true,
                "isAdmin": true,
                "_id": "644807523ad08eba4ae0f754"
            },
            {
                "userId": "6446991e8f13b245851d2294",
                "isOwner": false,
                "isAdmin": false,
                "_id": "644807523ad08eba4ae0f755"
            },
            {
                "userId": "6447450c95ec40bd66a9a267",
                "isOwner": false,
                "isAdmin": false,
                "_id": "644807523ad08eba4ae0f756"
            },
            {
                "userId": "64489734c6c9612a46d1da43",
                "isOwner": false,
                "isAdmin": false,
                "_id": "6449287e20afc5a50b84b005"
            }
        ],
        "messages": [],
        "__v": 0
    }
}
```

**_Status Code:_** 200

<br>

### 13. Edit Group

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: http://localhost:3000/api/v1/chat/group
```

**_Body:_**

```js
{
    "chatId": "644807523ad08eba4ae0f753",
    "name": "Brainstorm here"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Edit Group

**_Body:_**

```js
{
    "chatId": "644807523ad08eba4ae0f753",
    "name": "Brainstorm here",
    "description": "Developers community"
}
```

#### I. Example Response: Edit Group

```js
{
    "error": false,
    "chat": {
        "permissions": {
            "sendMessages": "everyone",
            "manageGroup": "everyone"
        },
        "_id": "644807523ad08eba4ae0f753",
        "name": "Brainstorm here",
        "createdAt": 1682441949286,
        "modifiedAt": 1682563995800,
        "isActive": true,
        "isMuted": false,
        "members": [
            {
                "userId": "6443db9aa480ecadc1e60c73",
                "isOwner": true,
                "isAdmin": true,
                "_id": "644807523ad08eba4ae0f754"
            },
            {
                "userId": "6446991e8f13b245851d2294",
                "isOwner": false,
                "isAdmin": false,
                "_id": "644807523ad08eba4ae0f755"
            },
            {
                "userId": "6447450c95ec40bd66a9a267",
                "isOwner": false,
                "isAdmin": false,
                "_id": "644807523ad08eba4ae0f756"
            },
            {
                "userId": "64489734c6c9612a46d1da43",
                "isOwner": false,
                "isAdmin": false,
                "_id": "6449287e20afc5a50b84b005"
            }
        ],
        "messages": [],
        "__v": 0,
        "description": "Developers community"
    }
}
```

**_Status Code:_** 200

<br>

### 14. Update Group Permissions

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: http://localhost:3000/api/v1/chat/group/permissions
```

**_Body:_**

```js
{
    "chatId": "644807523ad08eba4ae0f753",
    "permissions": {
        "sendMessages": "everyone",
        "manageGroup": "adminonly"
    }
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Update Group Permissions

**_Body:_**

```js
{
    "chatId": "644807523ad08eba4ae0f753",
    "permissions": {
        "sendMessages": "everyone",
        "manageGroup": "adminonly"
    }
}
```

#### I. Example Response: Update Group Permissions

```js
{
    "error": false,
    "chat": {
        "permissions": {
            "sendMessages": "everyone",
            "manageGroup": "adminonly"
        },
        "_id": "644807523ad08eba4ae0f753",
        "name": "Brainstorm here",
        "createdAt": 1682441949286,
        "modifiedAt": 1682573307799,
        "isActive": true,
        "isMuted": false,
        "members": [
            {
                "userId": "6443db9aa480ecadc1e60c73",
                "isOwner": true,
                "isAdmin": true,
                "_id": "644807523ad08eba4ae0f754"
            },
            {
                "userId": "6446991e8f13b245851d2294",
                "isOwner": false,
                "isAdmin": false,
                "_id": "644807523ad08eba4ae0f755"
            },
            {
                "userId": "6447450c95ec40bd66a9a267",
                "isOwner": false,
                "isAdmin": false,
                "_id": "644807523ad08eba4ae0f756"
            },
            {
                "userId": "64489734c6c9612a46d1da43",
                "isOwner": false,
                "isAdmin": false,
                "_id": "6449287e20afc5a50b84b005"
            }
        ],
        "messages": [],
        "__v": 0,
        "description": "Developers community"
    }
}
```

**_Status Code:_** 200

<br>

### 15. Update Settings

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: http://localhost:3000/api/v1/chat/group/settings
```

**_Body:_**

```js
{
    "chatId": "644807523ad08eba4ae0f753",
    "settings": {
        "isMuted": true
    }
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Update Settings

**_Body:_**

```js
{
    "chatId": "644807523ad08eba4ae0f753",
    "settings": {
        "isMuted": true
    }
}
```

#### I. Example Response: Update Settings

```js
{
    "error": false,
    "chat": {
        "permissions": {
            "sendMessages": "everyone",
            "manageGroup": "adminonly"
        },
        "_id": "644807523ad08eba4ae0f753",
        "name": "Brainstorm here",
        "createdAt": 1682441949286,
        "modifiedAt": 1682648839288,
        "isActive": true,
        "isMuted": true,
        "members": [
            {
                "userId": "6443db9aa480ecadc1e60c73",
                "isOwner": true,
                "isAdmin": true,
                "_id": "644807523ad08eba4ae0f754"
            },
            {
                "userId": "6446991e8f13b245851d2294",
                "isOwner": false,
                "isAdmin": false,
                "_id": "644807523ad08eba4ae0f755"
            },
            {
                "userId": "6447450c95ec40bd66a9a267",
                "isOwner": false,
                "isAdmin": false,
                "_id": "644807523ad08eba4ae0f756"
            },
            {
                "userId": "64489734c6c9612a46d1da43",
                "isOwner": false,
                "isAdmin": false,
                "_id": "6449287e20afc5a50b84b005"
            }
        ],
        "messages": [],
        "__v": 0,
        "description": "Developers community"
    }
}
```

**_Status Code:_** 200

<br>

### 16. Delete Group

**_Endpoint:_**

```bash
Method: DELETE
Type: RAW
URL: http://localhost:3000/api/v1/chat/group
```

**_Body:_**

```js
{
    "chatId": "644807523ad08eba4ae0f753"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: Delete Group

**_Body:_**

```js
{
    "chatId": "644807523ad08eba4ae0f753"
}
```

#### I. Example Response: Delete Group

```js
{
    "error": false,
    "chat": {
        "permissions": {
            "sendMessages": "everyone",
            "manageGroup": "adminonly"
        },
        "_id": "644807523ad08eba4ae0f753",
        "name": "Brainstorm here",
        "createdAt": 1682441949286,
        "modifiedAt": 1682648839288,
        "isActive": true,
        "isMuted": true,
        "members": [
            {
                "userId": "6443db9aa480ecadc1e60c73",
                "isOwner": true,
                "isAdmin": true,
                "_id": "644807523ad08eba4ae0f754"
            },
            {
                "userId": "6446991e8f13b245851d2294",
                "isOwner": false,
                "isAdmin": false,
                "_id": "644807523ad08eba4ae0f755"
            },
            {
                "userId": "6447450c95ec40bd66a9a267",
                "isOwner": false,
                "isAdmin": false,
                "_id": "644807523ad08eba4ae0f756"
            },
            {
                "userId": "64489734c6c9612a46d1da43",
                "isOwner": false,
                "isAdmin": false,
                "_id": "6449287e20afc5a50b84b005"
            }
        ],
        "messages": [],
        "__v": 0,
        "description": "Developers community"
    }
}
```

**_Status Code:_** 200

<br>

### 17. Get All Chats

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://localhost:3000/api/v1/chat
```

**_More example Requests/Responses:_**

#### I. Example Request: Get All Chats

**_Body: None_**

#### I. Example Response: Get All Chats

```js
{
    "error": false,
    "chats": [
        {
            "permissions": {
                "sendMessages": "everyone",
                "manageGroup": "everyone"
            },
            "_id": "644c87ad8a1183412a9a3f19",
            "name": "Brainstorm",
            "createdAt": 1682736974618,
            "modifiedAt": 1682736974618,
            "isActive": true,
            "isMuted": false,
            "members": [
                {
                    "userId": "6443db9aa480ecadc1e60c73",
                    "isOwner": true,
                    "isAdmin": true,
                    "_id": "644c87ad8a1183412a9a3f1a"
                },
                {
                    "userId": "6446991e8f13b245851d2294",
                    "isOwner": false,
                    "isAdmin": false,
                    "_id": "644c87ad8a1183412a9a3f1b"
                },
                {
                    "userId": "6447450c95ec40bd66a9a267",
                    "isOwner": false,
                    "isAdmin": false,
                    "_id": "644c87ad8a1183412a9a3f1c"
                }
            ],
            "messages": [],
            "__v": 0
        },
        {
            "_id": "6447fd7b227aceeb093019a2",
            "members": [
                "6443db9aa480ecadc1e60c73",
                "6446991e8f13b245851d2294"
            ],
            "createdAt": 1682439438691,
            "modifiedAt": 1682439438691,
            "messages": [
                "6447fd7b227aceeb093019a3"
            ],
            "__v": 0
        }
    ]
}
```

**_Status Code:_** 200

<br>

### 18. New Message

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/v1/chat/message/new
```

**_Body:_**

```js
{
    "chatId": "6447fd7b227aceeb093019a2",
    "text": "This is a new message"
}
```

**_More example Requests/Responses:_**

#### I. Example Request: New Message

**_Body:_**

```js
{
    "chatId": "6447fd7b227aceeb093019a2",
    "text": "This is a new message"
}
```

#### I. Example Response: New Message

```js
{
    "error": false,
    "message": {
        "chatId": "6447fd7b227aceeb093019a2",
        "senderId": "6443db9aa480ecadc1e60c73",
        "timeStamp": 1682777610862,
        "status": "sent",
        "text": "This is a new message",
        "_id": "644d262927afc936d8ae4f1a",
        "__v": 0
    }
}
```

**_Status Code:_** 200

<br>

---

[Back to top](#chateo_server)
