import React, { useCallback } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

import { inputLabels, Settings } from '../../state/settings/settingsReducer';
import { RenderDimensions } from '../../state/settings/renderDimensions';
import { useAppState } from '../../state';
import useRoomState from '../../hooks/useRoomState/useRoomState';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '600px',
    minHeight: '400px',
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100vw - 32px)',
    },
    '& .inputSelect': {
      width: 'calc(100% - 35px)',
    },
  },
  button: {
    float: 'right',
  },
  paper: {
    [theme.breakpoints.down('xs')]: {
      margin: '16px',
    },
  },
  formControl: {
    display: 'block',
    margin: '1.5em 0',
    '&:first-child': {
      margin: '0 0 1.5em 0',
    },
  },
  label: {
    width: '133%', // Labels have scale(0.75) applied to them, so this effectively makes the width 100%
  },
}));

const withDefault = (val?: string) =>
  typeof val === 'undefined' ? 'default' : val;

const RenderDimensionItems = RenderDimensions.map(({ label, value }) => (
  <MenuItem value={value} key={value}>
    {label}
  </MenuItem>
));

export default function ConnectionOptionsDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const classes = useStyles();
  const { settings, dispatchSetting } = useAppState();
  const roomState = useRoomState();
  const isDisabled = roomState !== 'disconnected';

  const { t: translator } = useTranslation();
  const { connectionOptions: t } = translations.room;

  const handleChange = useCallback(
    (e: React.ChangeEvent<{ value: unknown; name?: string }>) => {
      dispatchSetting({
        name: e.target.name as keyof Settings,
        value: e.target.value as string,
      });
    },
    [dispatchSetting],
  );

  const handleNumberChange = useCallback(
    (e: React.ChangeEvent<{ value: unknown; name?: string }>) => {
      if (!/[^\d]/.test(e.target.value as string)) handleChange(e);
    },
    [handleChange],
  );

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
      <DialogTitle>{translator(t.connectionSettings)}</DialogTitle>
      <Divider />
      <DialogContent className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography hidden={!isDisabled} variant="body2">
              {translator(t.settingsCannotChange)}
            </Typography>
          </Grid>

          <Grid item sm={6} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id={inputLabels.dominantSpeakerPriority}>
                {translator(t.dominantSpeaker)}:
              </InputLabel>
              <Select
                fullWidth
                disabled={isDisabled}
                name={inputLabels.dominantSpeakerPriority}
                label={inputLabels.dominantSpeakerPriority}
                value={withDefault(settings.dominantSpeakerPriority)}
                onChange={handleChange}
              >
                <MenuItem value="low">
                  {translator(t.dominantSpeakerOptions.low)}
                </MenuItem>
                <MenuItem value="standard">
                  {translator(t.dominantSpeakerOptions.standard)}
                </MenuItem>
                <MenuItem value="high">
                  {translator(t.dominantSpeakerOptions.high)}
                </MenuItem>
                <MenuItem value="default">
                  {translator(t.dominantSpeakerOptions.default)}
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel id={inputLabels.trackSwitchOffMode}>
                {translator(t.trackSwitchOffMode)}:
              </InputLabel>
              <Select
                fullWidth
                disabled={isDisabled}
                name={inputLabels.trackSwitchOffMode}
                label={inputLabels.trackSwitchOffMode}
                value={withDefault(settings.trackSwitchOffMode)}
                onChange={handleChange}
              >
                <MenuItem value="predicted">
                  {translator(t.trackSwitchOffModeOptions.predicted)}
                </MenuItem>
                <MenuItem value="detected">
                  {translator(t.trackSwitchOffModeOptions.detected)}
                </MenuItem>
                <MenuItem value="disabled">
                  {translator(t.trackSwitchOffModeOptions.disabled)}
                </MenuItem>
                <MenuItem value="default">
                  {translator(t.trackSwitchOffModeOptions.default)}
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel id={inputLabels.bandwidthProfileMode}>
                {translator(t.bandwidthProfileMode)}:
              </InputLabel>
              <Select
                fullWidth
                disabled={isDisabled}
                name={inputLabels.bandwidthProfileMode}
                label={inputLabels.bandwidthProfileMode}
                value={withDefault(settings.bandwidthProfileMode)}
                onChange={handleChange}
              >
                <MenuItem value="grid">
                  {translator(t.bandwidthProfileModeOptions.grid)}
                </MenuItem>
                <MenuItem value="collaboration">
                  {translator(t.bandwidthProfileModeOptions.collaboration)}
                </MenuItem>
                <MenuItem value="presentation">
                  {translator(t.bandwidthProfileModeOptions.presentation)}
                </MenuItem>
                <MenuItem value="default">
                  {translator(t.bandwidthProfileModeOptions.default)}
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <TextField
                disabled={isDisabled}
                fullWidth
                id={inputLabels.maxTracks}
                label={translator(t.maxTracks)}
                placeholder={translator(t.leaveBlank)}
                name={inputLabels.maxTracks}
                value={withDefault(settings.maxTracks)}
                onChange={handleNumberChange}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <TextField
                disabled={isDisabled}
                fullWidth
                id={inputLabels.maxAudioBitrate}
                label={translator(t.maxAudioBitrate)}
                placeholder={translator(t.leaveBlank)}
                name={inputLabels.maxAudioBitrate}
                value={withDefault(settings.maxAudioBitrate)}
                onChange={handleNumberChange}
              />
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel
                id={inputLabels.renderDimensionLow}
                className={classes.label}
              >
                {translator(t.renderDimensionLow)}:
              </InputLabel>
              <Select
                fullWidth
                disabled={isDisabled}
                name={inputLabels.renderDimensionLow}
                label={inputLabels.renderDimensionLow}
                value={withDefault(settings.renderDimensionLow)}
                onChange={handleChange}
              >
                {RenderDimensionItems}
              </Select>
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
              <InputLabel
                id={inputLabels.renderDimensionStandard}
                className={classes.label}
              >
                {translator(t.renderDimensionStandard)}:
              </InputLabel>
              <Select
                fullWidth
                disabled={isDisabled}
                name={inputLabels.renderDimensionStandard}
                label={inputLabels.renderDimensionStandard}
                value={withDefault(settings.renderDimensionStandard)}
                onChange={handleChange}
              >
                {RenderDimensionItems}
              </Select>
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
              <InputLabel
                id={inputLabels.renderDimensionHigh}
                className={classes.label}
              >
                {translator(t.renderDimensionHigh)}:
              </InputLabel>
              <Select
                fullWidth
                disabled={isDisabled}
                name={inputLabels.renderDimensionHigh}
                label={inputLabels.renderDimensionHigh}
                value={withDefault(settings.renderDimensionHigh)}
                onChange={handleChange}
              >
                {RenderDimensionItems}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={onClose}
        >
          {translator(t.doneButton)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
