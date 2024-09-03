import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
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
import { eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import { HiPencilSquare } from 'react-icons/hi2';

function EditChapters({ course, index, refreshData }) {
  const Chapters = course?.courseOutput?.course?.chapters;

  const [name, setName] = useState();
  const [about, setAbout] = useState();

  useEffect(() => {
    setName(Chapters[index].name);
    setAbout(Chapters[index].about);
  }, [Chapters, index]);

  const handleUpdate = async () => {
    Chapters[index].name = name;
    Chapters[index].about = about;
    const result = await db
      .update(CourseList)
      .set({ courseOutput: course?.courseOutput })
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList.id });
    console.log(result);
    refreshData(true);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare className="" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            <div>
              <label>Course Title</label>
              <Input
                onChange={(e) => setName(e.target.value)}
                defaultValue={Chapters[index].name}
              />
            </div>
            <div>
              <label>Description</label>
              <Textarea
                className="h-40"
                onChange={(e) => setAbout(e.target.value)}
                defaultValue={Chapters[index].about}
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
export default EditChapters;
