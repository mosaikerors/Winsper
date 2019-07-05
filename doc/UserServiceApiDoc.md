# User-Service API
#### port:7120
##### <bold> 注意，中文可能返回的是乱码!!!
<ul> path:/user/user/sendCode
<li> description: 凭手机号获取验证码
<li> method:POST
<li> RequestBody: JSONObject example:

 ```
 {
  "phone": String
 }
 ```
<li> Response：JSONObject example：<br/>

```
{//if this phone is used
  "message": "该手机号已被注册！"
}

{//if fail
  "message": "发送验证码失败，请稍后重试"
}

{//if succeed
  "message": "ok",
  "token": String
}
```
</ul>
</br>
<ul> path:/user/user/signup
<li> description: 用户登录
<li> method:POST
<li> RequestBody: JSONObject example:

```
{
  "token": String,
  "phone": String
}
```
<li> Response：JSONObject example：<br/>

```
{//if succeed
  "message":"ok"
}

{//if fail
  "message":String
}
```
</ul>
</br>
<ul> path:/user/user/login
<li> description: 登录<br/>
 登录，根据requestBody中是否含有token字段来判定是否第一次登录<br>
 第一次登录，需要提供手机号和密码，返回token<br>
 后续登录，需要提供token和uId，若token没过期，就登录成功，并给token续命，然后返回新的token<br>
 若token过期，就要求重新进行第一次登录</bold>
token是用uId构建的

<li> method:POST
<li>RequestHeader: token(若为后续登陆则需要）
<li> RequestBody: JSONObject example:

 ```
 {//第一次登录，无需header
  "phone": String
 }

 {//后续登录，需要header
  "uId":Long
 }
```
<li> Response：JSONObject example：<br/>

```
{//if the user is banned
  "message": "该用户已被禁用"
}

{//else if fail
  "message": "手机号或密码不正确"
}

{//if succeed
  "message": "ok",
  "token": String,
  "uId": Long,
  "username": String,
  "status": Integer
}
```
</ul>
</br>
<ul> path:/user/user/updateInfo
<li> description: 更新用户名
<li> method:PUT
<li> RequestHeader: token
<li> RequestBody: JSONObject example:

 ```
 {
  "uId": Long,
  "username": String
 }
 ```
<li> Response：JSONObject example：<br/>

```
{//if no authority
  "message": "抱歉，你没有这个权限"
}

{//if this uID not exists
  "message": "该用户id不存在"
}

{//if succeed
  "message": "ok",
}
```
</ul>
</br>
