import React from 'react'
import Game from './src/components/Game'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <Game/>
    </GestureHandlerRootView>
    
  )
}

export default App
