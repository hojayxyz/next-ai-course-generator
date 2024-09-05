'use client';

import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import { GenerateCourseChapter_AI } from '@/configs/AiModel';
import LoadingDialog from '../_components/LoadingDialog';

function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    params && GetCourse();
  }, [params, user]);

  const GetCourse = async () => {
    setIsLoading(true);
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    setCourse(result[0]);
    setIsLoading(false);
    console.log(result);
  };

  const GenerateChapterContent = async () => {
    setIsLoading(true);
    const chapters = course?.courseOutput?.course?.chapters;
    chapters.forEach(async (chapter, index) => {
      const PROMPT = `Explain the concept in Detail on Topic: ${course?.name}, Chapter: ${chapter?.name}, in JSON Format with list of array with field as title, explanation on given chapter detail, Code Example(Code field in <precode> format) if applicable`;
      console.log(PROMPT);
      if (index === 0) {
        try {
          const result = await GenerateCourseChapter_AI.sendMessage(PROMPT);
          console.log(result?.response?.text());
          // Generate Video URL

          // Save Chapter Content + Video URL to DB
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      }
    });
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>
      <LoadingDialog loading={isLoading} />
      {/* Basic Info */}
      <CourseBasicInfo course={course} refreshData={GetCourse} />
      {/* Course Detail */}
      <CourseDetail course={course} />
      {/* List of Chapters */}
      <ChapterList course={course} refreshData={GetCourse} />
      <Button className="my-10" onClick={GenerateChapterContent}>
        Generate Course Content
      </Button>
    </div>
  );
}
export default CourseLayout;
