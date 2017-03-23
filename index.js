const formidable = require('formidable');

module.exports = () => {
    return async (ctx, next) => {
        ctx.formParse = (uploadDir) => {
            return new Promise((resovle, reject) => {
                let form = new formidable.IncomingForm();
                form.uploadDir = uploadDir || '/tmp/';
                form.keepExtensions = true;
                form.parse(ctx.req, (err, fields, files) => {
                    if (err) {
                        reject(err);
                    }
                    let path = files.uploadFile.path;
                    resovle(path);
                });
            });
        }
        await next();
    }
}