import express from "express"
import { NodemailerMailAddapter } from "./adapters/nodemailer/nodemailer-mail-adapter";

export const routes = express.Router()
import { PrismaFeedbacksRepository } from "./repositories/prisma/prima-feedbacks-repository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";


routes.post("/feedbacks", async(req,res) => {
    const {type,comment,screenshot} = req.body


    const prismaFeedbackRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAddapter = new NodemailerMailAddapter()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbackRepository,
        nodemailerMailAddapter
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })
  
   
  
    return res.status(201).send()
  })