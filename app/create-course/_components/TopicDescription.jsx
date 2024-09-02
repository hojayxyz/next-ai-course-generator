import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

function TopicDescription() {
  return (
    <div className="mx-20 lg:mx-44">
      {/* Input Topic */}
      <div className="mt-5">
        <label htmlFor="topic">
          Write the topic for which you want to generate a course (e.g, Python
          Course, Yoga, etc.)
        </label>
        <Input placeholder="Enter the topic" id="topic" />
      </div>
      {/* Text Area Desc */}
      <div className="mt-5">
        <label htmlFor="description">
          Tell us more about the course. What will students learn? What will
          they get out of it?
        </label>
        <Textarea placeholder="Enter the description" id="description" />
      </div>
    </div>
  );
}
export default TopicDescription;
