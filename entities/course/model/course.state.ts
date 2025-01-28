import axios, { AxiosError } from 'axios';
import { atom } from 'jotai';
import { authAtom } from '@/entities/auth/model/auth.state';
import { API } from '../api/api';
import { CoursesResponse, StudentCourseDescription } from './course.model';

export const courseAtom = atom<CourseState>({
  courses: [],
  isLoading: false,
  error: null,
});

export const loadCourseAtom = atom(
  async (get) => get(courseAtom),
  async (get, set) => {
    const { access_token } = await get(authAtom);

    set(courseAtom, {
      courses: [],
      isLoading: true,
      error: null,
    });

    try {
      const { data } = await axios.get<CoursesResponse>(API.my, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      set(courseAtom, {
        courses: data.my,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        set(courseAtom, {
          courses: [],
          isLoading: false,
          error: error.response?.data.message,
        });
      }
    }
  },
);

export interface CourseState {
  courses: StudentCourseDescription[];
  isLoading: boolean;
  error: string | null;
}
