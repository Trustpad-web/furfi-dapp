import React, { useCallback, useState, useEffect } from 'react'
// import { makeStyles } from '@mui/styles';
import { Button, Box, Typography, Modal, useMediaQuery } from '@mui/material'
import { IconX } from '@tabler/icons'
import { formart } from '../../helper/formatAddress';
import BNBLogo from '../../asset/images/crypto-bnb.svg'
import MetamaskIcon from '../../asset/images/metamask.svg'
import WalletConnectIcon from '../../asset/images/walletconnect.svg'
import CoinbaseWalletIcon from '../../asset/images/coinbasewallet.svg'
import { useAccount } from 'wagmi';
import useAuth from 'src/hooks/useAuth';
import { ConnectorNames } from 'src/config';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    bgcolor: '#0a172a',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px'
}

const wallets = [
    {
        logo: MetamaskIcon,
        name: 'Metamask',
        id: ConnectorNames.MetaMask

    }, {
        logo: WalletConnectIcon,
        name: 'Wallet Connect',
        id: ConnectorNames.WalletConnect
    }, {
        logo: CoinbaseWalletIcon,
        name: 'Coinbase Wallet',
        id: ConnectorNames.WalletLink
    }
]

function ConnectButton() {

    const isXs = useMediaQuery('(max-width:400px)')
    const [open, setOpen] = useState(false)
    const onClose = () => {
        setOpen(false)
    }

    const [connecting, setConnect] = useState('Metamask')
    const { isConnected, address } = useAccount();
    const { login, loading } = useAuth();

    useEffect(() => {
        if (isConnected) {
            setOpen(false);
        }
    }, [isConnected])

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                    bgcolor: '#5361DC0F',
                    borderRadius: '10000px',
                    padding: '3px 5px 5px'
                    // boxShadow: '0px 0px 2px #e57a3b'
                }}
            >
                {!isXs && <Box display='flex' alignItems='center' mx={2}>
                    <img src={BNBLogo} alt='bnb' style={{ width: '32px', height: '32px' }} />
                    <Typography sx={{ color: '#666', lineHeight: '36px', px: '10px' }}>
                        Smart Chain
                    </Typography>
                </Box>}
                <Button
                    sx={{
                        bgcolor: '#e57a3b',
                        borderRadius: '10000px',
                        textTransform: 'none',
                        color: '#FFF',
                        padding: '5px 10px 10px',
                        fontSize: '18px',
                        '&:hover': {
                            bgcolor: '#e57a3b'
                        }
                    }}
                    onClick={() => {
                        if (!isConnected)
                            setOpen(!open)
                    }}
                >
                    {(() => {
                        if (isConnected)
                            return formart(address as string)
                        else
                            return isXs ? 'Connect' : ' Connect Wallet'
                    })()}
                </Button>
            </Box>
            <Modal
                open={open}
                onClose={onClose}
            >
                <Box sx={{ ...modalStyle, width: { xs: '95%', md: '400px' } }}>
                    <Box
                        sx={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}
                        onClick={() => setOpen(false)}
                    >
                        <IconX color='#eee' />
                    </Box>
                    <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mb: 3, color: '#eee' }}>

                    </Typography>
                    {
                        wallets.map((wallet, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    bgcolor: '#0f3152',
                                    // boxShadow: '0px 1px 4px #ccc',
                                    padding: '20px',
                                    borderRadius: '15px',
                                    my: 2,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        // boxShadow: '0px 1px 4px #5361DC60',
                                    }
                                }}
                                onClick={async () => {
                                    setConnect(wallet.name)
                                    await login(wallet.id);
                                }}

                            >
                                <img src={wallet.logo} alt='walletlogo' style={{ width: '32px', height: '32px' }} />
                                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{ lineHeight: '30px', px: 3, color: '#eee' }}>{wallet.name}</Typography>
                                    {
                                        loading && (connecting === wallet.name) &&
                                        <Typography color='#eee' sx={{ display: 'flex', alignItems: 'center' }}>
                                            <FiberManualRecordIcon color='info' sx={{ mr: 1 }} />
                                            connecting
                                        </Typography>
                                    }
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            </Modal>
        </div>
    )
}

export default ConnectButton
