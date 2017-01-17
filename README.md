# koa-router-form-parser

Koa-router@next formidable middleware.

U can get the uploaded file by this middleware.

> **NOTE:** Node Version 7 is neccessary.

### Install

```
npm install --save koa-router-form-parser
```

### Usage

**index.js**

```
"use strict";
const Koa = require('koa'),
      app = new Koa(),
      formParser = require('koa-router-form-parser'),
      userRouter = require('./routes/user.js');

app.use(formParser());

app.use(userRouter.routes());

var port = 3000;
app.listen(port, function () {
  console.log(` ---> Server running on port: ${port}`);
});
```

**routes/user.js**

```
"use strict";
var router = require('koa-router')();

router.post('/users/upload', async ctx => {
    var file = await ctx.formParse();
    console.log(file);
    ctx.body = {code: 200, data: file};
});
```

**upload.html**

```
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>uploadFile</title>
</head>

<body>
  <form class="" action="http://localhost:3000/users/upload" enctype="multipart/form-data" method="post">
    <input type="file" name="uploadFile" value=""><br>
    <button type="sumbit" name="button">upload</button>
  </form>
</body>

</html>
```

Install the dependencies and start server:

```
npm install
node --harmony-async-await index.js
```

Open the `upload.html` directly with your brower and try to upload a file.

Have Fun!