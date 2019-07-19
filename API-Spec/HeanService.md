# Hean-Service API
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

## 获取函的位置

场景：进入地图页面需要在有函的位置上标点，有四个过滤选项

+ 只显示我关注的人的函：`follower=${uId}`
+ 只显示互相关注的人的函：`mutualFollow=${uId}`
+ 只显示周围*50m/100m/200m/500m*内的函：`nearby=50|100|200|500`
+ 只显示最近*1天/1周/1月/1年*内的函：`recent=day|week|month|year`

如果 url 后没有附带某个过滤选项，说明对该选项不做过滤，即全部显示。

`GET /hean/point` （需要认证）

response body:

```json
{
    "rescode": 0,
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

其中，uId 是正在浏览别人函的用户的 id

response body:

```json
{
    "rescode": 0,
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

### exception

#### 该函对于该用户不可见

```json
{
    "rescode": 3
}
```

## 获取函的具体内容

场景：点击卡片形式的函后呈现的内容

`GET /hean/detailed?hId=1&uId=1` （需要认证）

response body:

```json
{
    "rescode": 0,
    "hean": {
        "hId": String,
        "uId": Long,
        "avatar": url,
        "username": String,
        "createdTime": Long,
        "pics": [
            url1, url2, url3, url4   // 可以有0~4张
        ],
        "comments": [
            {
                "commentId": String,
                "commenter": {    // 评论者id，name，avatar
                	"uId": 1,
                	"username": "username1",
                	"avatar": url
            	},
                "commented": {    // 被评论者id，name，如果直接评论的是函，则commented字段为null
                	"uId": 2,
                	"username": "username2",
            	},
                "time": Long,   // 评论时间
                "content": String  // 评论内容
            },
            ...   // 可以有多条评论
        ]
    }
}
```

### exception

#### 该函对于该用户不可见

```json
{
    "rescode": 3
}
```

## 浏览卡片形式的函list

场景：根据uId查找用户所有历史函，根据uId查找用户收藏

request header 不同，request body 相同

### 根据uId查找用户所有历史函

`GET /hean/card?owner=1&viewer=2` （需要认证）

其中，owner 是被看的函的主人的 uId，viewer 是正在看函的人的 uId

### 根据uId查找用户收藏

`GET /hean/collection?owner=1&viewer=2` （需要认证）

owner 和 viewer 的语义同上

### response body

```json
{
    "rescode": 0,
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

### exception

#### 该函或收藏对于该用户不可见

```json
{
    "rescode": 3
}
```

#### 该用户没有函或收藏

```json
{
    "rescode": 4
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

```json
{
    "rescode": 0
}
```

### exception

#### 图片上传失败

```json
{
    "rescode": 3,
    "badPicture": 2  // 第二张图片有问题
}
```

#### 文字和图片都为空

```json
{
    "rescode": 4
}
```

#### 定位失败（地点格式错误）

```json
{
    "rescode": 5
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

response body:

```json
{
    "rescode": 0
}
```

### exception

#### 评论内容为空

```json
{
    "rescode": 3
}
```

## 根据hID删除该函

`DELETE /hean/delete?hId=1&uId=1` （需要认证）

response body:

```json
{
    "rescode": 0
}
```

### exception

#### 该用户不是该函的拥有者

```json
{
    "rescode": 3
}
```

