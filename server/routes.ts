import * as express from 'express'
import userRouter from "./api/user";
import fileUploadRouter from "./api/fileupload";
import categoryRouter from "./api/category";
import meetRouter from "./api/meet";
import meetingRouter from "./api/meeting";

export default function setRoutes(app) {
  app.use('/api/user', userRouter)
  app.use('/api/upload', fileUploadRouter)
  app.use('/api/category', categoryRouter)
  app.use('/api/meet', meetRouter)
  app.use('/api/meeting', meetingRouter)

}
