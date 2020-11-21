import React, { useMemo } from 'react';
import {
  Card,
  CardHeader,
  makeStyles,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import {
  Stars as StarsIcon,
  StarBorder as StarBorderIcon,
} from '@material-ui/icons';
import UserAvatar from '../Avatar/Avatar';
import logo from 'statics/logo.svg';
import { Tutor } from 'types/Tutor';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { getUserName } from 'helpers';
import { ReactComponent as CartSVG } from 'statics/shopping-bag.svg';
import { ReactComponent as PlayIcon } from 'statics/play-arrow.svg';
import { Favorite as FavoriteIcon } from '@material-ui/icons';
import { generateFontSize } from 'styles/theme';

type CardContentRơwProps = {
  title: string;
  content: JSX.Element;
};

function CardContentRow({ title, content }: CardContentRơwProps): JSX.Element {
  return (
    <Grid container direction="row">
      <Grid item xs={4}>
        <Typography component="p" variant="body2" style={{ fontWeight: 700 }}>
          {title}:
        </Typography>
      </Grid>
      <Grid container item xs={8} alignItems="center">
        {content}
      </Grid>
    </Grid>
  );
}

type ReviewBlockProps = {
  reviews?: number;
};
function ReviewBlock({ reviews }: ReviewBlockProps): JSX.Element {
  const classes = useStyle();
  const { tutorThumbnail } = translations;
  const { t: translator } = useTranslation();
  return (
    <>
      {reviews ? (
        <StarsIcon className={classes.starIcon} />
      ) : (
        <StarBorderIcon className={classes.starIcon} />
      )}
      <Typography component="p" variant="body2" color="textSecondary">
        {reviews
          ? translator(tutorThumbnail.reviews.review, { reviews })
          : translator(tutorThumbnail.reviews.noReview)}
      </Typography>
    </>
  );
}

type TutorThumbnailType = {
  tutor: Tutor;
};
export default function TutorThumbnail({
  tutor,
}: TutorThumbnailType): JSX.Element {
  const { tutorThumbnail } = translations;
  const { t: translator } = useTranslation();
  const classes = useStyle();
  const { expertises, category, reviews } = tutor;
  const name = getUserName(tutor);
  const formattedExpertise = useMemo(
    () => expertises.map(({ name }) => name).join(', '),
    [expertises],
  );

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={logo}>
        <div className={classes.overlay}>
          <Grid container justify="space-between">
            <Grid item className={classes.overlayReview}>
              <StarsIcon /> {reviews}
            </Grid>
            <FavoriteIcon />
          </Grid>
          <PlayIcon fill="white" className={classes.playIcon} />
        </div>
      </CardMedia>
      <CardHeader
        className={classes.header}
        avatar={<UserAvatar size={7} user={tutor} />}
        title={
          <Typography component="p" color="primary">
            {name}
          </Typography>
        }
        subheader={
          <Typography
            component="span"
            variant="subtitle1"
            className={classes.subHeader}
          >
            {category.name}
          </Typography>
        }
      />
      <CardContent>
        <Grid
          container
          direction="column"
          spacing={1}
          style={{ flexWrap: 'nowrap' }}
        >
          <Grid item>
            <CardContentRow
              title={translator(tutorThumbnail.category)}
              content={
                <Typography component="p" variant="body2" color="textSecondary">
                  {category.name}
                </Typography>
              }
            />
          </Grid>
          <Grid item>
            <CardContentRow
              title={translator(tutorThumbnail.expertise.title)}
              content={
                <Typography component="p" variant="body2" color="textSecondary">
                  {formattedExpertise}
                </Typography>
              }
            />
          </Grid>
          <Grid item>
            <CardContentRow
              title={translator(tutorThumbnail.reviews.title)}
              content={<ReviewBlock reviews={reviews} />}
            />
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.bookButton}
          >
            <CartSVG />
            <Typography component="span" className={classes.buttonLabel}>
              {translator(tutorThumbnail.bookButton)}
            </Typography>
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
}

const useStyle = makeStyles(theme => ({
  root: {},
  header: {
    backgroundColor: theme.palette.background.light,
  },
  subHeader: {
    ...generateFontSize(7, 10, 13),
  },
  media: {
    backgroundSize: 'contain',
    height: 0,
    paddingTop: '56.25%', // 16:9
    position: 'relative',
  },
  bookButton: {
    borderRadius: theme.spacing(4),
    width: 'fit-content',
    margin: `16px auto 0`,
    padding: `8px 20px`,
  },
  buttonLabel: {
    marginLeft: theme.spacing(1),
    textTransform: 'uppercase',
    fontWeight: 700,
  },
  starIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  overlay: {
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, .6)',
    position: 'absolute',
    top: 0,
    padding: 12,
    color: 'white',

    '& .MuiSvgIcon-root': {
      fontSize: 18,
      verticalAlign: 'text-bottom',
    },
  },
  overlayReview: {
    backgroundColor: theme.palette.primary.main,
    padding: '4px 8px',
    borderRadius: theme.spacing(4),
  },
  playIcon: {
    height: 40,
    width: '100%',
    marginTop: '12%',
  },
}));
