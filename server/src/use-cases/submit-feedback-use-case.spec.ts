import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sendMaildSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMaildSpy}
)

describe('Submit feedback',() =>{
    it('should be able to submit a feedback', async () =>{
        
        await expect(submitFeedback.execute({
            type:"BUG",
            comment:"exemple comment",
            screenshot:"data:image/png;64asdhaskhjdkasd"
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMaildSpy).toHaveBeenCalled()
    })

    it('should not be able to submit feedback without type', async () =>{
     
        await expect(submitFeedback.execute({
            type:"",
            comment:"exemple comment",
            screenshot:"data:image/png;64asdhaskhjdkasd"
        })).rejects.toThrow()
    })

    it('should not be able to submit feedback without comment', async () =>{
     
        await expect(submitFeedback.execute({
            type:"BUG",
            comment:"",
            screenshot:"data:image/png;64asdhaskhjdkasd"
        })).rejects.toThrow()
    })

    it('should not be able to submit feedback with an invalid screenshot', async () =>{
     
        await expect(submitFeedback.execute({
            type:"BUG",
            comment:"ta tudo bugado",
            screenshot:"teste.jpg"
        })).rejects.toThrow()
    })
})