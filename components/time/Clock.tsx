export default function Clock({timer=0, showMs=false}: {timer?: number, showMs?: boolean}) {
  const years = Math.floor(timer / 1000 / 60 / 60 / 24 / 365.25)
  const days = Math.floor(timer / 1000 / 60 / 60 / 24) % 365.25
  const hours = Math.floor(timer / 1000 / 60 / 60) % 24
  const minutes = Math.floor(timer / 1000 / 60) % 60
  const seconds = Math.floor(timer / 1000) % 60
  const ms = timer % 1000

  function toClock(value: number, suffix=':') {
    return value.toString().padStart(2, '0')+suffix
  }

  return <span>
    {years ? toClock(years) : ''}
    {days || years ? toClock(days) : ''}
    {hours || days || years ? hours.toString().padStart(days||years?2:1, '0')+':' : ''}
    {toClock(minutes)}
    {toClock(seconds, showMs?'.':'')}
    {showMs?ms.toString().padEnd(3, '0'):''}
  </span>
}