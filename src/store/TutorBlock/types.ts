import { Tutor } from 'types/Tutor';

export const SEARCH_POPUP = 'SEARCH_POPUP';
export const SORT_BY_AVAILABILITY = 'SORT_BY_AVAILABILITY';
export const SORT_BY_REVIEWS = 'SORT_BY_REVIEWS';
export const SET_TUTORS = 'SET_TUTORS';

enum order {
  DEC = -1,
  NONE,
  INC,
}

interface SearchPopupAction {
  type: typeof SEARCH_POPUP;
  isOpen: boolean;
}

interface SortByAvailabilityAction {
  type: typeof SORT_BY_AVAILABILITY;
  order: order;
}

interface SortByReviewsAction {
  type: typeof SORT_BY_REVIEWS;
  order: order;
}

interface SetTutorsAction {
  type: typeof SET_TUTORS;
  tutors: Array<Tutor>;
}

export interface TutorBlockState {
  isOpenSearchPopup: boolean;
  tutors: Array<Tutor>;
}

export type TutorBlockTypes =
  | SearchPopupAction
  | SortByAvailabilityAction
  | SortByReviewsAction
  | SetTutorsAction;
