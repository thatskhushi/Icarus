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
import QuestionUpdate from '#models/question_update'
import { OAuth2Client } from 'google-auth-library'
import Answer from '#models/answer'
import { messages } from '@vinejs/vine/defaults'

// import { Application } from '@adonisjs/core/app'
import app from '@adonisjs/core/services/app'
import Picture from '#models/picture'
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
router.post('/set-question2', async ({ request, response }) => {
  try {
    const data = request.only(['question','Answer_Mode', 'options','nextKeywordQ','multipleAnswer','nextOptionQ','Keywords','display'])
    

    const question2 = await QuestionUpdate.create({
      question: data.question,
      answer_mode: data.Answer_Mode,
      nextpotion_que: data.nextOptionQ,
      nextkeyword_que:data.nextKeywordQ,
      options:data.options,
      keywords:data.Keywords,
      isdisplay: data.display,
      ismultipleanswer: data.multipleAnswer
      
    })
    return response.json({ messages: 'success' ,question2})
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

      return response.json({message:"success",que})
    } else {
      return response.status(404).json({ message: 'Question not found' })
    }
  } catch (e) {
    console.log('Error in /edit-question route:', e)
    return response.status(500).json({ message: 'Internal Server Error', error: e.message })
  }
})

router.post('/edit-question2', async ({ request, response }) => {
  try {
    const data = request.only(['ID','question','Answer_Mode', 'Option','nextKeywordQ','multipleAnswer','nextOptionQ','Keywords','display'])

    if (!data.ID) {
      return response.status(400).json({ message: 'ID is required' })
    }

    let que = await QuestionUpdate.find(data.ID)

    if (que) {
      // Update the existing question's properties
      que.question= data.question,
      que.answer_mode= data.Answer_Mode,
      que.nextpotion_que= data.nextOptionQ,
      que.nextkeyword_que=data.nextKeywordQ,
      que.options=data.Option,
      que.keywords=data.Keywords,
      que.isdisplay= data.display,
      que.ismultipleanswer= data.multipleAnswer
      // Save the updated question to the database
      await que.save()

      return response.json({message:"success",que})
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

router.get('/get-questions2', async ({ request, response }) => {
  const question = await QuestionUpdate.all()
  return response.json(question)
})

router.get('/get-Answer', async ({ request, response }) => {
  const queryParams = request.qs() 
  const { id } = queryParams as { id: string } 

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
    const questionIndex = currentQA.findIndex((qa) => qa.qId === data.qId &&qa.question===data.question )

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


// router.post('/upload-pic',async({request, response})=>{
//   const file = request.file('file')

//   if (!file) {
//     return response.status(400).send('File is required')
//   }

//   // Validate file size and type if needed
//   await file.move(app.makePath('uploads/one'), {
//     name: `${new Date().getTime()}.${file.extname}`,
//     overwrite: true,
//   })

//   const picture = new Picture()
//   picture.path = file.fileName
//   await picture.save()

//   return response.json({ path: picture.path })
// })



// router.post('/upload-pic', async ({ request, response }) => {
//   const files = request.files('files')
//   const id = request.only(['id']);
//   let picdata = await Picture.find(id)

//   if(picdata){
//     let currentdata = Picture.path as any[]

//     for (let file of files) {
//       await file.move(app.makePath('uploads'), {
//         name: `${new Date().getTime()}-${file.clientName}`,
//         overwrite: true,
        
//       currentdata.push({
//         pic:file.fileName,
//         category: "yg",
        
//       })
//     })
//    Picture.path = currentdata;
//   }}else{
//       Picture.id = id;
//     if (!files || files.length === 0) {
//       return response.status(400).send('Files are required')
//     }
    
//     const paths = []
    
//     for (let file of files) {
//       await file.move(app.makePath('uploads'), {
//         name: `${new Date().getTime()}-${file.clientName}`,
//         overwrite: true,
        
//       })
//         const picture = new Picture()
//         picture.path = [{pic:file.fileName,category:"juhg"},]
//         await picture.save()
        
//         paths.push(picture.path)
//     }
//   }

//     // return response.json({ paths })
// })



router.post('/upload-pic', async ({ request, response }) => {
  const files = request.files('files')
  const { id } = request.only(['id']);
  
  if (!files || files.length === 0) {
    return response.status(400).send('Files are required')
  }

  let picdata = await Picture.find(id)

  if (picdata) {
    let currentdata = picdata.path as PicData[]
    
    for (let file of files) {
      await file.move('uploads', {
        name: `${new Date().getTime()}-${file.clientName}`,
        overwrite: true,
      })

      currentdata.push({
        pic: file.fileName,
        category: "yg",
      })
    }

    picdata.path = currentdata;
    await picdata.save()
  } else {
    const paths: PicData[] = []
    
    for (let file of files) {
      await file.move('uploads', {
        name: `${new Date().getTime()}-${file.clientName}`,
        overwrite: true,
      })

      paths.push({
        pic: file.fileName,
        category: "juhg",
      })
    }

    const picture = new Picture()
    picture.id = id
    picture.path = paths
    await picture.save()
  }

  return response.json({ success: true })
})







router.get('/get-pic', async ({ request, response }) => {
  const queryParams = request.qs() 
  const { id } = queryParams as { id: string } 
  // const picture = await Picture.all()
  // return response.json(picture)
  try {
    const picture = await Picture.query().where('id', id) // fetch the answer by id
    if (picture) {
      return response.json(picture)
    } else {
      return response.status(404).json({ message: 'picture not found' })
    }
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Internal Server Error' })
  }
})

// router.get('/uploads',async ({ request, response }) => {
//   // const picture = await Picture.all()
//   // return response.json(picture)
// })


router.get('/uploads/:fileName', async ({ params, response }) => {
  const filePath = join(__dirname, '../uploads', params.fileName)
  if (fs.existsSync(filePath)) {
    response.download(filePath)
  } else {
    response.status(404).send('File not found')
  }
})



