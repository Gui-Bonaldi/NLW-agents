const apiKeyinput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')

const markdownToHTML = (text) => {
  const converter = new showdown.Converter()
  return converter.makeHtml(text)
}


//AIzaSyAQIWAOix9kWw12UWGp2axfYxC0pjN7tWg//

const perguntarAI = async (question, game, apiKey) => {
const model = "gemini-2.5-flash"
const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
  const pergunta = `
    ## Especialidade
    Você é um especialista assistente de meta para o jogo ${game}.
    
    ## Tarefas
    Voce deve responder as perguntas do usuario com base no seu conhecimento do jogo, estrategias, builds e dicas.
    
    ## Regras
    - Se você nao sabe a resposta, responda com 'Não sei' e nao tente inventar uma resposta.
    - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'.
    - Considere a data atual ${new Date().toLocaleDateString()}
    - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual para dar uma resposta coerente.
    - Nunca responda itens que você não tenha certeza de que existe no patch atual.
    - Busque videos e/ou stramers que joguem o jogo para indicar

    ## Resposta
    - Economiza na resposta, seja direto e responda no maximo 500 caracteres
    - Responda em markdown
    - Não precisa fazer nenhuma saudação ou despedida, apenas responda oque o usuário perguntou
    - A resposta deve ser formatada em lista caso haja itens, runas, perks ou demais coisas que se caracterizem nesse formato

    --- 
    Aqui está a pergunta do usuário: ${question}
  `
  const contents = [{
    role: "user", 
    parts: [{
      text: pergunta
    }]
  }]

  const tools = [{
    google_search: {}
  }]

  const response = await fetch (geminiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents,
      tools
    })
  })

  const data = await response.json()
  return data.candidates[0].content.parts[0].text


}


const enviarFormulario = async (event) => {
  event.preventDefault()
  const apiKey = apiKeyinput.value
  const game = gameSelect.value
  const question = questionInput.value

  

  if (apiKey == '' || game == '' || question == '') {
    alert ('por favor preencha todos os campos')
    return
  } 
  
  askButton.disabled = true
  askButton.textContent = 'Perguntando...'
  askButton.classList.add ('loading')

  try{
   const text = await perguntarAI(question, game, apiKey)
    aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text)
    aiResponse.classList.remove ('hidden')
  }catch(error) {
    console.log ('Erro: ', error)
  } finally {
    askButton.disabled = false
    askButton.textContent ="Perguntar"
    askButton.classList.remove ('loading')
  }
}
form.addEventListener('submit', enviarFormulario)