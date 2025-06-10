// src/pages/auth/Login.tsx
import { useLocation } from 'react-router-dom'
import LoginAgent, { routeConfig as agentConfig } from './Login.agent'
import LoginUI,    { routeConfig as uiConfig    } from './Login.ui'

// Wybieramy routeConfig na podstawie parametru
export const routeConfig = (() => {
  const params = new URLSearchParams(window.location.search)
  return params.get('agentMode') === 'true' ? agentConfig : uiConfig
})()

export default function LoginWrapper() {
  const { search } = useLocation()
  const agentMode = new URLSearchParams(search).get('agentMode') === 'true'
  return agentMode ? <LoginAgent /> : <LoginUI />
}
