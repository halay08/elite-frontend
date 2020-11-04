import React, { useCallback, useMemo } from 'react';
import {
  Card,
  CardHeader,
  makeStyles,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  Collapse,
  Grid,
} from '@material-ui/core';
import {
  MoreVert as MoreVertIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@material-ui/icons';
import UserAvatar from '../Avatar/Avatar';
import logo from 'statics/logo.svg';
import { Tutor, IExpertise } from 'types/Tutor';
import isEmpty from 'ramda.isempty';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { getUserName } from 'helpers';

type CardContentRơwProps = {
  title: string;
  content: JSX.Element;
};

function CardContentRow({ title, content }: CardContentRơwProps): JSX.Element {
  return (
    <Grid container direction="row">
      <Grid item xs={4}>
        <Typography color="textSecondary" component="p">
          {title}:
        </Typography>
      </Grid>
      <Grid container item xs={8}>
        {content}
      </Grid>
    </Grid>
  );
}

type ExpertiseBlockProps = {
  expertises: IExpertise[];
};
function ExpertiseBlock({ expertises }: ExpertiseBlockProps): JSX.Element {
  const { tutorThumbnail } = translations;
  const { t: translator } = useTranslation();
  const [expanded, setExpanded] = React.useState(false);
  const formattedExpertise = useMemo(
    () => expertises.map(({ name, level }) => `${name} ${level}`),
    [expertises],
  );

  const [first, second, ...rest] = formattedExpertise;

  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <>
      <Typography component="p">{first}</Typography>
      <Typography component="p">{second}</Typography>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {rest.map(expertise => (
          <Typography component="p">{expertise}</Typography>
        ))}
      </Collapse>
      {!isEmpty(rest) && (
        <Typography
          color="primary"
          component="span"
          onClick={handleExpandClick}
        >
          {translator(
            expanded
              ? tutorThumbnail.expertise.expand
              : tutorThumbnail.expertise.collapse,
          )}
        </Typography>
      )}
    </>
  );
}

type ReviewBlockProps = {
  reviews?: number;
};
function ReviewBlock({ reviews }: ReviewBlockProps): JSX.Element {
  const { tutorThumbnail } = translations;
  const { t: translator } = useTranslation();
  const classes = useStyle();
  return (
    <>
      {reviews ? (
        <StarIcon fontSize="small" color="primary" />
      ) : (
        <StarBorderIcon fontSize="small" color="primary" />
      )}
      <Typography className={classes.reviews} component="span">
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
  const { country, expertises, category, reviews } = tutor;
  const name = getUserName(tutor);

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={logo} />
      <CardHeader
        className={classes.header}
        avatar={<UserAvatar size={7} user={tutor} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={`Country: ${country.name}`}
      />
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <CardContentRow
              title={translator(tutorThumbnail.category)}
              content={<Typography>{category.name}</Typography>}
            />
          </Grid>
          <Grid item>
            <CardContentRow
              title={translator(tutorThumbnail.expertise.title)}
              content={<ExpertiseBlock expertises={expertises} />}
            />
          </Grid>
          <Grid item>
            <CardContentRow
              title={translator(tutorThumbnail.reviews.title)}
              content={<ReviewBlock reviews={reviews} />}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const useStyle = makeStyles(theme => ({
  root: {},
  header: {
    backgroundColor: theme.palette.background.default,
  },
  media: {
    backgroundSize: 'contain',
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  reviews: {
    fontWeight: 700,
  },
}));
