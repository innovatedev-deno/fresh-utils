export default function Clock({timer=0, rate}: {timer?: number, rate: number}) {
  const money = timer/1000/60/60*rate

  return <span>
    ${money.toFixed(2)}
  </span>
}