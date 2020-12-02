import React from 'react';
import {
  Typography,
  makeStyles,
  Icon,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import HeaderBar from './HeaderBar';
import PoliciesSVG from 'statics/policies.svg';
import { Course } from 'types/Course';
import { hideIfNoData } from 'helpers';

function PoliciesIcon(): JSX.Element {
  const { t: translator } = useTranslation();
  const { coursePolicies } = translations;

  return (
    <Icon style={{ fontSize: '3rem' }}>
      <img
        style={{ height: '100%' }}
        src={PoliciesSVG}
        alt={translator(coursePolicies.title)}
      />
    </Icon>
  );
}

type PolicyRowType = {
  title: string;
  condition: string;
  refund: string;
  allow: boolean;
};
function PolicyRow({
  title,
  condition,
  refund,
  allow,
}: PolicyRowType): JSX.Element {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell>
        <Typography component="p" className={classes.tableHead}>
          {title}
        </Typography>
        {!!condition && (
          <Typography component="p" variant="body2" color="textSecondary">
            {condition}
          </Typography>
        )}
        {!!refund && (
          <Typography component="p" variant="body2" color="textSecondary">
            {refund}
          </Typography>
        )}
      </TableCell>
      <TableCell>
        {allow && <CheckIcon className={classes.allowIcon} />}
      </TableCell>
      <TableCell>
        {!allow && <ClearIcon className={classes.notAllowIcon} />}
      </TableCell>
    </TableRow>
  );
}

type PoliciesType = {
  course: Course;
};
const checkProps = hideIfNoData(({ course }: PoliciesType) => !course);
function Policies({ course }: PoliciesType): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { coursePolicies } = translations;
  const { policies } = course;

  return (
    <>
      <HeaderBar
        title={translator(coursePolicies.title)}
        subTitle={translator(coursePolicies.subTitle)}
        Icon={<PoliciesIcon />}
      />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography component="span" className={classes.tableHead}>
                {translator(coursePolicies.table.policies)}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography component="span" className={classes.tableHead}>
                {translator(coursePolicies.table.allow)}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography component="span" className={classes.tableHead}>
                {translator(coursePolicies.table.notAllow)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(policies).map((policy, index) => {
            const condition =
              policies[policy].allow && policies[policy].condition
                ? translator(coursePolicies.policies[policy].condition, {
                    condition: policies[policy].condition,
                  })
                : '';
            const refund =
              policies[policy].allow && policies[policy].refundPercent
                ? translator(coursePolicies.policies.refund, {
                    refund: policies[policy].refundPercent,
                  })
                : '';

            return (
              <PolicyRow
                key={index}
                title={translator(coursePolicies.policies[policy].name)}
                condition={condition}
                refund={refund}
                allow={policies[policy].allow}
              />
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default checkProps(Policies);

const useStyles = makeStyles(theme => ({
  table: {
    backgroundColor: theme.palette.background.white,
  },
  tableHead: {
    fontWeight: 700,
  },
  allowIcon: {
    color: '#02B940',
  },
  notAllowIcon: {
    color: '#FF5440',
  },
}));
