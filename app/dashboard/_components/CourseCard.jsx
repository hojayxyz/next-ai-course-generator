import Image from 'next/image';
import {
  HiMiniEllipsisVertical,
  HiOutlineBookOpen,
  HiOutlineStar,
} from 'react-icons/hi2';
import DropdownOption from './DropdownOption';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

function CourseCard({ course, refreshData }) {
  const handleDelete = async () => {
    const resp = await db
      .delete(CourseList)
      .where(eq(CourseList.id, course?.id))
      .returning({ id: CourseList?.id });
    if (resp) {
      refreshData();
    }
  };
  return (
    <div className="shadow-sm rounded-lg border p-2 cursor-pointer mt-4 hover:border-primary">
      <Link href={`/course/${course?.courseId}`}>
        <Image
          src={course?.courseBanner}
          alt={course?.name}
          width={300}
          height={200}
          className="w-full h-[200px] object-cover rounded-lg"
        />
      </Link>
      <div className="p-2">
        <h2 className="font-medium text-lg flex items-center justify-between">
          {course?.courseOutput?.course?.name}

          <DropdownOption handleDelete={handleDelete}>
            <HiMiniEllipsisVertical />
          </DropdownOption>
        </h2>

        <p className="text-sm text-gray-400 my-1">{course?.category}</p>
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 p-1 bg-purple-50 text-primary text-sm rounded-sm">
            <HiOutlineBookOpen /> {course?.courseOutput?.course?.noOfChapters}{' '}
            Chapters
          </h2>
          <h2 className="flex items-center gap-2 text-sm bg-purple-50 text-primary rounded-sm">
            <HiOutlineStar /> {course?.level}
          </h2>
        </div>
      </div>
    </div>
  );
}
export default CourseCard;
