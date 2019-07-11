# Hean-Service API
#### port:7120
**注意，中文可能返回的是乱码!!!**

## 认证

在 request header 里加上 `uId`, `token` 两个字段：

```json
uId: Long
Authorization: Bearer jwt.token.here
```

## 根据uID查找用户所有历史函

`POST /hean/byUId` （需要认证）

request body:


 ```json
{
    "uId": Long
}
 ```
response body:

+ if uId exists and at least one hean exists

  ```json
  {
      "heanArray": [
      	{
         		"hId": String,
         		"uId": Long,
         		"createdTime": Long,
         		"text": String,
         		"longtitude": Double,
         		"latitude": Double,
         		"height": Double,
         		"pics":  List<String>, //Urls of pics
      	}
      ],
      "message": "ok"     
  }
  ```

+ if no hean is found

  ```json
  {
      "message": "not found"
  }
  ```

## 查找所有函

`GET /hean/all` （需要认证）

response body:

+ if uId exists and at least one hean exists

  ```json
  {
      "heanArray": [
      	{
         		"hId": String,
         		"uId": Long,
         		"createdTime": Long,
         		"text": String,
         		"longtitude": Double,
         		"latitude": Double,
         		"height": Double,
         		"pics":  List<String>, //Urls of pics
      	}
      ],
      "message": "ok"     
  }
  ```

## 新建函

`POST /hean/upload` （需要认证）

request :  (**form-data**)

```
"uId": Long
"pictures": MultipartFile[]
"text": String
"location": String  (example: "23.456,40.123,12.22")
```

response body:

- if upload successfully

  ```json
  {
      "message": "ok",
      "pictures":["http://123.png","http://456.png"]
  }
  ```

- elif some picture upload fail

  ```json
  {
      "message": "No.2 pic fail"
  }
  ```

- elif text and pics are null

  ```json
  {
      "message": "pics and text cannot all be null"
  }
  ```

- elif location wrong format

  ```json
  {
      "message": "wrong location format"
  }
  ```

## 评论函/回复评论

`POST /hean/comment/add` （需要认证）

request body:

```json
{
    "uId":Long,
    "hId":String,
    "index":[],  //一级评论为空数组，多级评论写下标，如：回复第一级评论的第三条，就写[2];回复第一级评论中的第三条中的二级评论的第一条就写[2,0]
    "username":String,
    "content":String,
}
```

response if ok:

```json
{
    "message":"ok"
}
```

else:

```json
{
    "message":"error"
}
```

## 根据hID删除该函

`DELETE /hean/delete` （需要认证）

request body:


 ```
{
    "hId": String
}
 ```
response body:

+ if deleted successfully

  ```json
  {
      "message": "ok"
  }
  ```

+ otherwise

  ```json
  {
      "message": "not found"
  }
  ```

