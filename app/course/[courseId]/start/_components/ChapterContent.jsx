import YouTube from 'react-youtube';
import ReactMarkdown from 'react-markdown';

const opts = {
  height: '390',
  width: '640',
};

function ChapterContent({ chapter, content }) {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-medium">{chapter?.name}</h2>
      <p className=" text-gray-500">{chapter?.about}</p>

      {/* Video */}
      {content?.videoId && (
        <div className="flex justify-center items-center my-6">
          <YouTube videoId={content?.videoId} opts={opts} />
        </div>
      )}

      <div>
        {content?.content?.map((item, index) => (
          <div className="p-5 bg-sky-50 mb-3 rounded-lg" key={index}>
            <h2 className="text-lg font-medium">{item?.title}</h2>
            <p className="whitespace-pre-wrap text-gray-500 text-sm">
              <ReactMarkdown>{item?.explanation}</ReactMarkdown>
            </p>
            {item?.code_example && (
              <div className="bg-black text-white p-4 mt-3 rounded-md">
                <pre>
                  <code>{item?.code_example}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Content */}
    </div>
  );
}
export default ChapterContent;
