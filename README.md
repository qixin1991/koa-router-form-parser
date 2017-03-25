# koa-router-form-parser

Koa-router@next formidable middleware.

Both support single file and multi files upload.

> **NOTE:** Node Version `7.6.0+`

### Install

```
npm install --save koa-router-form-parser
```

### 1. Usage for single file upload

**index.js**

```
"use strict";
const Koa = require('koa'),
      app = new Koa(),
      formParser = require('koa-router-form-parser'),
      userRouter = require('./routes/user.js');

app.use(formParser());

app.use(userRouter.routes());

let port = 3000;
app.listen(port, function () {
  console.log(` ---> Server running on port: ${port}`);
});
```

**routes/user.js**

```
"use strict";
let router = require('koa-router')();

router.post('/users/upload', async ctx => {
    let path = await ctx.formParse();
    console.log(path);
    ctx.body = {code: 200, data: path};
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

### 2. Usage for multi files upload

**routes/user.js**

```
"use strict";
let router = require('koa-router')();

router.post('/users/upload', async ctx => {
    let form = await ctx.formParse({ onlyPathReturned: false });
    console.log(form);
    ctx.body = {code: 200, data: form};
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
    <input type="file" name="avater" value=""><br>
    <input type="text" name="user_name" > <br>
    <button type="sumbit" name="button">upload</button>
  </form>
</body>

</html>
```

Install the dependencies and start server:

```
$ npm install
$ npm start
```

Open the `upload.html` directly with your brower and try to upload a file.

Have Fun!