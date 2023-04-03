import { tw } from "twind";

const SkipToContent = ({ target = "main-content" }: { target: string }) => {
  const skipToContentClass = tw`skip-to-content`;

  return (
    <a href={`#${target}`} className={skipToContentClass}>
      Skip to Content
    </a>
  );
};

export default SkipToContent;
