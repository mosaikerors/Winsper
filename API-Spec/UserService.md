# User-Service API
#### port:7120
**注意，中文可能返回的是乱码!!!**

## 认证

在 request header 里加上 `uId`, `token` 两个字段：

```json
uId: Long
Authorization: Bearer jwt.token.here
```

## exception

对于所有**非预期**的响应（如被熔断），除了特别指明场景及对应的 rescode 以外，均返回以下内容：

```json
{
    "rescode": 1
}
```

对于所有**认证失败**的请求，返回以下内容：

```json
{
    "rescode": 2
}
```

## 凭手机号获取验证码

`POST /user/sendCode` （不需要认证）

request body:


 ```json
{
    "phone": String
}
 ```
response body:

```json
{
    "rescode": 0,
    "token": String  //用 code 加密 phone
}
```

### exception

#### 手机号已被注册

```json
{
    "rescode": 3
}
```

#### 发送验证码失败

````json
{
    "rescode": 4
}
````

## 注册

`POST /user/signup` （不需要认证）

request body:


```json
{
    "token": String,
    "phone": String,
    "code": String,
    "username": String,
    "password": String
}
```
response body:

```json
{
    "rescode": 0
}
```

### exception

#### 手机号已被注册

```json
{
    "rescode": 3
}
```

#### 验证码不正确

```json
{
    "rescode": 4
}
```

## 登录

> 根据 requestBody 中是否含有 token 字段来判定是否第一次登录
> 第一次登录，需要提供手机号和密码，返回 token
> 后续登录，需要提供 token 和 uId，若 token 没过期，就登录成功，并给 token 续命，然后返回新的 token
> 若 token 过期，就要求重新进行第一次登录
> token 是用 uId 构建的

`POST /user/login` 

request body:

+ 第一次登录 （不需要认证）

  ```json
   {
      "phone": String,
      "password": String
   }
  ```

+ 后续登录 （需要认证，**例外：认证所需的 uId 和 token 放在 body 里**）

  ```json
  {
      "uId": Long,
      "token": String
  }
  ```

response body:

```json
{
    "rescode": 0,
    "token": String,
    "uId": Long,
    "username": String,
    "status": Integer,
    "feather": Integer,    
    "mutualFollow": Integer,    
    "following": Integer,    
    "followers": Integer,   
    "hasChecked": Bool,      
    "avater": url       
}
```

### exception

#### 该用户被禁用

```json
{
    "rescode": 3
}
```

#### 手机号或密码不正确

```json
{
    "rescode": 4
}
```

## 更新用户名

`PUT /user/update/username` （需要认证）

request body:


 ```
{
    "username": String
}
 ```
response body:

```json
{
    "rescode": 0
}
```

## 更新头像

`PUT /user/update/avatar` （需要认证）

request body:

```json
{
    "avatar": url
}
```

response body:

```json
{
    "rescode": 0
}
```

## 签到

`POST /user/check` （需要认证）

response body:

```json
{
    "rescode": 0,
    "newFeather": Integer
}
```

### exception

#### 今天已经签过到

```json
{
    "rescode": 3
}
```

## 关注

`POST /user/follow` （需要认证）

request body:

```json
{
    "targetUId": 3   // 要关注谁
}
```

response body:

```json
{
    "rescode": 0
}
```

## 取关

`POST /user/unfollow` （需要认证）

request body:

```json
{
    "targetUId": 3   // 要取关谁
}
```

response body:

```json
{
    "rescode": 0
}
```

### exception

#### 未曾关注此人

~~~json
{
    "rescode": 3
}
~~~



## 查看个人信息

场景：用户每次进入个人信息页面，会向后端请求一次最新的数据

`GET /user/info/me` （需要认证）

response body:

```json
{
    "rescode": 0,
    "avater": url,
    "username": String,
    "status": Integer,
    "feather": Integer,    
    "mutualFollow": Integer,    
    "following": Integer,    
    "followers": Integer,   
    "hasChecked": Bool,      
}
```

## 查看他人信息

场景：用户进入他人主页，会向后端请求一次最新的数据

`GET /user/info?uId=4` （需要认证）

response body:

```json
{
    "rescode": 0,      
    "avater": url,
    "username": String,
    "feather": Integer,    
    "mutualFollow": Integer,    
    "following": Integer,    
    "followers": Integer,   
    "isHeanPublic": bool,
    "isCollectionPublic": bool,
    "isDiaryPublic": bool,
    "isJournalPublic": bool,
    "isSubmissionPublic": bool,
    "isCommentPublic": bool,
}
```

## 隐私设置

可以设置消息、函、收藏、日记、手账、投稿以及评论对于他人是否可见

在这里设置的函的可见度控制的是当别人进入你的主页时是否可以查看全部的函，而在地图上显示的函是一直公开的。

这七个 api 只有 url 不同，request body 和 response body 相同

### 函

`PUT /user/privacy/hean` （需要认证）

### 收藏

`PUT /user/privacy/collection` （需要认证）

### 日记

`PUT /user/privacy/diary` （需要认证）

### 手账

`PUT /user/privacy/journal` （需要认证）

### 投稿

`PUT /user/privacy/submission` （需要认证）

### 心情报表

`PUT /user/privacy/moodReport` （需要认证）

### 评论

`PUT /user/privacy/comment` （需要认证）

### request body

```json
{
    "toBePublic": true  // true为设置成公开，false为设置成不公开
}
```

### response body

```json
{
    "rescode": 0
}
```



