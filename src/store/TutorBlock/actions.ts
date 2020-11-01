import {
  SEARCH_POPUP,
  TutorBlockTypes,
  SORT_BY_AVAILABILITY,
  SORT_BY_REVIEWS,
  SET_TUTORS,
} from './types';
import { Tutor } from 'types/Tutor';

export function handleAdvancedSearchPopup(isOpen: boolean): TutorBlockTypes {
  return {
    type: SEARCH_POPUP,
    isOpen,
  };
}

export function sortByReview(order: number): TutorBlockTypes {
  return {
    type: SORT_BY_REVIEWS,
    order,
  };
}

export function sortByAvailability(order: number): TutorBlockTypes {
  return {
    type: SORT_BY_AVAILABILITY,
    order,
  };
}

export function setTutors(tutors: Array<Tutor>): TutorBlockTypes {
  return {
    type: SET_TUTORS,
    tutors,
  };
}
