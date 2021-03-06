import React from 'react';
import { DEFAULT_VIDEO_CONSTRAINTS } from '../../../constants';
import { fireEvent, render } from '@testing-library/react';
import FlipCameraButton from './FlipCameraButton';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { useVideoInputDevices } from '../../../hooks/deviceHooks/deviceHooks';

jest.mock('../../../hooks/useMediaStreamTrack/useMediaStreamTrack');
jest.mock('../../../hooks/useVideoContext/useVideoContext');
jest.mock('../../../hooks/deviceHooks/deviceHooks');
const mockUserVideoContext = useVideoContext as jest.Mock<any>;
const mockUseVideoInputDevices = useVideoInputDevices as jest.Mock<any>;

const mockStreamSettings = { facingMode: 'user' };

const mockVideoTrack = {
  name: 'camera',
  mediaStreamTrack: {
    getSettings: () => mockStreamSettings,
  },
  restart: jest.fn(),
};

const mockVideoContext = {
  localTracks: [mockVideoTrack],
  getLocalVideoTrack: jest.fn(() => Promise.resolve('newMockTrack')),
};

describe('the FlipCameraButton', () => {
  beforeEach(jest.clearAllMocks);
  beforeEach(() => {
    mockUseVideoInputDevices.mockImplementation(() => [
      'mockCamera1',
      'mockCamera2',
    ]);
  });

  it('should render a button when a video track exists and has the facingMode setting', () => {
    mockUserVideoContext.mockImplementation(() => mockVideoContext);
    const { container } = render(<FlipCameraButton />);
    expect(container.querySelector('button')).toBeTruthy();
  });

  it('not render a button when the video track does not have the facingMode setting', () => {
    mockUserVideoContext.mockImplementation(() => ({
      ...mockVideoContext,
      localTracks: [
        {
          ...mockVideoTrack,
          mediaStreamTrack: {
            getSettings: () => ({}),
          },
        },
      ],
    }));
    const { container } = render(<FlipCameraButton />);
    expect(container.querySelector('button')).not.toBeTruthy();
  });

  it('should not render a button when no video track is present', () => {
    mockUserVideoContext.mockImplementation(() => ({
      ...mockVideoContext,
      localTracks: [],
    }));
    const { container } = render(<FlipCameraButton />);
    expect(container.querySelector('button')).not.toBeTruthy();
  });

  it('should not render a button when there are less than two video input devices', () => {
    mockUserVideoContext.mockImplementation(() => mockVideoContext);
    mockUseVideoInputDevices.mockImplementation(() => ['mockCamera1']);
    const { container } = render(<FlipCameraButton />);
    expect(container.querySelector('button')).not.toBeTruthy();
  });

  it('should call track.replace() with the correct facing mode when clicked', async () => {
    mockUserVideoContext.mockImplementation(() => ({
      ...mockVideoContext,
      localTracks: [
        {
          ...mockVideoTrack,
          mediaStreamTrack: {
            getSettings: () => ({ facingMode: 'environment' }),
          },
        },
      ],
    }));
    const { container } = render(<FlipCameraButton />);
    fireEvent.click(container.querySelector('button')!);
    expect(mockVideoTrack.restart).toHaveBeenCalledWith({
      ...(DEFAULT_VIDEO_CONSTRAINTS as {}),
      facingMode: 'user',
    });
  });
});
