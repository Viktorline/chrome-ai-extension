import { Button } from '../../components/button/Button'
import { useState } from 'react'
import React from 'react'

import './Settings.css'

type SettingsProps = {
  apiKey: string
  setOpenAiApiKey: (newApi: string) => void
}

function Settings({ apiKey, setOpenAiApiKey }: SettingsProps) {
  const [editApiKey, setEditApiKey] = useState(apiKey || '')

  const isModified = editApiKey !== apiKey

  const handleSave = () => {
    setOpenAiApiKey(editApiKey)
    setEditApiKey(editApiKey)
  }

  return (
    <div className='settings'>
      <div className='setting'>
        <div className='name'>OpenAi</div>
        <input
          id='edit-api-key'
          name='apiKey'
          className='inputSettings'
          type='text'
          value={editApiKey}
          onChange={e => setEditApiKey(e.target.value)}
          placeholder='Enter OpenAI API Key'
        />
      </div>
      {isModified && <Button onClick={handleSave}>Save API Key</Button>}
    </div>
  )
}

export default Settings
