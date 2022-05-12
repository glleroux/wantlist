import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
} from '@mantine/core';

import { BoxMultiple, Playlist, Road } from 'tabler-icons-react';
import NavItemMantine from './NavItemMantine';
import User from './UserMantine';
import { ReactComponent as LogoIcon } from '../../logo.svg';

const AppShellMantine = ({ children }) => {

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    return (
        <AppShell
        styles={{
            main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        navbar={
            <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                <Navbar.Section grow mt="md">
                    <NavItemMantine icon={<Playlist size={16}/>} label='Wantlist'/> 
                    <NavItemMantine icon={<BoxMultiple size={16}/>} label='Head To Head'/> 
                    <NavItemMantine icon={<Road size={16}/>} label='Purchase Plan'/> 
                </Navbar.Section>
                <Navbar.Section>
                    <User/>
                </Navbar.Section>
            </Navbar>
        }
        header={
            <Header height={70} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                />
                </MediaQuery>
                <Group spacing='sm'>
                    <LogoIcon className='logo'/>
                    <Text 
                        color={theme.colorScheme === 'dark' ? '#fff' : '#000'}
                        style={{
                            'fontWeight': 'bold',
                            'fontSize': '20px',
                            'letterSpacing': '0.15em',
                            'fontFamily': 'Kanit'
                        }}
                    >
                        VINYLIST</Text>  
                </Group>
            </div>
            </Header>
        }
        >
        {children}
        </AppShell>
  );
}

export default AppShellMantine