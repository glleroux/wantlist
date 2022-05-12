import AppShellMantine from './AppShellMantine';
import { Group, Image, Stack, Text, Button, TextInput } from '@mantine/core';
import { Search, Coin } from 'tabler-icons-react';
import { useState } from 'react';

import getWantlistPrices from '../../utils/getWantlistPrices';

const WantlistTextMantine = ({children, weight, style}) => {

    return (

    <Text
        style={style}
        sx={(theme) => ({
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black, 
                fontWeight: weight || 'regular',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                fontSize: 14
            })
        } 
    >
        {children}
    </Text>
    )
}

const WantlistRowMantine = ({ release, rank }) => {

    const cleanArtistName = (name) => name.split(/(\(\d+\))/)[0].trim()

    return (
        <Group
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
                '&:hover': {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
                },
            })}
        >
            <Image
                style={{'marginLeft': 0, 'marginRight': 0, flexGrow: 0}}
                width={60}
                height={60}
                src={release.basic_information.cover_image}
            />
            <Stack 
                spacing={4}
                style={{width: '25%'}}
            >
                {/* MAKE A CUSTOM TEXT COMPONENT WITH COLOR HANDLED */}
                <WantlistTextMantine weight='bold'>{release.basic_information.title}</WantlistTextMantine>
                <WantlistTextMantine>{cleanArtistName(release.basic_information.artists[0].name)}</WantlistTextMantine>
            </Stack>
            <WantlistTextMantine style={{flexGrow: 1}}>{release.basic_information.year}</WantlistTextMantine>
            <WantlistTextMantine style={{flexGrow: 1}}>{rank}</WantlistTextMantine>
            <WantlistTextMantine style={{flexGrow: 1}}>{release.price || 'none'}</WantlistTextMantine>
            {/* to remove */}
            <WantlistTextMantine style={{flexGrow: 1}}>{(release.price * rank).toFixed(0) || 'none'}</WantlistTextMantine>
        </Group>
    )
}

const WantlistHeaderMantine = () => {

    return (
        <Group
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
                height: '30px',
            })}
            >
            {/* <div
                sx={(theme) => ({
                    '&:hover': {
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
                    }
                })}
            >
            </div> */}
            <div style={{width: 80}}></div>
            <WantlistTextMantine style={{width: '25%', fontSize: 12}}>Title/Artist</WantlistTextMantine>
            <WantlistTextMantine style={{flexGrow: 1, fontSize: 12}}>Year</WantlistTextMantine>
            <WantlistTextMantine style={{flexGrow: 1, fontSize: 12}}>Vrank</WantlistTextMantine>
            <WantlistTextMantine style={{flexGrow: 1, fontSize: 12}}>Price</WantlistTextMantine>
        </Group>
    )
}

const FetchPriceButton = ({ wantlist, pricesFetching, handleFetch }) => {
    
    const fetchTime = wantlist.length/60 > 1 ? `${wantlist.length/60} mins` : '<1 min'

    return (
        <Button
            leftIcon={<Coin size={18}/>}  
            loading={pricesFetching}
            onClick={()=>handleFetch()} 
        >
            {`Get Prices (${fetchTime})`}
        </Button>
  );
}

const SearchInput = () => {
    return (
        <TextInput
            placeholder='Dark Side Of The Moon'
            icon={<Search size={14}/>}
        />
    )
}

const WantlistMantine = ({ userWantlist, setUserWantlist }) => {

    const [pricesFetching, setPricesFetching] = useState(false)

    const handleFetch = async () => {
        setPricesFetching(true)
        let result = await getWantlistPrices(userWantlist)
        setUserWantlist(result)
        setPricesFetching(false)
        localStorage.setItem("wantlist", JSON.stringify(userWantlist)) //not working ?
    }

    return (
        <AppShellMantine>
            <Group position='apart' style={{marginBottom: 16}}>
                <SearchInput/>
                <FetchPriceButton wantlist={userWantlist} pricesFetching={pricesFetching} handleFetch={handleFetch}/>
            </Group>
            <Stack align={'stretch'}>
                <WantlistHeaderMantine/>
                {/* {userWantlist
                    .sort((a, b) => (a.release.price * a.rank).toFixed(0) < (b.release.price * b.rank).toFixed(0) ? 1 : -1)
                    .map(((release, index) => <WantlistRowMantine release={release} rank={index + 1}/>))    
                } */}
                {userWantlist
                    .sort((a, b) => a.ELOscore < b.ELOscore ? 1 : -1)
                    .map(((release, index) => <WantlistRowMantine release={release} rank={index + 1}/>))    
                }
            </Stack>
        </AppShellMantine>
  );
}

export default WantlistMantine