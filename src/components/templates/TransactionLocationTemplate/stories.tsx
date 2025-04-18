import type { Meta, StoryObj } from '@storybook/react';
import { NavermapsProvider } from 'react-naver-maps';
import { LocationErrorCode } from 'types';
import { TransactionLocationTemplate } from '.';

const meta: Meta<typeof TransactionLocationTemplate> = {
  title: 'Templates/TransactionLocationTemplate',
  component: TransactionLocationTemplate,
  tags: ['autodocs'],
  argTypes: {
    coord: {
      control: {
        type: 'object',
      },
      defaultValue: {
        lat: 37.5666805,
        lng: 126.9784147,
      },
      description: '좌표 (위도, 경도)',
    },
    location: {
      control: 'text',
    },
  },
  decorators: (story) => (
    <NavermapsProvider ncpClientId={import.meta.env.VITE_NAVER_MAP_CLIENT_ID}>
      <div style={{ maxWidth: '375px', height: '600px', display: 'flex' }}>
        {story()}
      </div>
    </NavermapsProvider>
  ),
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    coord: {
      lat: 37.5666805,
      lng: 126.9784147,
    },
    location: '보라매공원 CU',
    locationErrorEvent: (errorCode: LocationErrorCode) =>
      console.log(errorCode),
  },
};
export default meta;
