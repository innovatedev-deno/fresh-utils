import { useReducer } from "preact/hooks"

type Timer = {start: number, end?:number, duration: number, isRunning: boolean, elapsed?: number}
const defaultState = {
  start:Date.now(),
  duration:0,
  isRunning:false,
}

type TimerAction = 'tick'|'start'|'resume'|'stop'|'reset'
export default function useTimer(name='timer', state: Partial<Timer>=defaultState): [Timer, (action: TimerAction) => void] {
  const localState: Timer = JSON.parse(localStorage.getItem(name)||'{}')
  const initialState: Timer = {...defaultState, ...state, ...localState }
  const [timer, timerControl] = useReducer<Timer, TimerAction>((state, action) => {
    
    const newState: Timer = (() => {
      switch(action){
        case 'tick': return {...state, elapsed: state.isRunning ? Date.now() - state.start + state.duration : 0}
        case 'start': return {...state, start: Date.now(), end: undefined, isRunning: true }
        case 'resume': return {...state, isRunning: true }
        case 'stop': return {...state, end: Date.now(), isRunning: false, duration: Date.now()-state.start+state.duration, elapsed: 0 }
        case 'reset': return {...defaultState}
        default: throw new Error('invalid action')
      }
    })()

    const {elapsed, ...storeTimer} = newState
    localStorage.setItem(name, JSON.stringify(storeTimer))

    return newState
  }, initialState)

  const doTick = () => {
    setTimeout(() => {
      if(timer.isRunning) timerControl('tick')

      doTick()
    }, Math.random()*250)
  }

  doTick()

  return [timer, timerControl]
}
