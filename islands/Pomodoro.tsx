import Clock from "fresh-utils/components/time/Clock.tsx";
import useTimer from "fresh-utils/hooks/useTimer.ts";
import { apply } from "twind";

import {useState} from 'preact/hooks';

export default function Pomodoro({clock}: {clock: number|string}) {
  let duration = clock;
  let name = 'pomodoro';

  if(typeof duration === 'string'){
    [duration, name] = duration.split('-');
    duration = parseFloat(duration);
  }

  duration = duration * 60 * 1000

  const [timer, timerControl] = useTimer(name, {isRunning: true})

  const styles = {
    wrapper: apply('flex gap-2 p-4 text-[12rem] m-auto flex-wrap justify-center'),
    button: apply('px-2 py-4 px-8 rounded bg-gray-200 hover:focus:bg-gray-300 text-[1rem] flex-shrink-0'),
    topButtons: apply('flex flex-grow w-full justify-center gap-4'),
    clock: apply('w-full text-center my-8'),
  };

  const [isCountdown, setIsCountdown] = useState(true);

  const displaytime = isCountdown ? duration - (timer.elapsed||0 + timer.duration) : (timer.elapsed||0 + timer.duration);

  return <div class={styles.wrapper}>
    <div class={styles.topButtons}>
      <a class={styles.button} href={`../25-${name}/pomodoro`}>Focus</a>
      <a class={styles.button} href={`../5-${name}/pomodoro`}>Short Break</a>
      <a class={styles.button} href={`../15-${name}/pomodoro`}>Long Break</a>
    </div>


    <button type="button" class={styles.clock} onClick={setIsCountdown(!isCountdown)}>
      <Clock timer={displaytime} />
    </button>

    {timer.isRunning ?
      <button class={styles.button} onClick={() => timerControl('stop')}>Stop</button>
    :
      <button class={styles.button} onClick={() => timerControl('start')}>Start</button>
    }

  <button class={styles.button} onClick={() => timerControl('reset')}>Reset</button>

  </div>
}