# Record-Service API

包括手账、消息、日记、心情报表

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

## 删除手账

`DELETE /record/journal?journalId=1` （需要认证）

response body:

```json
{
    "rescode": 0
}
```

## 发送消息

消息分为五种，如下：

| type | meaning               | receiverUId | senderUsername | hId          | text       |
| ---- | --------------------- | ----------- | -------------- | ------------ | ---------- |
| 1    | 你关注了别人          | 你关注的人  | 你             | -            | -          |
| 2    | 你点赞了别人的函      | 你点赞的人  | 你             | 你点赞的函   | -          |
| 3    | 你收藏了别人的函      | 你收藏的人  | 你             | 你收藏的函   | -          |
| 4    | 你评论了别人的函/评论 | 你评论的人  | 你             | 评论发生的函 | 评论的内容 |
| 5    | 你的投稿被选中        | 被选中的人  | -              | 投稿的函     | -          |

模拟这样一个场景：有 A 和 B 两个用户，A 是消息的发送者，uId 为 1，B 是消息的接受者，uId 为 2。

当 A 关注了 B / A 点赞了 B 的函 / A 收藏了 B 的函 / A 评论了 B  / A 选中了 B 的投稿（当 A 为管理员时）时，A 会向后端发送消息，后端再转发给 B。

websocket url 在登录时指定，即登录成功后与后端建立连接，不同类型的消息发送的字段不同，具体如下：

### A 关注了 B

A 发送的数据（string 类型的 json）：

```json
{
    "type": 1,
    "receiverUId": 2,
    "senderUsername": "A"
}
```

B 接受的数据（string 类型的 json）：

```json
{
    "type": 1,
    "senderUId": 1,
    "senderUsername": "A"
}
```

### 其他类型

对于其他四种类型的消息，传输的数据 type 不同，需要的字段依据表格。

## 获取消息 list

`GET /record/message/list` （需要认证）

这个 api 用来获取**每种类型**的最近**一条** message 。

response body:

```json
{
    "rescode": 0,
    "messages": [
        {
            "type": 1,
            "senderUId": Integer,
            "senderUsername": String,
            "hasRead": Bool,   // 是否已读
            "time": time
        },
        {
            "type": 4,
            "senderUId": Integer,
            "senderUsername": String,
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
            "senderUId": Integer,
            "senderUsername": String,
            "hasRead": Bool,   // 是否已读
            "time": time
        },
        {
            "messageId": String,
            "senderUId": Integer,
            "senderUsername": String,
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

## 已读所有消息

`PUT /record/message/hasRead/all` （需要认证）

response body:

```json
{
    "rescode": 0
}
```

## 删除某一类型的全部消息

`DELETE /record/message?type=1` （需要认证）

response body:

```json
{
    "rescode": 0
}
```

## 获取日记 list

`GET /record/diary/list?owner=2` （需要认证）

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

## 删除日记

`DELETE /record/diary?diaryId=1` （需要认证）

response body:

```json
{
    "rescode": 0
}
```

## 获取心情报表 list

`GET /record/moodReport/list?owner=2` （需要认证）

一周一报

response body:

```json
{
	"rescode": 0,
    "positiveNum": 2,   // 积极的数量
    "neutralNum": 3,    // 中性的数量
    "negativeNum": 1,   // 消极的数量
    "moodReports": [    // 心情报表 list
        {
            "moodReportId": String,   // 全局唯一
            "mood": int,   // 该字段可取 0, 1, 2, 分别表示积极，中性，消极
            "year": int,
            "week": int
        },
        ...  // 有很多心情报表
    ]
}
```

## 获取具体的心情报表

`GET /report/moodReport/detailed?moodReportId=3` （需要认证）

心情报表：年 + 周 + 写的函数量 + 收藏的函数量 + 一周关键词 + 心情 + 生成的图 + 生成的诗

response body:

```json
{
    "rescode": 0,
    "moodReport": {
        "year": int,
        "week": int,
        "heanNum": int,
        "starNum": int,
        "keyword": String,
        "mood": int,  // 该字段可取 0, 1, 2, 分别表示积极，中性，消极
        "image": url,
        "poem": String
    }
}
```

