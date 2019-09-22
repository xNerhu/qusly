import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { Button } from '~/renderer/components/Button';
import { Dropdown, DropdownItem } from '~/renderer/components/Dropdown';
import { DialogContainer, } from '..';
import { Title, Content, Buttons, DialogButton } from '../style';
import { Input, Row } from './style';

export const AddSite = observer(() => {
  return (
    <DialogContainer content='add-site'>
      <Title>New site</Title>
      <Content>
        <Input placeholder='Title (optional)' />
        <Row>
          <Dropdown defaultValue='sftp' style={{ width: '100%' }}>
            <DropdownItem value='ftp'>FTP</DropdownItem>
            <DropdownItem value='ftps'>FTPS</DropdownItem>
            <DropdownItem value='sftp'>SFTP</DropdownItem>
          </Dropdown>
          <Input placeholder='Port (optional)' style={{ marginLeft: 16, marginTop: 0 }} />
        </Row>
        <Input placeholder='Hostname' />
        <Input placeholder='Username' />
        <Input placeholder='Password' />
      </Content>
      <Buttons>
        <DialogButton label='Cancel' background='rgba(0, 0, 0, 0.08)' color='#000' />
        <DialogButton label='Add' disabled />
      </Buttons>
    </DialogContainer>
  );
});
