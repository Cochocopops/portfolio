interface ProjectPreviewProps {
  title: string;
  description: string;
  link: string;
}

export default function ProjectPreview({ title, description, link }: ProjectPreviewProps) {
  return (
    <a
      href={link}
      className="group border border-gray-200 rounded-2xl p-8 hover:border-gray-400 hover:-translate-y-1 transition-all duration-300"
    >
      <h3 className="text-xl font-light mb-2 text-gray-900 group-hover:text-black">
        {title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </a>
  );
}
