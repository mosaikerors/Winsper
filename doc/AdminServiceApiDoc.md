# Admin-Service API
#### port:7120
##### <bold> 注意，中文可能返回的是乱码!!!
<ul> path:/admin/admin/userList
<li> description: 查询所有用户(不含其他管理员)
<li> method:GET
<li> RequestHeader: token
<li> Response：JSONObject example：<br/>

```
{//if user exists
  "userList":{
    {
      "uId": Long,
      "username": String,
      "phone": String,
      "status": int,
    }
    ...
  };
  "message":"ok"
}
{//if no user
  "message":"Oops,尚未有其他用户"
}
```
</ul>
<ul> path:/admin/admin/manage
<li> description: 根据uId解禁/封禁用户
<li> method:POST
<li> RequestHeader: token
<li> RequestBody: JSONObject example:

 ```
{
  "uId": Long
}
```
<li> Response：JSONObject example：<br/>

```
{//if succeed，return current status of the user
  "status": i,
  "message":"ok"
}

{//if fail
  "message":"无法获取该用户信息"
}
```
