import { tw } from "twind";

export default function TestimonialCard({ id, data }: { id: string, data: {quote: string, name: string} }) {
  const styles = {
    card: tw`bg-white rounded-lg shadow-lg p-4`,
    author: tw`text-right`,
    heading: tw`text-2xl font-bold mb-4`,
  };
  return (
    <div class={styles.card} id={id}>
      <blockquote>{data.quote}</blockquote>
      <p class={styles.author} id={`${id}_title`}>- {data.name}</p>
    </div>
  );
}
