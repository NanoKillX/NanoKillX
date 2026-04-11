export type UserRole = 'admin' | 'student' | 'parent';

export interface AppUser {
  id: string;
  email: string;
  full_name: string;
  index_no?: string;
  role: UserRole;
  parent_user_id?: string;
}
