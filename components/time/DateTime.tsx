import { JSX } from "preact";

export default function DateTime({timestamp, ...props}: JSX.HTMLAttributes<HTMLTimeElement>&{timestamp: number}) {
  return (
    <time
      value={timestamp}
      {...props}
      class={`flex flex-col flex-grow`}
    >
      <span>
        {new Date(timestamp).toLocaleDateString()}
      </span>
      <span class="text-sm">
        {new Date(timestamp).toLocaleTimeString()}
      </span>
    </time>
  );
}
