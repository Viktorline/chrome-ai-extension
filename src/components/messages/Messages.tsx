import { Message } from '../../store/usePromptStore'
import cn from 'classnames'
import React from 'react'

import './Messages.css'

interface MessagesProps {
  messages: Message[]
  loading: boolean
}
const mockData = [
  {
    id: 1726195380907,
    question:
      '12312313131232131232131231231232132132131232131232131231321321313213',
    answer:
      '12312313131232131232131231231232132132131232131232131231321321313213 12312313131232131232131231231232132132131232131232131231321321313213',
    error: null
  },
  {
    id: 1726195380907,
    question: '123',
    answer: '123',
    error: null
  },
  {
    id: 1726195380907,
    question: '123',
    answer: '123',
    error: null
  },
  {
    id: 1726195380907,
    question: '123',
    answer: '123',
    error: null
  }
]

export function Messages({ messages, loading }: MessagesProps) {
  console.log(messages)
  return (
    <div className='chromefastcom-wrapper-messages'>
      {loading ? (
        <div className='chromefastcom-loading'>Loading...</div>
      ) : (
        <>
          {mockData.map((msg, index) => (
            <div key={index} className='chromefastcom-messageBlock'>
              <>
                <div
                  className={cn(
                    'chromefastcom-message-wrapper',
                    'chromefastcom-question'
                  )}
                >
                  <p className='chromefastcom-message'>{msg.question}</p>
                </div>

                {msg.answer && (
                  <div
                    className={cn(
                      'chromefastcom-message-wrapper',
                      'chromefastcom-answer'
                    )}
                  >
                    <p className='chromefastcom-message'>{msg.answer}</p>
                  </div>
                )}
                {msg.error && (
                  <div
                    className={cn(
                      'chromefastcom-message-wrapper',
                      'chromefastcom-error'
                    )}
                  >
                    <p className='chromefastcom-message'>{msg.error}</p>
                  </div>
                )}
              </>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
