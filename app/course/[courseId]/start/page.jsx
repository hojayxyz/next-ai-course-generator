'use client';

import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import { and, eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import ChapterListCard from './_components/ChapterListCard';
import ChapterContent from './_components/ChapterContent';

function CourseStart({ params }) {
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedChapterContent, setSelectedChapterContent] = useState(null);

  useEffect(() => {
    GetCourse();
  }, []);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId));

    setCourse(result[0]);
    GetSelectedChapterContent(0);
  };

  const GetSelectedChapterContent = async (chapterId) => {
    const result = await db
      .select()
      .from(Chapters)
      .where(
        and(
          eq(Chapters?.chapterId, chapterId),
          eq(Chapters?.courseId, course?.courseId)
        )
      );

    console.log(result);
    setSelectedChapterContent(result[0]);
  };

  return (
    <div>
      {/* Chapter list side bar */}
      <div className="fixed md:w-64 hidden md:block h-screen border-r shadow-sm">
        <h2 className="text-lg font-medium bg-primary p-4 text-white">
          {course?.courseOutput?.course?.name}
        </h2>
        <div>
          {course?.courseOutput?.course?.chapters?.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-purple-100 ${
                selectedChapter === chapter ? 'bg-purple-200' : ''
              }`}
              onClick={() => {
                setSelectedChapter(chapter);
                GetSelectedChapterContent(index);
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>
      {/* Course content */}
      <div className="md:ml-64">
        <ChapterContent
          chapter={selectedChapter}
          content={selectedChapterContent}
        />
      </div>
    </div>
  );
}
export default CourseStart;
