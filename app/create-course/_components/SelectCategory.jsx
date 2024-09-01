import CategoryList from '@/app/_shared/CategoryList';
import Image from 'next/image';

function SelectCategory() {
  return (
    <div className="grid grid-cols-3 gap-10 px-10 md:px-20">
      {CategoryList.map((category, index) => (
        <div
          key={category.id}
          className="flex flex-col p-5 border items-center justify-center rounded-xl hover:border-primary hover:bg-primary/10 transition-all duration-100 cursor-pointer"
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
  );
}
export default SelectCategory;
