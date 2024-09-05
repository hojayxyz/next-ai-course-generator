import {
  boolean,
  integer,
  json,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

export const CourseList = pgTable('courseList', {
  id: serial('id').primaryKey(),
  courseId: varchar('courseId').notNull(),
  name: varchar('name').notNull(),
  category: varchar('category').notNull(),
  level: varchar('level').notNull(),
  includeVideo: varchar('includeVideo').default('yes'),
  courseOutput: json('courseOutput').notNull(),
  createdBy: varchar('createdBy').notNull(),
  userName: varchar('userName'),
  userProfileImage: varchar('userProfileImage'),
  courseBanner: varchar('courseBanner').default('/placeholder.png'),
  published: boolean('published').default(false),
});

export const Chapters = pgTable('chapters', {
  id: serial('id').primaryKey(),
  courseId: varchar('courseId').notNull(),
  chapterId: integer('chapterId').notNull(),
  content: json('content').notNull(),
  videoId: varchar('videoId'),
});
