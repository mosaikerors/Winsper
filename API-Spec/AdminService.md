# Admin-Service API
#### port:7120
**注意，中文可能返回的是乱码!!!**

## 认证

在 request header 里加上 `uId`, `token` 两个字段：

```json
uId: Long
Authorization: Bearer jwt.token.here
```

## 查询所有用户(不含其他管理员)

`GET /admin/admin/userList` （需要认证）

response body:

+ if user exists

  ```json
  {
      "userList": [
          {
              "uId": Long,
              "username": String,
              "phone": String,
              "status": int,
          }
      ],
      "message": "ok"
  }
  ```

+ if no user

  ```json
  {
      "message": "Oops,尚未有其他用户"
  }
  ```

## 根据uId解禁/封禁用户

`POST /admin/admin/manage` （需要认证）

request body:

``` json
{
    "uId": Long
}
```

response body:

+ if succeed, return current status of the user

  ```json
  {
      "status": int,
      "message": "ok"
  }
  ```

+ if fail

  ```json
  {
      "message": "无法获取该用户信息"
  }
  ```

