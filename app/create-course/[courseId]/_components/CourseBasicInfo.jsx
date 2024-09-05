import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { HiOutlinePuzzlePiece } from 'react-icons/hi2';
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { useState } from 'react';
import { storage } from '@/configs/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';

function CourseBasicInfo({ course, refreshData }) {
  const [selectedImage, setSelectedImage] = useState(null);

  /**
   * Upload image to firebase storage
   * @param {File} file
   */

  const onFileSelected = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    const fileName = Date.now() + '.jpg';
    const storageRef = ref(storage, 'ai-course/' + fileName);
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log('Uploaded a file!');
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          await db
            .update(CourseList)
            .set({
              courseBanner: downloadUrl,
            })
            .where(eq(CourseList.id, course?.id));
        });
      });
  };

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.course?.name}{' '}
            <EditCourseBasicInfo course={course} refreshData={refreshData} />
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.course?.description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            <HiOutlinePuzzlePiece />
            {course?.category}
          </h2>
          <Button className="w-full mt-5">Start</Button>
        </div>
        <div>
          <label htmlFor="upload-image">
            <Image
              src={selectedImage || '/logo.svg'}
              alt="logo"
              width={300}
              height={300}
              className="w-full border rounded-xl h-[250px] object-cover cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="upload-image"
            className="hidden"
            onChange={onFileSelected}
          />
        </div>
      </div>
    </div>
  );
}
export default CourseBasicInfo;
