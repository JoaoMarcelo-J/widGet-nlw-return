import { MailAdapater } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest{
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase{
    constructor(
        private feedbackRepository: FeedbacksRepository,
        private mailAdapter: MailAdapater
    ){}

    async execute(request: SubmitFeedbackUseCaseRequest){
        const { type, comment, screenshot} = request;

        if(!type){
            throw new Error("Type is requeried.")
        }

        if(!comment){
            throw new Error("Comment is requeried.")
        }

        if(screenshot && screenshot.startsWith('data:image/png;baase64')){
            throw new Error("Invalid screenshot format")
        }
    
        await this.feedbackRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: "#111";">`,
                `<p>Tipo do Feedback: ${type}</p>`,
                `<p>Comentario: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" />` : ``,
                "</div>",
              ].join("\n"),
        })
    }
}