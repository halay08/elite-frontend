import React from 'react';
import { mount, shallow } from 'enzyme';
import useScreenShareParticipant from '../../../hooks/useScreenShareParticipant/useScreenShareParticipant';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import ScreenShareIcon from '../../../icons/ScreenShareIcon';
import { Button, Tooltip } from '@material-ui/core';
import ToggleScreenShareButton from './ToggleScreenShareButton';

const SCREEN_SHARE_TEXT = 'Share Screen';
const STOP_SCREEN_SHARE_TEXT = 'Stop Sharing Screen';
const SHARE_IN_PROGRESS_TEXT =
  'Cannot share screen when another user is sharing';
const SHARE_NOT_SUPPORTED_TEXT =
  'Screen sharing is not supported with this browser';

jest.mock('../../../hooks/useScreenShareParticipant/useScreenShareParticipant');
jest.mock('../../../hooks/useVideoContext/useVideoContext');

const mockUseScreenShareParticipant = useScreenShareParticipant as jest.Mock<
  any
>;
const mockUseVideoContext = useVideoContext as jest.Mock<any>;

const mockToggleScreenShare = jest.fn();
mockUseVideoContext.mockImplementation(() => ({
  toggleScreenShare: mockToggleScreenShare,
}));

Object.defineProperty(navigator, 'mediaDevices', {
  value: {
    getDisplayMedia: () => {},
  },
  configurable: true,
});

describe('the ToggleScreenShareButton component', () => {
  it('should render correctly when screenSharing is allowed', () => {
    const wrapper = mount(<ToggleScreenShareButton />);
    expect(wrapper.find(ScreenShareIcon).exists()).toBe(true);
    expect(wrapper.text()).toBe(SCREEN_SHARE_TEXT);
  });

  it('should render correctly when another user is sharing their screen', () => {
    mockUseScreenShareParticipant.mockImplementationOnce(
      () => 'mockParticipant',
    );
    const wrapper = mount(<ToggleScreenShareButton />);
    expect(wrapper.find(Button).prop('disabled')).toBe(true);
    expect(wrapper.find(Tooltip).prop('title')).toBe(SHARE_IN_PROGRESS_TEXT);
  });

  it('should call the correct toggle function when clicked', () => {
    const wrapper = shallow(<ToggleScreenShareButton />);
    wrapper.find(Button).simulate('click');
    expect(mockToggleScreenShare).toHaveBeenCalled();
  });

  it('should render the screenshare button with the correct messaging if screensharing is not supported', () => {
    Object.defineProperty(navigator, 'mediaDevices', {
      value: { getDisplayMedia: undefined },
    });
    const wrapper = mount(<ToggleScreenShareButton />);
    expect(wrapper.find(Button).prop('disabled')).toBe(true);
    expect(wrapper.find(Tooltip).prop('title')).toBe(SHARE_NOT_SUPPORTED_TEXT);
  });
});
