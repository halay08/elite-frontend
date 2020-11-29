import React, {
  useState,
  useEffect,
  useCallback,
  EventHandler,
  SyntheticEvent,
} from 'react';
import HeaderBar from './HeaderBar';
import { Tutor } from 'types/Tutor';
import { TutorService } from 'services';
import TutorThumbnail from './TutorThumbnail';
import { Grid, Chip, makeStyles, Grow } from '@material-ui/core';
import SortBar from './SortBar';
import { connect } from 'react-redux';
import { State } from 'store/configureStore';
import { setTutors } from 'store/TutorBlock/actions';
import VideoPopup from './VideoPopup';

const mapStateToProps = (state: State) => ({
  tutors: state.tutorBlockReducer.tutors,
});

const mapDispatchToProps = dispatch => ({
  setTutors: tutors => dispatch(setTutors(tutors)),
});

type TutorBlockType = {
  tutors: Array<Tutor>;
  setTutors: Function;
};
function TutorBlock({ tutors, setTutors }: TutorBlockType): JSX.Element {
  const classes = useStyle();
  const [chips, setChips] = useState<Array<string>>([]);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  const handleClosePopup = () => setIsOpenPopup(false);

  const handleDelete = (chip): EventHandler<SyntheticEvent> => () => {
    const newChips = chip ? chips.filter(c => c !== chip) : [];
    setChips(newChips);
  };

  useEffect(() => {
    (async () => {
      setTutors([]);

      const recommendedTutors = await TutorService.getRecommendedTutors();
      setTutors(recommendedTutors);
    })();
  }, [setTutors]);

  const handleFilterOnline = useCallback(
    async (isOnline: boolean): Promise<void> => {
      setTutors([]);

      if (!isOnline) {
        const allTutors = await TutorService.getAllTutors();
        setTutors(allTutors);

        setChips(preState => preState.filter(c => c !== 'online'));
        return;
      }

      const onlineTutors = await TutorService.getOnlineTutors();
      setTutors(onlineTutors);

      setChips(preState => ['online', ...preState]);
    },
    [setTutors],
  );

  const handleFilter = useCallback(
    async (data: object) => {
      const newChips = Object.values(data).filter(value => value !== 'all');
      if (newChips.length) {
        setChips(['', ...newChips]);
        setTutors([]);

        const allTutors = await TutorService.search(data);
        setTutors(allTutors);
      }
    },
    [setTutors],
  );

  return (
    <>
      <VideoPopup
        isOpen={isOpenPopup}
        handleClose={handleClosePopup}
        tutor={selectedTutor}
      />
      <HeaderBar tutors={tutors} />
      <SortBar handleFilter={handleFilter} filterOnline={handleFilterOnline} />
      {!!chips.length && (
        <div className={classes.chipsBar}>
          {chips.map((chip, index) => (
            <Chip
              key={index}
              label={chip}
              color="primary"
              onDelete={handleDelete(chip)}
            />
          ))}
        </div>
      )}
      <Grid container direction="row" spacing={4} className={classes.container}>
        {tutors.map((tutor, index) => (
          <Grow key={index} in={true} timeout={1000}>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              onClick={() => {
                setSelectedTutor(tutor);
                setIsOpenPopup(true);
              }}
            >
              <TutorThumbnail tutor={tutor} />
            </Grid>
          </Grow>
        ))}
      </Grid>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorBlock);

const useStyle = makeStyles(theme => ({
  container: {
    width: '100%',
    margin: 0,
    border: `1px solid ${theme.palette.background.table}`,
    backgroundColor: '#F9FBFF',
  },
  chipsBar: {
    marginBottom: theme.spacing(2),
  },
}));
