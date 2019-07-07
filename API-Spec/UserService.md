# User-Service API
#### port:7120
**注意，中文可能返回的是乱码!!!**

## 凭手机号获取验证码

`POST /user/user/sendCode` （不需要认证）

request body:


 ```json
 {
    "phone": String
 }
 ```
response body:

+ if this phone is used

  ```json
  {
      "message": "该手机号已被注册！"
  }
  ```

+ if fail

  ````json
  {
      "message": "发送验证码失败，请稍后重试"
  }
  ````

+ if succeed

  ```json
  {
      "message": "ok",
      "token": String
  }
  ```

## 登录？

`POST /user/user/signup` （不需要认证）

request body:


```json
{
    "token": String,
    "phone": String
}
```
response body:

+ if succeed

  ```json
  {
      "message": "ok"
  }
  ```

+ if fail

  ```json
  {
      "message": String
  }
  ```

## 登录

根据requestBody中是否含有token字段来判定是否第一次登录
第一次登录，需要提供手机号和密码，返回token
后续登录，需要提供token和uId，若token没过期，就登录成功，并给token续命，然后返回新的token
若token过期，就要求重新进行第一次登录
token是用uId构建的

`POST /user/user/login` 

request body:

+ 第一次登录 （不需要认证）

  ```json
   {
      "phone": String
   }
  ```

+ 后需登录 （需要认证）

  ```json
  {
      "uId": Long
  }
  ```

response body:

+ if the user is banned

  ```json
  {
      "message": "该用户已被禁用"
  }
  ```

+ if fail

  ```json
  {
      "message": "手机号或密码不正确"
  }
  ```

+ if succeed

  ```json
  {
      "message": "ok",
      "token": String,
      "uId": Long,
      "username": String,
      "status": Integer
  }
  ```

## 更新用户名

`PUT /user/user/updateInfo` （需要认证）

request body:


 ```
 {
    "uId": Long,
    "username": String
 }
 ```
response body:

+ if authentication failed

  ```json
  {
      "message": "抱歉，你没有这个权限"
  }
  ```

+ if this uID not exists

  ```json
  {
      "message": "该用户id不存在"
  }
  ```

+ if succeed

  ```json
  {
      "message": "ok"
  }
  ```

  