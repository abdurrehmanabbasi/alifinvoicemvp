const Loading = ({loadingText}) => {
  return (
    <div className="flex items-center flex-col justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      <p>{loadingText?loadingText:Loading}</p>
    </div>
  );
};

export default Loading;
