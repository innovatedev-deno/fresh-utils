import { useId, useRef, useState } from "preact/hooks";
import { tw } from "twind";
import { CarouselCardMap } from "~/components/ui.ts";

// https://www.smashingmagazine.com/2023/02/guide-building-accessible-carousels/

export default function Carousel(
  { title, data }: { title: string, data: Record<string, unknown>[] },
) {
  const keys = Object.keys(data[0]).join(',');
  const Card = CarouselCardMap.get(keys);

  if(!Card) throw new Error(`No compatible card found for data (${[...keys]})`);

  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselId = useId();

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselLength = data.length;

  const handlePreviousClick = () => {
    setCurrentIndex((currentIndex - 1 + carouselLength) % carouselLength);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % carouselLength);
  };

  const handleKeyInput = (key: string, target: HTMLLIElement) => {
    if (key === "ArrowLeft") {
      handlePreviousClick();
      const previousSibling = target.previousSibling as HTMLLIElement;
      
      if(previousSibling) {
        previousSibling.focus();
      } else {
        (target.parentElement?.lastChild as HTMLLIElement).focus();
      }
    } else if (key === "ArrowRight") {
      handleNextClick();

      const nextSibling = target.nextSibling as HTMLLIElement;

      if(nextSibling) {
        nextSibling.focus();
      } else {
        (target.parentElement?.firstChild as HTMLLIElement).focus();
      }
    }
  }

  return (
    <div
      id={carouselId}
      role="region" aria-roledescription="carousel" aria-labelledby={`${carouselId}_title`}
      class="mb-4 relative"
    >
      <h2 id={`${carouselId}_title`} class="text-center mb-2 text-2xl">{title}</h2>
      <button
        className={tw`z-[999] absolute bottom-0 left-0 text-3xl bg-transparent border-none text-gray-700 cursor-pointer`}
        onClick={handlePreviousClick}
        aria-label="Previous"
        aria-disabled={currentIndex === 0}
      >
        <span aria-hidden>&lt;</span>
      </button>
      <div class="relative flex items-center justify-center">
        <div
          ref={carouselRef}
          className={tw`overflow-hidden`}
          style={{ width: "100%" }}
        >
          <ul
            className={tw`flex transition-transform duration-300 gap-[15px] items-stretch`}
            style={{ transform: `translateX(-${currentIndex * 335}px)` }}
          >
            {data.map((item, index) => (
              <li
                aria-roledescription="slide"
                aria-labelledby={`${carouselId}_slide_${index}_title`}
                key={`${carouselId}_slide_${index}`}
                aria-current={currentIndex === index}
                tabIndex={currentIndex === index ? 0 : -1}
                className={tw`focus:outline min-w-[320px] flex-grow`}
                onKeyDown={e => handleKeyInput(e.key, e.currentTarget)}
              >
                <Card data={item as never} id={`${carouselId}_slide_${index}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        className={tw`z-[999] absolute bottom-0 right-0 text-3xl bg-transparent border-none text-gray-700 cursor-pointer`}
        onClick={handleNextClick}
        aria-label="Next"
        aria-disabled={currentIndex === carouselLength - 1}
      >
        <span aria-hidden>&gt;</span>
      </button>

      <div class="text-xs text-gray text-center">
        {currentIndex + 1} of {carouselLength}
      </div>
    </div>
  );
}
