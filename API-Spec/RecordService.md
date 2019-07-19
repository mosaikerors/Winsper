# Record-Service API

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

## 获取某个用户所有手账本信息

`GET /record/journal/books` （需要认证）

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

`GET /record/journal?id=12` （需要认证）

其中，id 是某个手账本的 id

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



