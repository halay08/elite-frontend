import React, {
  useState,
  useEffect,
  useCallback,
  EventHandler,
  SyntheticEvent,
} from 'react';
import ToptipBanner from './ToptipBanner';
import RecommendBar from './RecommendBar';
import { Tutor } from 'types/Tutor';
import { TutorService } from 'services';
import TutorThumbnail from './TutorThumbnail';
import { translations } from 'locales/i18n';
import { Grid, Chip, makeStyles, Grow } from '@material-ui/core';
import AdvancedSearch from './AdvancedSearch';
import SortBar from './SortBar';
import { connect } from 'react-redux';
import { State } from 'store/configureStore';
import { setTutors, handleAdvancedSearchPopup } from 'store/TutorBlock/actions';

const mapStateToProps = (state: State) => ({
  tutors: state.tutorBlockReducer.tutors,
});

const mapDispatchToProps = dispatch => ({
  setTutors: tutors => dispatch(setTutors(tutors)),
  handlePopup: isOpen => dispatch(handleAdvancedSearchPopup(isOpen)),
});

type TutorBlockType = {
  tutors: Array<Tutor>;
  setTutors: Function;
  handlePopup: Function;
};
function TutorBlock({
  tutors,
  setTutors,
  handlePopup,
}: TutorBlockType): JSX.Element {
  const classes = useStyle();
  const { recommendedBar, availableBar } = translations;
  const [barText, setBarText] = useState<object>(recommendedBar);
  const [chips, setChips] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
      setTutors([]);

      const recommendedTutors = await TutorService.getRecommendedTutors();
      setTutors(recommendedTutors);
    })();
  }, [setTutors]);

  const getOnlineTutors = useCallback(async (): Promise<void> => {
    setTutors([]);

    const onlineTutors = await TutorService.getOnlineTutors();
    setTutors(onlineTutors);
    setBarText(availableBar);
  }, [availableBar, setTutors]);

  const getAll = useCallback(async (): Promise<void> => {
    setTutors([]);

    const allTutors = await TutorService.getAllTutors();
    setTutors(allTutors);
    setBarText(availableBar);
  }, [availableBar, setTutors]);

  const handleAdvancedSearch = useCallback(
    async (data: object) => {
      handlePopup(false);
      const newChips = Object.values(data).filter(value => value !== 'all');
      if (newChips.length) {
        setChips(['', ...newChips]);
        setTutors([]);

        const allTutors = await TutorService.search(data);
        setTutors(allTutors);
      }
    },
    [handlePopup, setTutors],
  );

  const handleDelete = (chip): EventHandler<SyntheticEvent> => () => {
    const newChips = chip ? chips.filter(c => c !== chip) : [];
    setChips(newChips);
  };

  return (
    <>
      <ToptipBanner handleGetAll={getAll} />
      <RecommendBar
        tutors={tutors}
        text={barText}
        handleGetOnline={getOnlineTutors}
      />
      <SortBar />
      <div>
        {chips.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            color="primary"
            onDelete={handleDelete(chip)}
          />
        ))}
      </div>
      <Grid container direction="row" spacing={3} className={classes.container}>
        {tutors.map((tutor, index) => (
          <Grow key={index} in={true} timeout={1000}>
            <Grid item xs={4}>
              <TutorThumbnail tutor={tutor} />
            </Grid>
          </Grow>
        ))}
      </Grid>
      <AdvancedSearch onSubmit={handleAdvancedSearch} />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorBlock);

const useStyle = makeStyles(theme => ({
  container: {
    width: '100%',
    margin: 0,
  },
}));
