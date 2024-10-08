import { UserInputContext } from '@/app/_context/UserInputContext';
import CategoryList from '@/app/_shared/CategoryList';
import Image from 'next/image';
import { useContext } from 'react';

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({ ...prev, category: category.name }));
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-5">
        <h2 className="text-2xl font-bold">Select a Category</h2>
        <p className="text-sm text-gray-500">
          Choose a category that best describes your course.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-10 px-10 md:px-20">
        {CategoryList.map((category, index) => (
          <div
            key={category.id}
            className={`flex flex-col p-5 border items-center justify-center rounded-xl hover:border-primary hover:bg-primary/10 transition-all duration-100 cursor-pointer ${
              userCourseInput.category === category.name
                ? 'border-primary bg-primary/20'
                : 'border-gray-300'
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            <Image
              src={category.icon}
              alt={category.name}
              width={50}
              height={50}
            />
            <h2>{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SelectCategory;
