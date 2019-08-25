# Hean-Service API
包括函、评论、收藏、投稿

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

场景：进入地图页面需要在有函的位置上标点。

显示九宫格内的函

`GET /hean/point/all?longitude=0.1&latitude=0.1&follower=me&time=week` （需要认证）

其中，longitude 和 latitude 为经纬度，follower 和 time 为过滤选项

+ `follower=me` 显示我关注的人的函
+ `follower=mutual` 显示互相关注的人的函
+ `follower=all` 显示全部的函
+ `time=day` 显示一天以内的函
+ `time=week` 显示一周一内的函
+ `time=month` 显示一个月以内的函
+ `time=year` 显示一年以内的函
+ `time=all` 显示全部的函

response body:

```json
{
    "rescode": 0,
    "heans": [
        {
            "hId": String,
            "longitude": Double,
            "latitude": Double,
            "height": Double
        },
        ...
    ]
}
```

## 获取卡片形式的函

场景：点击地图上的点显示卡片形式的函

`GET /hean/card?hId=1` （需要认证）

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

#### 该hean已被删除

~~~json
{
    "rescode": 3
}
~~~

## 浏览卡片形式的函list

场景：根据uId查找用户所有历史函，根据uId查找用户收藏

request header 不同，request body 相同

### 根据uId查找用户所有历史函

`GET /hean/cardlist?owner=1` （需要认证）

其中，owner 是被看的函的主人的 uId

### 根据uId查找用户收藏

`GET /hean/collection?owner=1` （需要认证）

owner 的语义同上

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
            "hasLiked": Boolean,
            "hasStared": Boolean
    	},
        ...  
    ]
}
```

### exception

#### 主人不给你看

~~~json
{
    "rescode": 3
}
~~~

## 获取函的具体内容

场景：点击卡片形式的函后呈现的内容

`GET /hean/detailed?hId=1` （需要认证）

response body

```json
{
    "rescode": 0,
    "hean": {
        "hId": String,
        "uId": Long,  // 函的作者
        "avatar": url,
        "username": String,
        "createdTime": Long,
        "pictures": [
            url1, url2, url3, url4   //可以有0~4张
        ],
        "comments": [
            {
                "commentId": String,
            	"commenter": String,  //评论者username
                "commenterAvatar": Url,  //评论者头像
                "commented": String,  //被评论者username，如果直接评论函，这个字段是空
                "time": Long,   //评论时间
                "content": String  //评论内容
            },
            ...   //可以有多条评论
        ]
    }
}
```

### exception

#### 函不存在

~~~json
{
    "rescode": 3
}
~~~

## 新建函

`POST /hean/upload` （需要认证）

request :  (**form-data**)

pictures 和 text 至少有一个，location 必须

```json
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

## 删除函

`DELETE /hean/delete?hId=1` （需要认证）

response body:

```json
{
    "rescode": 0
}
```

### exception

#### 函不是你的

~~~json
{
    "rescode": 3
}
~~~

## 点赞 / 取消点赞函

只有 url 不同

### 点赞

`POST /hean/like` （需要认证）

### 取消点赞

`POST /hean/dislike` （需要认证）

### request body

```json
{
    "hId": String
}
```

### response body

```json
{
    "rescode": 0
}
```

## 评论函 / 回复评论

`POST /hean/comment/add` （需要认证）

request body:

```json
{
    "hId": String,
    "targetCommentId": String,   //为空(指的是不含此字段)：评论的是函，否则评论的是评论
    "content": String  //评论内容
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

## 获取某用户的所有评论

`GET /hean/comment?owner=1` （需要认证）

其中，owner 是评论的拥有者

response body:

```json
{
    "rescode": 0,
    "comments": [
        {
            "isComment": Bool,  // 为true表示是评论，为false表示是回复
            // 如果是评论，此字段为函的主人的username，
            // 如果是回复，此字段为被回复者的username
            "username": String,  
            "content": String,  // 评论/回复的内容
            "time": Long,
            "hId": String   // 评论/回复发生的函
        },
        ...  // 会有很多评论
    ]
}
```

## 收藏 / 取消收藏函

只有 url 不同

### 收藏

`POST /hean/collect` （需要认证）

### 取消收藏

`POST /hean/uncollect` （需要认证）

### request body

```json
{
    "hId": String
}
```

### response body

```json
{
    "rescode": 0
}
```

## 获取投稿 list

有两个场景，一个是获取所有被选中的投稿，还有一个是获取某个用户的所有投稿，只有 url 不同，返回的都是 heanCard 类型的数组。

### 获取所有被选中的投稿

`GET /hean/submission/selected?date=123456` （需要认证）

### 获取某用户的所有投稿

`GET /hean/submisstion/list?owner=2` （需要认证）

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
            "hasLiked": Boolean,
            "hasStared": Boolean
    	},
        ...  
    ]
}
```

## 投稿

`POST /hean/submission` （需要认证）

request body:

```json
{
	"hId": String,
    "reason": String  // 投稿理由
}
```

response body:

```json
{
    "rescode": 0  // 等待审核
}
```

