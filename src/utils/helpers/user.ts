const MAX_STARS_DISPLAY = 100;

const getDisplayStars = (stars: number): number | string => {
  return stars <= MAX_STARS_DISPLAY ? stars : '100+';
};

const getShortDisplayName = (name: string, surname: string): string => {
  return surname ? `${name} ${surname[0]}.` : name;
};

export { getDisplayStars, getShortDisplayName };
