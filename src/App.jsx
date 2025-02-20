import './App.css'

import { Amplify } from 'aws-amplify'
import { Scene } from './components/Scene'
import config from './amplify_outputs.json'

Amplify.configure(config)

export default function App() {
  return (
    <div>
      <Scene />
      {/* <Leva collapsed={true} hidden={true} /> */}
    </div>
  )
}
