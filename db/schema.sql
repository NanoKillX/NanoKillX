create table if not exists users (
  id uuid primary key,
  email text unique not null,
  full_name text not null,
  index_no text unique,
  role text not null check (role in ('admin','student','parent')),
  parent_user_id uuid references users(id),
  created_at timestamptz default now()
);

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  fee numeric(10,2) not null,
  published boolean default false,
  created_at timestamptz default now()
);

create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references users(id),
  course_id uuid not null references courses(id),
  status text not null default 'unpaid' check (status in ('unpaid','paid')),
  paid_at timestamptz,
  unique(student_id, course_id)
);

create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id),
  title text not null,
  youtube_video_id text not null,
  published boolean default false,
  created_at timestamptz default now()
);

create table if not exists exams (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id),
  title text not null,
  duration_minutes int not null default 60,
  published boolean default false
);

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references exams(id) on delete cascade,
  question text not null,
  options jsonb not null,
  correct_answer text not null
);

create table if not exists exam_results (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references exams(id),
  student_id uuid not null references users(id),
  score numeric(5,2) not null,
  submitted_at timestamptz default now(),
  unique(exam_id, student_id)
);

create table if not exists marks (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references exams(id),
  index_no text not null,
  marks numeric(5,2) not null,
  rank int,
  updated_at timestamptz default now(),
  unique(exam_id, index_no)
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  order_id text unique not null,
  student_id uuid references users(id),
  course_id uuid references courses(id),
  amount numeric(10,2),
  status text not null,
  gateway_payload jsonb,
  created_at timestamptz default now()
);

create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  target_role text,
  published_at timestamptz default now()
);

alter table users enable row level security;
alter table courses enable row level security;
alter table enrollments enable row level security;
alter table lessons enable row level security;
alter table exams enable row level security;
alter table questions enable row level security;
alter table exam_results enable row level security;
alter table marks enable row level security;
alter table payments enable row level security;
alter table announcements enable row level security;

create policy student_users_select on users for select using (auth.uid() = id);
create policy student_enrollment_select on enrollments for select using (student_id = auth.uid());
create policy lessons_paid_select on lessons for select using (
  exists (
    select 1 from enrollments e
    where e.course_id = lessons.course_id and e.student_id = auth.uid() and e.status = 'paid'
  ) and published = true
);
create policy student_marks_select on marks for select using (
  exists (
    select 1 from users u where u.id = auth.uid() and u.index_no = marks.index_no
  )
);
create policy student_payments_select on payments for select using (student_id = auth.uid());
