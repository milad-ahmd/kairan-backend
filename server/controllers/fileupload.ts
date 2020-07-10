// var fs = require("fs");
// var path = require("path");
import * as fs from 'fs'
import * as path from 'path'
import Image from "../models/image";
import BaseCtrl from "./base";
var Throttle = require("stream-throttle").Throttle;

export default class UploadCtrl extends BaseCtrl{
  model=Image
  upload = (req, res) => {
    const fileName = `kairan_${Date.now()}.jpg`;
    try {
        // process.env.IMAGE_UPLOAD_DIR

      const out = path.join(__dirname,'../images', fileName)

      // throttle write speed to 4MB/s
      console.log(req.files)
      return new Promise((resolve, reject) => {
        req.pipe(new Throttle({ rate: 1024 * 4096 }))
          .pipe(fs.createWriteStream(out, { flags: 'w', encoding: null, fd: null, mode: 0o666 }))
          .on('finish', () => { 
            fs.writeFile(out, req.files.image.data, function (err) {
              if (err) {
                console.log(err)
              }
            });
          })
          .on('close', () => { 
            resolve(out) 
          })
      }).then(path => {
        const obj = new this.model({title:fileName,url:'https://filemanager.rataapp.ir/'+fileName});
        obj.save((err, item) => {
          if (err && err.code === 11000) {
            res.sendStatus(400);
          }
          if (err) {
            return res.send(err);
          }
          return res.json({ isSuccessful: true, data: { path: 'https://filemanager.rataapp.ir/'+fileName } })
        });
      });
    } catch (err) {
      return res.json({ isSuccessful: false, err: err })
    }
  }
  uploadPdf = (req, res) => {

    const fileName = `sanay_${Date.now()}.pdf`;
    try {
        // process.env.IMAGE_UPLOAD_DIR

      const out = path.join(__dirname,'../images', fileName)

      // throttle write speed to 4MB/s
      return new Promise((resolve, reject) => {
        req.pipe(new Throttle({ rate: 1024 * 4096 }))
          .pipe(fs.createWriteStream(out, { flags: 'w', encoding: null, fd: null, mode: 0o666 }))
          .on('finish', () => {
            console.log(req.files);
            fs.writeFile(out, req.files.image.data, function (err) {
              if (err) {
                console.log(err)
              }
            });
          })
          .on('close', () => {
            resolve(out)
          })
      }).then(path => {
          return res.json({ isSuccessful: true, result: { path: 'https://filemanager.rataapp.ir/'+fileName } })
      });
    } catch (err) {
      return res.json({ isSuccessful: false, err: err })
    }
  }

}
