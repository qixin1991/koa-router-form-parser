const formidable = require('formidable'),
    os = require('os');

module.exports = () => {
    return async (ctx, next) => {
        /**
         * @param {String} uploadDir - upload dir
         * @param {int} maxFieldsSize - Limits the amount of memory all fields together (except files) can allocate in bytes. If this value is exceeded, an 'error' event is emitted. The default size is 5MB.
         * @param {bool} onlyPathReturned - only return the first uploaded file path, default is true.
         */
        ctx.formParse = ({ uploadDir = os.tmpdir(), maxFieldsSize = 5 * 1024 * 1024, onlyPathReturned = true } = {}) => {
            return new Promise((resolve, reject) => {
                let form = new formidable.IncomingForm();
                form.uploadDir = uploadDir;
                form.keepExtensions = true;
                form.maxFieldsSize = maxFieldsSize;
                form.parse(ctx.req, (err, fields, files) => {
                    if (err) {
                        reject(err);
                    }
                    if (onlyPathReturned) {
                        let path = files[Object.keys(files)[0]].path;
                        resolve(path);
                    } else {
                        resolve({ files: files, fields: fields });
                    }
                });
            });
        }
        await next();
    }
}