import React from 'react'
import { Box, Container, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (!user) {
            navigate('/chats');
        }
    }, [navigate]);

    return <Container maxW={'xl'} centerContent>
        <Box
            display={'flex'}
            justifyContent={'center'}
            p={3}
            bg={'blackAlpha.700'}
            w={'100%'}
            m={'40px 0 15px 0'}
            borderRadius={'lg'}
            borderWidth={'1px'}
        >
            <Text fontSize={'4xl'}
                fontFamily={'sans serif'}
                color={'teal.500'}
                fontWeight={'bold'}
                fontStyle={'italic'}>UiTalk</Text>
        </Box>
        <Box
            bg={'blackAlpha.800'}
            w={'100%'}
            p={4}
            color={'black'}
            borderRadius={'lg'}
            borderWidth={'1px'}
            boxShadow={'dark-lg'}
        >
            <Tabs variant='soft-rounded'>
                <TabList marginBottom={'1em'}>
                    <Tab w={'50%'} color={'green.500'}>Login</Tab>
                    <Tab w={'50%'} color={'green.500'}>Sign Up</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Login />
                    </TabPanel>
                    <TabPanel>
                        <Signup />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    </Container>
}

export default Home;