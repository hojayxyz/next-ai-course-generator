import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { DialogClose } from '@radix-ui/react-dialog';
import { eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import { HiPencilSquare } from 'react-icons/hi2';

function EditCourseBasicInfo({ course, refreshData }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    setName(course?.courseOutput?.course?.name);
    setDescription(course?.courseOutput?.course?.description);
  }, [course]);

  const handleUpdate = async () => {
    course.courseOutput.course.name = name;
    course.courseOutput.course.description = description;
    const result = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .where(eq(CourseList.id, course?.id))
      .returning({ id: CourseList.id });
    refreshData(true);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare className="" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title & Description</DialogTitle>
          <DialogDescription>
            <div>
              <label>Course Title</label>
              <Input
                onChange={(e) => setName(e.target.value)}
                defaultValue={course?.courseOutput?.course?.name}
              />
            </div>
            <div>
              <label>Course Description</label>
              <Textarea
                className="h-40"
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={course?.courseOutput?.course?.description}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default EditCourseBasicInfo;
