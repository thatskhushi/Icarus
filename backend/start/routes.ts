// import UsersController from '#controllers/users_controller'
// import TokensController from '#controllers/tokens_controller'

// import router from '@adonisjs/core/services/router'

// import User from '#models/user'
// import Hash from '@adonisjs/core/services/Hash'

// import Questions from '#models/question'
// import { OAuth2Client } from 'google-auth-library'
// import Answer from '#models/answer'
// import { messages } from '@vinejs/vine/defaults'

// const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID')
// router.get('/', async () => {
//   return {
//     hello: 'world',
//   }
// })

// // router.post('/user-registration')
// router.post('/user-registration', [UsersController, 'register'])
// router.post('/user-login', [UsersController, 'login'])
// router.post('/google-login', [UsersController, 'googleLogin'])
// // router.post('/get-token', [TokensController, 'token'])
// router.post('/get-token', async ({ request, response }) => {
//   const { token } = request.only(['token'])
//   // const token2 = AuthAccessToken.all();

//   return response.created({ message: 'success', token })
// })

// router.post('/set-question', async ({ request, response }) => {
//   try {
//     const data = request.only(['question', 'flow', 'dependencies', 'Answer_Mode', 'SR_NO','options','option_dependencies'])

//     const question = await Questions.create({
//       question: data.question,
//       flow: data.flow,
//       depended_question: data.dependencies,
//       answer_mode: data.Answer_Mode,
//       sr_no: data.SR_NO,
//       option:data.options,
//       option_dependent:data.option_dependencies

//     })
//     return response.json({ messages: 'success' ,data})
//   } catch (e) {
//     return response.json({ messages: 'failed',e })
//   }
// })

// router.post('/edit-question', async ({ request, response }) => {
//   try {
//     const data = request.only(['ID', 'question', 'flow', 'dependencies', 'Answer_Mode','SR_NO','Option','optionDependencies'])

//     if (!data.ID) {
//       return response.status(400).json({ message: 'ID is required' })
//     }

//     let que = await Questions.find(data.ID)

//     if (que) {
//       // Update the existing question's properties
//       que.question = data.question
//       que.flow = data.flow
//       que.depended_question = data.dependencies
//       que.answer_mode = data.Answer_Mode
//       que.sr_no = data.SR_NO
//       que.option = data.Option
//       que.option_dependent = data.optionDependencies
//       // Save the updated question to the database
//       await que.save()

//       return response.json(que)
//     } else {
//       return response.status(404).json({ message: 'Question not found' })
//     }
//   } catch (e) {
//     console.log('Error in /edit-question route:', e)
//     return response.status(500).json({ message: 'Internal Server Error', error: e.message })
//   }
// })

// router.get('/get-questions', async ({ request, response }) => {
//   const question = await Questions.all()
//   return response.json(question)
// })

// router.get('/get-Answer', async ({ request, response }) => {
//   const queryParams = request.qs() // Get the query parameters
//   const { id } = queryParams as { id: string } // Use 'id' instead of 'u_id'

//   try {
//     const answer = await Answer.query().where('id', id) // fetch the answer by id
//     if (answer) {
//       return response.json(answer)
//     } else {
//       return response.status(404).json({ message: 'Answer not found' })
//     }
//   } catch (error) {
//     console.error(error)
//     return response.status(500).json({ message: 'Internal Server Error' })
//   }
// })

// router.post('/fill-answer', async ({ request, response }) => {
//   const data = request.only(['question', 'Answer', 'id'])
//   let answer = await Answer.find(data.id)

//   if (answer) {
//     let currentQA = answer.qa as any[]
//     const questionIndex = currentQA.findIndex((qa) => qa.question === data.question)

//     if (questionIndex !== -1) {
//       currentQA[questionIndex].answer = data.Answer
//     } else {
//       currentQA.push({
//         question: data.question,
//         answer: data.Answer,
//       })
//     }
//     answer.qa = currentQA
//   } else {
//     answer = new Answer()
//     answer.id = data.id
//     answer.qa = [
//       {
//         question: data.question,
//         answer: data.Answer,
//       },
//     ]
//   }

//   await answer.save()

//   return response.json(answer)
// })






import UsersController from '#controllers/users_controller'
import TokensController from '#controllers/tokens_controller'

import router from '@adonisjs/core/services/router'

import User from '#models/user'
import Hash from '@adonisjs/core/services/Hash'

import Questions from '#models/question'
import { OAuth2Client } from 'google-auth-library'
import Answer from '#models/answer'
import { messages } from '@vinejs/vine/defaults'

const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID')
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// router.post('/user-registration')
router.post('/user-registration', [UsersController, 'register'])
router.post('/user-login', [UsersController, 'login'])
router.post('/google-login', [UsersController, 'googleLogin'])
// router.post('/get-token', [TokensController, 'token'])
router.post('/get-token', async ({ request, response }) => {
  const { token } = request.only(['token'])
  // const token2 = AuthAccessToken.all();

  return response.created({ message: 'success', token })
})

router.post('/set-question', async ({ request, response }) => {
  try {
    const data = request.only(['question', 'flow', 'dependencies', 'Answer_Mode', 'SR_NO','options','option_dependencies'])

    const question = await Questions.create({
      question: data.question,
      flow: data.flow,
      depended_question: data.dependencies,
      answer_mode: data.Answer_Mode,
      sr_no: data.SR_NO,
      option:data.options,
      option_dependent:data.option_dependencies

    })
    return response.json({ messages: 'success' ,data})
  } catch (e) {
    return response.json({ messages: 'failed',e })
  }
})

router.post('/edit-question', async ({ request, response }) => {
  try {
    const data = request.only(['ID', 'question', 'flow', 'dependencies', 'Answer_Mode','SR_NO','Option','optionDependencies'])

    if (!data.ID) {
      return response.status(400).json({ message: 'ID is required' })
    }

    let que = await Questions.find(data.ID)

    if (que) {
      // Update the existing question's properties
      que.question = data.question
      que.flow = data.flow
      que.depended_question = data.dependencies
      que.answer_mode = data.Answer_Mode
      que.sr_no = data.SR_NO
      que.option = data.Option
      que.option_dependent = data.optionDependencies
      // Save the updated question to the database
      await que.save()

      return response.json(que)
    } else {
      return response.status(404).json({ message: 'Question not found' })
    }
  } catch (e) {
    console.log('Error in /edit-question route:', e)
    return response.status(500).json({ message: 'Internal Server Error', error: e.message })
  }
})

router.get('/get-questions', async ({ request, response }) => {
  const question = await Questions.all()
  return response.json(question)
})

router.get('/get-Answer', async ({ request, response }) => {
  const queryParams = request.qs() // Get the query parameters
  const { id } = queryParams as { id: string } // Use 'id' instead of 'u_id'

  try {
    const answer = await Answer.query().where('id', id) // fetch the answer by id
    if (answer) {
      return response.json(answer)
    } else {
      return response.status(404).json({ message: 'Answer not found' })
    }
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Internal Server Error' })
  }
})

router.post('/fill-answer', async ({ request, response }) => {
  const data = request.only(['question', 'Answer', 'id','qId'])
  let answer = await Answer.find(data.id)

  if (answer) {
    let currentQA = answer.qa as any[]
    const questionIndex = currentQA.findIndex((qa) => qa.qId === data.qId)

    if (questionIndex !== -1) {
      currentQA[questionIndex].answer = data.Answer
      currentQA[questionIndex].question = data.question
    } else {
      currentQA.push({
        qId:data.qId,
        question: data.question,
        answer: data.Answer,
      })
    }
    answer.qa = currentQA
  } else {
    answer = new Answer()
    answer.id = data.id
    answer.qa = [
      {
        qId:data.qId,
        question: data.question,
        answer: data.Answer,
      },
    ]
  }

  await answer.save()

  return response.json(answer)
})



router.post('/delete-question', async ({ request, response }) => {
  const data = request.only(['id', 'qIds'])
  let answer = await Answer.find(data.id);
  
  if (answer) {
    let currentQA = answer.qa as any[]
    
    // Filter out the questions with qIds to delete
    let updatedQA = currentQA.filter(item => !data.qIds.includes(item.qId));
    
    // Update the qa field with the filtered array
    answer.qa = updatedQA;
    
    // Save the updated answer back to the database
    await answer.save();
    return response.json(updatedQA);
    
  } else {
    return response.status(404).json({ message: 'Answer not found' });
  }
});
