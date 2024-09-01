'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from 'react-icons/hi2';

function CreateCourse() {
  const StepperOptions = [
    {
      id: 1,
      name: 'Category',
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 1,
      name: 'Topic & Desc',
      icon: <HiLightBulb />,
    },
    {
      id: 1,
      name: 'Options',
      icon: <HiClipboardDocumentCheck />,
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

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
              disabled={activeStep === StepperOptions.length - 1}
              onClick={() => setActiveStep(activeStep + 1)}
            >
              Next
            </Button>
          )}
          {activeStep == 2 && <Button>Generate Course Layout</Button>}
        </div>
      </div>
    </div>
  );
}
export default CreateCourse;
