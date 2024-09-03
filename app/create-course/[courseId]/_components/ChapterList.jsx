import { HiOutlineCheckCircle, HiOutlineClock } from 'react-icons/hi2';
import EditChapters from './EditChapters';

function ChapterList({ course, refreshData }) {
  return (
    <div className="mt-3">
      <h2 className="text-xl font-medium">Chapters</h2>
      <div className="mt-2">
        {course?.courseOutput?.course?.chapters.map((chapter, index) => (
          <div
            className="border p-5 rounded-lg mb-2 flex items-center justify-between"
            key={index}
          >
            <div className="flex gap-2 items-center">
              <h2 className="bg-primary flex-none h-10 w-10 text-white rounded-full text-center p-2">
                {index + 1}
              </h2>
              <div>
                <h2 className="font-medium text-lg">
                  {chapter.name}{' '}
                  <EditChapters
                    course={course}
                    index={index}
                    refreshData={refreshData}
                  />
                </h2>
                <p className="text-sm text-gray-500">{chapter.about}</p>
                <p className="text-sm text-primary flex items-center gap-2">
                  <HiOutlineClock />
                  {chapter?.duration}
                </p>
              </div>
            </div>
            <HiOutlineCheckCircle className="text-4xl text-gray-300 flex-none" />
          </div>
        ))}
      </div>
    </div>
  );
}
export default ChapterList;
