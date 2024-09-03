'use client';

import { UserInputContext } from '@/app/_context/UserInputContext';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useContext } from 'react';

function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <label className="text-sm" htmlFor="level">
            Difficulty Level
          </label>
          <Select
            onValueChange={(value) => handleInputChange('level', value)}
            defaultValue={userCourseInput.level}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm" htmlFor="duration">
            Course Duration
          </label>
          <Select
            onValueChange={(value) => handleInputChange('duration', value)}
            defaultValue={userCourseInput.duration}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More than 3 Hours">
                More than 3 Hours
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm" htmlFor="video">
            Add Video
          </label>
          <Select
            onValueChange={(value) => handleInputChange('video', value)}
            defaultValue={userCourseInput.video}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm" htmlFor="chapters">
            Number of Chapters
          </label>
          <Input
            type="number"
            placeholder="Enter the number of chapters"
            value={userCourseInput.chapters}
            onChange={(e) => handleInputChange('chapters', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
export default SelectOption;
