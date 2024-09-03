'use client';

import { Button } from '@/components/ui/button';
import { useContext, useEffect, useState } from 'react';
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from 'react-icons/hi2';
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import { GenerateCourseLayout } from '@/configs/AiModel';
import LoadingDialog from './_components/LoadingDialog';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import uuid4 from 'uuid4';

function CreateCourse() {
  const StepperOptions = [
    {
      id: 'Option1',
      name: 'Category',
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 'Option2',
      name: 'Topic & Desc',
      icon: <HiLightBulb />,
    },
    {
      id: 'Option3',
      name: 'Options',
      icon: <HiClipboardDocumentCheck />,
    },
  ];

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  const checkStatus = () => {
    if (!userCourseInput || Object.keys(userCourseInput).length === 0) {
      return true;
    }

    const { category, topic, description, video, duration, level, chapters } =
      userCourseInput;

    switch (activeStep) {
      case 0:
        return !category || category.trim() === '';
      case 1:
        return (
          !topic ||
          topic.trim() === '' ||
          !description ||
          description.trim() === ''
        );
      case 2:
        return (
          !level ||
          level.trim() === '' ||
          !duration ||
          duration.trim() === '' ||
          !video ||
          video.trim() === '' ||
          !chapters ||
          chapters.length === 0
        );
      default:
        return false;
    }
  };

  const handleGenerateCourseLayout = async () => {
    setLoading(true);
    const BASIC_PROMPT =
      'Generate A Course Tutorial on Following Detail with field as Course Name, Description, along with Chapter Name, About, Duration: ';
    const USER_INPUT_PROMPT = `Category: ${userCourseInput.category}, Topic: ${userCourseInput.topic}, Level: ${userCourseInput.level}, Duration: ${userCourseInput.duration}, NoOfChapters: ${userCourseInput.noOfChapters}`;
    console.log(BASIC_PROMPT + USER_INPUT_PROMPT);

    const result = await GenerateCourseLayout.sendMessage(
      BASIC_PROMPT + USER_INPUT_PROMPT
    );
    console.log(result.response);
    console.log(JSON.parse(result.response.text()));
    setLoading(false);
    handleSaveCourseInDb(JSON.parse(result.response.text()));
  };

  const handleSaveCourseInDb = async (courseLayout) => {
    setLoading(true);
    var id = uuid4();
    const result = await db.insert(CourseList).values({
      courseId: id,
      name: userCourseInput.topic,
      level: userCourseInput.level,
      category: userCourseInput.category,
      courseOutput: courseLayout,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      userProfileImage: user?.imageUrl,
    });
    console.log('Finish: ' + result);
    setLoading(false);
  };

  return (
    <div>
      {/* Stepper */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <div key={item.id} className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white ${
                    activeStep >= index ? 'bg-purple-500' : ''
                  }`}
                >
                  {item.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {index != StepperOptions.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] lg:w-[170px] rounded-full ${
                    activeStep - 1 >= index ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {/* Components */}
        {activeStep === 0 ? (
          <SelectCategory />
        ) : activeStep === 1 ? (
          <TopicDescription />
        ) : (
          <SelectOption />
        )}
        {/* Next Previous Buttons */}
        <div className="flex justify-between items-center mt-10">
          <Button
            disabled={activeStep === 0}
            variant="outline"
            onClick={() => setActiveStep(activeStep - 1)}
          >
            Previous
          </Button>

          {activeStep < 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => setActiveStep(activeStep + 1)}
            >
              Next
            </Button>
          )}
          {activeStep == 2 && (
            <Button
              disabled={checkStatus()}
              onClick={handleGenerateCourseLayout}
            >
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
}
export default CreateCourse;
