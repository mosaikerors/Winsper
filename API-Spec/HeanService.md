# Hean-Service API
#### port:7120
**注意，中文可能返回的是乱码!!!**

## 认证

在 request header 里加上 `uId`, `token` 两个字段：

```json
uId: Long
Authorization: Bearer jwt.token.here
```

## 获取所有函的位置

场景：进入地图页面需要在有函的位置上标点

`GET /hean/point/all` （需要认证）

response body:

```json
{
    "message": "ok",
    "heans": [
        {
            "hId": String,
            "longtitude": Double,
            "latitude": Double,
            "height": Double
        },
        ...
    ]
}
```

## 获取卡片形式的函

场景：点击地图上的点或者浏览某个人的函时呈现出的简略形式

`GET /hean/card?hId=1&uId=1` （需要认证）

response body:

```json
{
    "message": "ok",
    "heanCard": {
        "hId": String,
        "cover": url,
        "text": String,
        "hasLiked": bool,   //是否点过赞
        "hasStarred": bool,   //是否已收藏
        "likeCount": Integer,   //点赞数
        "starCount": Integer,   //收藏数
        "commentCount": Integer,  //评论数
    }
}
```

## 获取函的具体内容

场景：点击卡片形式的函后呈现的内容

`GET /hean/detailed?hId=1&uId=1` （需要认证）

response body:

```json
{
    "message": "ok",
    "hean": {
        "hId": String,
        "uId": Long,
        "avatar": url,
        "username": String,
        "createdTime": Long,
        "pics": [
            url1, url2, url3, url4   //可以有0~4张
        ],
        "hasLiked": bool,   //是否点过赞
        "hasStarred": bool,   //是否已收藏
        "comments": [
            {
                "commentId": String,
            	"commenter": String,  //评论者username
                "commented": String,  //被评论者username，如果直接评论函，这个字段是空
                "time": Long,   //评论时间
                "content" String  //评论内容
            },
            ...   //可以有多条评论
        ]
    }
}
```

## 浏览卡片形式的函list

场景：根据uId查找用户所有历史函，根据uId查找用户收藏

request header 不同，request body 相同

### 根据uId查找用户所有历史函

`GET /hean/card?owner=1&viewer=2` （需要认证）

owner 是被看的函的主人的 uId，viewer 是正在看函的人的 uId

### 根据uId查找用户收藏

`GET /hean/collection?owner=1&viewer=2` （需要认证）

### response body

+ if uId exists and at least one hean exists

  ```json
  {
      "message": "ok",
      "heanCards": [
      	{
          	"hId": String,
          	"cover": url,
          	"text": String,
          	"likeCount": Integer,   //点赞数
          	"starCount": Integer,   //收藏数
          	"commentCount": Integer,  //评论数
      	},
          ...  
      ]
  }
  ```

+ if no hean is found

  ```json
  {
      "message": "not found"
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
    "uId": Long,
    "hId": String,
    "targetCommentId": String,   //为空：评论的是函，否则评论的是评论
    "content" String  //评论内容
}
```

response if ok:

```json
{
    "message": "ok",
    "comment": {
    	"commentId": String,
        "commenter": String,  //评论者username
        "commented": String,  //被评论者username，如果直接评论函，这个字段是空
        "time": Long,   //评论时间
        "content" String  //评论内容
     },
}
```

else:

```json
{
    "message":"error"
}
```

## 根据hID删除该函

`DELETE /hean/delete?hId=1` （需要认证）

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

