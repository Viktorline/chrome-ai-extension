import OpenAI from 'openai'

export const mockApiCall = async (question: string): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Answer for your question: ${question}`)
    }, 1000)
  })
}

export const fetchFromOpenAI = async (question: string, openAi: OpenAI) => {
  try {
    const response = await openAi.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: question }]
    })
    console.log(response)
    const answer = response.choices?.[0]?.message?.content || null
    return answer
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export const fetchFromSecondNetwork = async (
  question: string
): Promise<string> => {
  try {
    const response = await fetch('https://api.second-network.com/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer YOUR_API_KEY`
      },
      body: JSON.stringify({ prompt: question })
    })

    if (!response.ok) {
      throw new Error('Error')
    }

    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Error', error)
    throw error
  }
}
