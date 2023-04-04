import { useEffect, useRef, useState } from "preact/hooks";
import { ComponentChildren } from "preact";

export default function Code({children}: {children: ComponentChildren}) {
  const ref = useRef<HTMLPreElement>(null);
  const [didCopy, setDidCopy] = useState(false);
  
  useEffect(() => {
    if (didCopy) {
      const timeout = setTimeout(() => setDidCopy(false), 2500);
      return () => clearTimeout(timeout);
    }
  }, [didCopy]);

  return (
    <code class="border border-color-gray-600 bg-gray-300 color-gray-900 w-[300px] px-2 flex justify-between">
      <pre class="whitespace-pre-wrap" ref={ref}>{children}</pre>

      <button class={`${didCopy && 'bg-green-200'} animate-all px-2 opacity-75 text-xs`} type="button" onClick={() => {
        const text = ref.current?.innerText;

        if (text) {
          navigator.clipboard.writeText(text)
          setDidCopy(true);
        }
      }}>{didCopy ? 'Copied!' : 'Copy'}</button>
    </code>
  )
}
