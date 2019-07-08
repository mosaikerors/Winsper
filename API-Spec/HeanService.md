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

`POST /hean/hean/byUId` （需要认证）

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

`GET /hean/hean/all` （需要认证）

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

## 根据hID删除该函

`DELETE /hean/hean/delete` （需要认证）

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

