# Hean-Service API
#### port:7120
##### <bold> 注意，中文可能返回的是乱码!!!
<ul> path:/hean/hean/byUId
<li> description:根据uID查找用户所有历史函
<li> method: POST
<li> RequestHeader: token
<li> RequestBody: JSONObject example:

 ```
{
  "uId": Long
}
```
<li> Response：JSONObject example：<br/>

```
{//if uId exists and at least one hean exists
  "heanArray":{
    {
       "hId": String,
       "uId": Long,
       "createdTime": Long,
       "text": String,
       "longtitude": Double,
       "latitude": Double,
       "height": Double,
       "pics":  List<String> //Urls of pics
    }
    ...
  };
  "message":"ok"
}

{//if no hean is found
  "message": "not found"
}
```
</ul>
</br>

<ul> path:/hean/hean/all
<li> description:查找所有函
<li> method: GET
<li> RequestHeader: token
<li> Response：JSONObject example：<br/>

```
{//if uId exists and at least one hean exists
  "heanArray":{
    {
       "hId": String,
       "uId": Long,
       "createdTime": Long,
       "text": String,
       "longtitude": Double,
       "latitude": Double,
       "height": Double,
       "pics":  List<String> //Urls of pics
    }
    ...
  };
  "message":"ok"
}
```
</ul>
</br>

<ul> path:/hean/hean/delete
<li> description:根据hID删除该函
<li> method: DELETE
<li> RequestHeader: token
<li> RequestBody: JSONObject example:

 ```
{
  "hId": String
}
```
<li> Response：JSONObject example：<br/>

```
{//if deleted
  "message":"ok"
}

{//else
  "message": "not found"
}
```
