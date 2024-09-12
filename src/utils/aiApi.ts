export const mockApiCall = async (question: string): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Answer for your question: ${question}`)
    }, 1000)
  })
}

export const fetchFromFirstNetwork = async (
  question: string
): Promise<string> => {
  try {
    const response = await fetch('https://api.first-network.com/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer YOUR_API_KEY`
      },
      body: JSON.stringify({ question })
    })

    if (!response.ok) {
      throw new Error('Error')
    }

    const data = await response.json()
    return data.answer
  } catch (error) {
    console.error('Error', error)
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
