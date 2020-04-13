import * as express from 'express'
import userRouter from "./api/user";
import clientRouter from "./api/client";
import newsRouter from "./api/news";
import managerRouter from "./api/manager";
import productRouter from "./api/product";
import programmingLangRouter from "./api/programmingLang";
import servicesRouter from "./api/services";
import teamRouter from "./api/team";
import jobRouter from "./api/job";
import fileUploadRouter from "./api/fileupload";

export default function setRoutes(app) {
  app.use('/api/user', userRouter)
  app.use('/api/upload', fileUploadRouter)
  app.use('/api/client', clientRouter)
  app.use('/api/news', newsRouter)
  app.use('/api/manager', managerRouter)
  app.use('/api/product', productRouter)
  app.use('/api/programmingLang', programmingLangRouter)
  app.use('/api/services', servicesRouter)
  app.use('/api/team', teamRouter)
  app.use('/api/job', jobRouter)

}
