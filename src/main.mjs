import express from 'express'
import cors from 'cors'
import multipart from 'multiparty' // 处理form-data类型的数据
import bodyParser from 'body-parser'
import fs from 'fs'



const app = express()
app.use(cors()); // 解决跨域
app.use(bodyParser.json({limit: '20mb'})); // 处理json格式的数据请求
app.use(bodyParser.urlencoded({extended: false, limit: '20mb'}));
app.use('/romStatic',express.static('romStatic')) // 静态资源托管地址
// 启动
app.listen(9999, () => console.log('server running at http://localhost:9999/'))

// 新增封面
app.post('/api/image/upload', (req, res) => {
    const multipartyForm = new multipart.Form({ // 设置附件保存的地址
        uploadDir: './romStatic/img/',
    })
    multipartyForm.parse(req, function(err, fields, files) {
        if (err) {
            res.json({ ret: 1001, data: null, msg: '封面上传失败' })
        } else {
            const uploadedPath = files.file[0].path
            var dstPath = 'romStatic/img/' + files.file[0].originalFilename
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                    res.json({ ret: 1001, data: null, msg: '封面上传失败' })
                } else {
                    console.log('rename ok');
                    res.json({ ret: 0, data: null, msg: '封面上传成功' })
                }
            });
        }
    })
})

// 新增rom
app.post('/api/rom/upload', (req, res) => {
    const multipartyForm = new multipart.Form({ // 设置附件保存的地址
        uploadDir: './romStatic/rom/',
    })
    multipartyForm.parse(req, function(err, fields, files) {
        if (err) {
            res.json({ ret: 1001, data: null, msg: '游戏上传失败' })
        } else {
            const uploadedPath = files.file[0].path
            var dstPath = 'romStatic/rom/' + files.file[0].originalFilename
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                    res.json({ ret: 1001, data: null, msg: '游戏上传失败' })
                } else {
                    console.log('rename ok');
                    res.json({ ret: 0, data: null, msg: '游戏上传成功' })
                }
            });
        }
    })
})

// 新增游戏列表文件
app.post('/api/romlist/upload', (req, res) => {
    const multipartyForm = new multipart.Form({ // 设置附件保存的地址
        uploadDir: './romStatic/',
    })
    multipartyForm.parse(req, function(err, fields, files) {
        if (err) {
            res.json({ ret: 1001, data: null, msg: '游戏列表上传失败' })
        } else {
            const uploadedPath = files.file[0].path
            var dstPath = 'romStatic/' + files.file[0].originalFilename
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                    res.json({ ret: 1001, data: null, msg: '游戏列表上传失败' })
                } else {
                    console.log('rename ok');
                    res.json({ ret: 0, data: null, msg: '游戏列表上传成功' })
                }
            });
        }
    })
})
