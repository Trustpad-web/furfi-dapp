import React from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Typography, Divider, Button } from '@mui/material'
import CoinmarketcapIcon from '../../asset/images/coinmarketcap.png'
import CoinGeckoIcon from '../../asset/images/coingecko.png'
import DappraderIcon from '../../asset/images/dappradar.png'
import DappIcon from '../../asset/images/dapp.png'

import TwitterIcon from '../../asset/images/twitter.svg'
import TelegramIcon from '../../asset/images/telegram.svg'
import DiscordIcon from '../../asset/images/discord.svg'
import MediumIcon from '../../asset/images/medium.svg'
import FacebookIcon from '../../asset/images/facebook.svg'
import InstagramIcon from '../../asset/images/instagram.svg'

import FurfiIcon from '../../asset/images/furio-icon.svg'
import SolidityIcon from '../../asset/images/solidity-banner.svg'
import useSWR from 'swr'
import { DATABASE_URL } from 'src/config'
import { trim } from 'src/helper/trim'

const useStyles = makeStyles((theme) => ({
    footerView: {
        '& .MuiTypography-root': {
            color: '#FFF'
        },
        '& .MuiButton-root': {
            color: '#FFF',
            borderRadius: '20px',
            padding: '0 20px',
            background: 'linear-gradient(0deg,#f8bf4c,#e77b3b)'
        }
    }
}))

function Footer() {
    const classes = useStyles()

    const { data } = useSWR(DATABASE_URL)
    const furfiPrice = data?.furFiPrice ?? 0

    return (
        <div className={classes.footerView}>
            <Box>
                <Divider sx={{ bgcolor: '#193855', width: '90%', mx: 'auto' }} />
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    p: 3,
                    img: {
                        width: '200px',
                        height: '60px'
                    }
                }}>
                    <img src={CoinmarketcapIcon} alt='coinmarketcap' />
                    <img src={CoinGeckoIcon} alt='coingecko' />
                    <img src={DappraderIcon} alt='coinmarketcap' />
                    <img src={DappIcon} alt='dapp' />
                </Box>
                <Divider sx={{ bgcolor: '#193855', width: '90%', mx: 'auto' }} />
            </Box>
            <Box sx={{ p: 3, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', my: 3 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexDirection: 'column',
                    width: '400px',
                    height: '200px',
                    borderRadius: '20px',
                    bgcolor: '#102747',
                    m: 2
                }}>
                    <Box sx={{ px: 2, display: 'flex', justifyContent: 'space-around' }}>
                        <Box display='flex'>
                            <img src={FurfiIcon} alt='logo' style={{ width: '60px', height: '60px', marginTop: '5px' }} />
                            <Box sx={{ mx: 2 }}>
                                <Typography>$Furfi</Typography>
                                <Typography sx={{ fontSize: '30px' }}>{trim(furfiPrice, 3)}</Typography>
                            </Box>
                        </Box>
                        <Button>
                            Buy $Furfi
                        </Button>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        m: 2,
                        '& img': {
                            width: 32,
                            height: 32,
                            m: 1
                        }
                    }}>
                        <img src={TwitterIcon} alt='twitter' />
                        <img src={TelegramIcon} alt='telegram' />
                        <img src={DiscordIcon} alt='discord' />
                        <img src={MediumIcon} alt='medium' />
                        <img src={FacebookIcon} alt='fecebook' />
                        <img src={InstagramIcon} alt='instagram' />
                    </Box>
                </Box>
                <Box sx={{ m: 2 }}>
                    <Typography sx={{ fontSize: '26px', mt: 2 }}>Useful Links</Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ mr: 2, '& .MuiTypography-root': { py: '3px' } }}>
                            <Typography>How it works</Typography>
                            <Typography>Furfi Vault</Typography>
                            <Typography>Furfi Swap</Typography>
                            <Typography>Referral</Typography>
                            <Typography>Rewards</Typography>
                        </Box>
                        <Box sx={{ ml: 2, '& .MuiTypography-root': { py: '3px' } }}>
                            <Typography>Taxes</Typography>
                            <Typography>Anti Dump</Typography>
                            <Typography>Fast Programme</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', m: 2 }}>
                    <Box mb={3}>
                        <Typography sx={{ fontSize: '26px' }}>Contact Us</Typography>
                        <Typography>info@furfi.io</Typography>
                    </Box>
                    <img src={SolidityIcon} alt='solidity' />
                </Box>
            </Box>

        </div>
    )
}

export default Footer
