import { Message } from '../../store/usePromptStore'
import React from 'react'

import './Messages.css'

interface MessagesProps {
  messages: Message[]
  loading: boolean
}

export function Messages({ messages, loading }: MessagesProps) {
  return (
    <div className='wrapper'>
      {loading && <div className='loading'>Loading...</div>}
      {messages.map((msg, index) => (
        <div key={index} className='message'>
          <div className='message-question'>{msg.question}</div>
          {msg.answer && <div className='message-answer'>{msg.answer}</div>}
          {msg.error && <div className='message-error'>{msg.error}</div>}
        </div>
      ))}
    </div>
  )
}
