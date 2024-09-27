import React from 'react'
import { Divider, Typography, useMediaQuery, Avatar, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { IconMenu2 } from '@tabler/icons'
import ConnectButton from './ConnectWallet'
import FurfiLogo from '../../asset/images/furio-icon.svg'
import BNBLogo from '../../asset/images/crypto-bnb.svg'
import { NavLink } from 'react-router-dom'
import useSWR from 'swr'
import { DATABASE_URL } from 'src/config'
import { trim } from 'src/helper/trim'

interface IHeader {
    handleDrawerToggle?: () => void
}

const useStyles = makeStyles(theme => ({

    topBar: {
        backgroundColor: 'transparent',
        width: '100%',
        '& .MuiTypography-root': {
            color: '#FFF',
            whiteSpace: 'nowrap'
        }
    },
    valuePanel: {
        padding: '8px 20px',
        display: 'flex',
        overflow: 'auto',
        justifyContent: 'space-between',
        background: 'linear-gradient(90deg,#0f1f2e,#e57a3b)',
        borderBottom: '1px solid #e57a3b',
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgb(191 131 70)'
        }
    },
    topBarShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: 1000
        }),
        marginLeft: 0
    },
    toggleButton: {
        marginLeft: '15px'
    }
}))

function Header({ handleDrawerToggle }: IHeader) {
    const is960 = useMediaQuery('(max-width:960px)')
    const isXs = useMediaQuery('(max-width:768px)')
    const classes = useStyles()

    const { data } = useSWR(DATABASE_URL)

    const bnbPrice = data?.bnbPrice ?? 0
    const furfiPrice = data?.furFiPrice ?? 0
    const tvl = data?.tvl ?? 0

    return (
        <div className={classes.topBar}>
            <Box className={classes.valuePanel}>
                <Box display='flex' sx={{ '& .MuiBox-root': { display: 'flex', alignItems: 'center', mx: 1 } }}>
                    <Box >
                        <img src={FurfiLogo} alt='furfi' style={{ width: '32px', height: '32px' }} />
                        <Typography mx={1}>Furfi Price : {trim(furfiPrice, 3)}$</Typography>
                    </Box>
                    <Box >
                        <img src={BNBLogo} alt='bnb' style={{ width: '32px', height: '32px' }} />
                        <Typography mx={1}>BNB Price : {trim(bnbPrice, 3)}$</Typography>
                    </Box>
                    <Box >
                        <Divider orientation='vertical' sx={{ bgcolor: '#FFF' }} />
                        <Typography ml={2}>TVL: ${trim(tvl, 3)}</Typography>
                    </Box>
                </Box>
                <Box display='flex' alignItems='center' sx={{ '& .MuiTypography-root': { px: 1 } }}>
                    <Typography>Trade</Typography>
                    <Typography>Whitepaper</Typography>
                    <Typography>Website</Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: { xs: 'end', md: 'space-between' },
                    alignContent: 'center',
                    p: 2
                }}
            >
                {!isXs &&
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '& .MuiTypography-root': {
                            px: 1.5
                        }
                    }}>
                        <Typography sx={{ fontSize: '36px', fontFamily: 'Furfi', mr: 2 }}>Furfi Farm</Typography>
                        <NavLink to='/app'>
                            <Typography fontSize={20} mt={1}>App</Typography>
                        </NavLink>
                        <NavLink to='/referral'>
                            <Typography fontSize={20} mt={1}>Referral</Typography>
                        </NavLink>
                        <NavLink to='/freezer'>
                            <Typography fontSize={20} mt={1}>Freezer</Typography>
                        </NavLink>
                    </Box>
                }
                <Box display='flex' alignItems='center'>
                    <ConnectButton />
                    {
                        is960 && (
                            <div onClick={handleDrawerToggle} className={classes.toggleButton}>
                                <Avatar
                                    sx={{
                                        bgcolor: '#e77b3b',
                                        boxShadow: '0px 1px 4px #ccc',
                                        mt: '3px'
                                    }}

                                >
                                    <IconMenu2 color='#FFF' />
                                </Avatar>
                            </div>
                        )
                    }
                </Box>
            </Box>
        </div >
    )
}

export default Header
