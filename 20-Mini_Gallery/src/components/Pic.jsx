const Pin = ({ pic}) => {
  return (
    <a
      rel="noopener noreferrer"
      className="object-contain"
      href={pic.url}
      key={pic.id}
      target="_blank"
    >
      <img
        className="w-full rounded-lg"
        src={pic.download_url}
        alt={`Photo by ${pic.author}`}
      />
      <h3 className="font-bold text-md mb-4 px-0.5">{pic.author}</h3>
    </a>
  );
};

export default Pin;
