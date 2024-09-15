import { Button } from '../../components/button/Button'
import { useState } from 'react'
import React from 'react'

import './Settings.css'

type SettingsProps = {
  apiKey: string
  setApiKey: (newApi: string) => void
}

function Settings({ apiKey, setApiKey }: SettingsProps) {
  const [editApiKey, setEditApiKey] = useState(apiKey || '')

  const isModified = editApiKey !== apiKey

  const handleSave = () => {
    setApiKey(editApiKey)
  }

  return (
    <div className='settings'>
      <input
        id='edit-api-key'
        name='apiKey'
        className='input'
        type='text'
        value={editApiKey}
        onChange={e => setEditApiKey(e.target.value)}
        placeholder='Enter OpenAI API Key'
      />
      {isModified && <Button onClick={handleSave}>Save API Key</Button>}
    </div>
  )
}

export default Settings
