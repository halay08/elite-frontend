import {
  TutorBlockState,
  TutorBlockTypes,
  SEARCH_POPUP,
  SORT_BY_REVIEWS,
  SORT_BY_AVAILABILITY,
  SET_TUTORS,
} from './types';

const initialState: TutorBlockState = {
  isOpenSearchPopup: false,
  tutors: [],
};

export function tutorBlockReducer(
  state = initialState,
  action: TutorBlockTypes,
): TutorBlockState {
  switch (action.type) {
    case SEARCH_POPUP:
      return {
        ...state,
        isOpenSearchPopup: action.isOpen,
      };

    case SORT_BY_REVIEWS:
      const sortByReviews = [...state.tutors];
      sortByReviews.sort(function (a, b) {
        return action.order * ((a.reviews || 0) - (b.reviews || 0));
      });
      return {
        ...state,
        tutors: sortByReviews,
      };

    case SORT_BY_AVAILABILITY:
      const sortByAvailability = [...state.tutors];
      return {
        ...state,
        tutors: sortByAvailability,
      };

    case SET_TUTORS:
      return {
        ...state,
        tutors: action.tutors,
      };

    default:
      return state;
  }
}
