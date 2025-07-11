const apiKeyinput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')

//AIzaSyAQIWAOix9kWw12UWGp2axfYxC0pjN7tWg//

const perguntarAI = async (question, game, apiKey) => {
  const model = "gemini-2.5-flash"
  const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
  const pergunta = `
  `
  const contents = [{
    parts: [{
      text: pergunta
    }]
  }]


  const response = await fetch (geminiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents
    })
  })

  const data = 


}


const enviarFormulario = (event) => {
  event.preventDefault()
  const apiKey = apiKeyinput.value
  const game = gameSelect.value
  const question = questionInput.value

  console.log ({apiKey, game, question})

  if (apiKey == '' || game == '' || question == '') {
    alert ('por favor preencha todos os campos')
    return
  } 
  
  askButton.disabled = true
  askButton.textContent = 'Perguntando...'
  askButton.classList.add ('loading')

  try{
    //perguntar para a IA//
    perguntarAI(question, game, apiKey)
  }catch(error) {
    console.log ('Erro: ', error)
  } finally {
    askButton.disabled = false
    askButton.textContent ="Perguntar"
    askButton.classList.remove ('loading')
  }
}
form.addEventListener('submit', enviarFormulario)