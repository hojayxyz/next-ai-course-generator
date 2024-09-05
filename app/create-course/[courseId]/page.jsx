'use client';

import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import { GenerateCourseChapter_AI } from '@/configs/AiModel';
import LoadingDialog from '../_components/LoadingDialog';
import service from '@/configs/service';
import { useRouter } from 'next/navigation';

function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
      // if (index === 0) {
      try {
        let videoId = '';
        // Generate Video URL
        const videos = await service
          .getVideos(course?.name + ': ' + chapter?.name)
          .then((res) => {
            console.log(res);
            videoId = res[0]?.id?.videoId;
          });
        // Generate Course Content
        const result = await GenerateCourseChapter_AI.sendMessage(PROMPT);
        console.log(result?.response?.text());
        const content = JSON.parse(result?.response?.text());

        // Save Chapter Content + Video URL to DB
        await db.insert(Chapters).values({
          chapterId: index,
          courseId: course?.courseId,
          content: content,
          videoId: videoId,
        });
        setIsLoading(false);
        await db.update(CourseList).set({
          published: true,
        });
        router.replace(`/create-course/${course?.courseId}/finish`);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
      // }
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
