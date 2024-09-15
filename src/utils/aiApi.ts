export const mockApiCall = async (question: string): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Answer for your question: ${question}`)
    }, 1000)
  })
}

export const fetchFromOpenAI = async (
  question: string,
  apiKey: string
): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }]
      })
    })

    if (!response.ok) {
      throw new Error('Error')
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error('Error:', error)
    throw error
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
