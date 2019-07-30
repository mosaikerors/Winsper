# Record-Service API

包括手账、消息、日记、投稿、心情报表

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

## 获取某个用户所有手账本信息

`GET /record/journal/books?owner=2` （需要认证）

response body:

```json
{
    "rescode": 0,
    "journalBooks": [
        {
            "journalBookId": Integer,  // 手账本id
            "name": String,   // 手账本的名字
            "coverId": Integer   // 手账本的封面id，所有封面存在前端
        },
        ...  // 可以有多个手账本
    ]
}
```

### exception

#### 该用户没有手账本

```json
{
    "rescode": 3
}
```

## 获取某个手账本中的所有手账

`GET /record/journal?journalBookId=12` （需要认证）

其中，journalBookId是某个手账本的 id，此 id **全局唯一**，即不同的人也不能有相同 id 的手账本

response body:

```json
{
    "rescode": 0,
    "journals": [
        {
            "journalId": Integer,   // 手账 id
            "journalUrl": Url   // 图片形式的手账的url
        },
        ...  //可以有多个手账
    ]
}
```

### exception

#### 该手账本中没有手账

```json
{
    "rescode": 3
}
```

## 新建手账

`POST /record/journal` （需要认证）

request body:

```json
{
    "journalBookId": Integer,
    "journalUrl": url   // 手账图片的url
}
```

response body:

```json
{
    "rescode": 0
}
```

## 获取消息list

`GET /record/message` （需要认证）

message 有几种 type，不同的 type 代表不同类型的消息，内容的字段也有可能不同（例如有的需要 uId，而有点需要 hId）:

| type | meaning            | uId        | username   | hId          | text       |
| ---- | ------------------ | ---------- | ---------- | ------------ | ---------- |
| 1    | 有人关注了你       | 关注你的人 | 关注你的人 | -            | -          |
| 2    | 有人点赞了你的函   | 点赞的人   | 点赞的人   | 你的函       | -          |
| 3    | 有人收藏了你的函   | 收藏的人   | 收藏的人   | 你的函       | -          |
| 4    | 有人评论了你的函   | 评论的人   | 评论的人   | 你的函       | 评论的内容 |
| 5    | 有人回复了你的评论 | 评论的人   | 评论的人   | 评论发生的函 | 评论的内容 |
| 6    | 你的投稿被选中     | -          | -          | 投稿的函     | -          |

这个 api 用来获取**每种类型**的最近**一条** message 。

response body:

```json
{
    "rescode": 0,
    "messages": [
        {
            "type": 1,
            "uId": Integer,
            "username": String,
            "hasRead": Bool,   // 是否已读
            "time": time
        },
        {
            "type": 4,
            "uId": Integer,
            "username": String,
            "hId": String,
            "text": String,
            "hasRead": Bool,  // 是否已读
            "time": time
        }
    ]
}
```

## 获取某个类型的具体消息

`GET /recode/message/detailed?type=1` （需要认证）

这个 api 用来获取**某个类型**的未被删除的全部 message 。

response body:

```json
{
    "rescode": 0,
    "messages": [
        {
            "messageId": String,
            "uId": Integer,
            "username": String,
            "hasRead": Bool,   // 是否已读
            "time": time
        },
        {
            "messageId": String,
            "uId": Integer,
            "username": String,
            "hasRead": Bool,  // 是否已读
            "time": time
        },
        ...   // 可能该类型有多条消息
    ]
}
```

## 已读某一条消息

`PUT /record/message/hasRead/single` （需要认证）

request body:

```json
{
    "messageId": String
}
```

response body:

```json
{
    "rescode": 0
}
```

### exception

#### 该消息的拥有者不是该用户

```json
{
    "rescode": 3
}
```

## 已读所有消息

`PUT /record/message/hasRead/all` （需要认证）

response body:

```json
{
    "rescode": 0
}
```

## 删除某一类型的全部消息

`DELETE /record/message/type` （需要认证）

request body:

```json
{
    "type": Integer
}
```

response body:

```json
{
    "rescode": 0
}
```

## 获取日记list

`GET /record/diary?owner=2` （需要认证）

response body:

```json
{
    "rescode": 0,
    "diaries": [
        {
            "diaryId": String,
            "title": String,  // 日记标题
            "time": Long
        },
        {
            "diaryId": String,
            "title": String,
            "time": Long
        },
        ...  // 有很多篇日记
    ]
}
```

## 获取某篇具体的日记

`GET /record/diary/detailed?diaryId=2` （需要认证）

diaryId **全局唯一**，即不同的人也不能有相同 id 的日记

response body: 

```json
{
    "rescode": 0,
    "title": String,
    "username": String,  // 日记作者username
    "time": Long,
    "text": String   // 日记正文
}
```

## 写日记

`POST /record/diary` （需要认证）

request body:

```json
{
    "title": String,
    "text": String
}
```

response body:

```json
{
    "rescode": 0
}
```

