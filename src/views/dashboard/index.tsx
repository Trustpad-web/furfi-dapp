import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PoolCard, { IPoolCard } from './components/PoolCard';
import { useDispatch } from 'react-redux';
import { addReferrer } from '../../state/application/actions';
import Slide from 'react-slick';

import { useNavigate, useSearchParams } from 'react-router-dom';
import ClaimCard, { NoClaimCard } from './components/ClaimCard';
import { useInvestInfo } from 'src/hooks/useInvest';
import StakingCard from './components/StakingCard';
import useSWR from 'swr';
import axios from 'axios';
import { tokens } from 'src/config/token';
import { DATABASE_URL } from 'src/config';
import { trim } from 'src/helper/trim';

const useStyles = makeStyles((theme) => ({
    dashboardView: {
        display: 'flex',
        justifyContent: 'center',
        '& .MuiTypography-root': {
            color: '#FFF',
        },
    },
}));

function Dashboard() {
    const classes = useStyles();

    const { data } = useSWR(DATABASE_URL);

    const stablePools: IPoolCard[] =
        data?.instances?.map((instance) => {
            const tokenName = instance.poolName.split('_');
            return {
                aTokenLogo: tokens[tokenName[0]].logo,
                bTokenLogo: tokens[tokenName[1]].logo,
                poolName: instance.poolName,
                apy: instance.standardStrategy.Apy,
                tvl: instance.tvl,
                lpRewardsApr: instance.lpRewardsAPR,
                blockRewardsApr: {
                    furfiStrategy: instance.furiofiStrategy.FarmBaseAPR,
                    stableStrategy: instance.stableCoinStrategy.FarmBaseAPR,
                    standardStrategy: instance.standardStrategy.FarmBaseAPR,
                },
                lp: instance.poolName.toLocaleLowerCase(),
            };
        }) ?? [];

    // const mixedPools: IPoolCard[] = [
    //     {
    //         aTokenLogo: EthereumLogo,
    //         bTokenLogo: UsdcLogo,
    //         poolName: 'ETH-USDT',
    //         apy: 4.26,
    //         tvl: 0.00,
    //         lpRewardsApr: 9,
    //         blockRewardsApr: 4,
    //         lp: 'usdc_busd'
    //     }, {
    //         aTokenLogo: BtcLogo,
    //         bTokenLogo: BusdLogo,
    //         poolName: 'BTCB-BUSD',
    //         apy: 6.28,
    //         tvl: 0.00,
    //         lpRewardsApr: 9,
    //         blockRewardsApr: 4,
    //         lp: 'usdc_busd'
    //     }, {
    //         aTokenLogo: BnbLogo,
    //         bTokenLogo: BusdLogo,
    //         poolName: 'BUSD-BNB',
    //         apy: 3.24,
    //         tvl: 0.00,
    //         lpRewardsApr: 9,
    //         blockRewardsApr: 4,
    //         lp: 'usdc_busd'
    //     }
    // ]

    const slideSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const [param] = useSearchParams();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const referrer = param.get('referrer');

    useEffect(() => {
        if (referrer) {
            dispatch(addReferrer({ referrer }));
            navigate('app', { replace: true });
        }
    }, [referrer]);

    const { investData } = useInvestInfo();
    const [totalInvest, setTotalInvest] = useState(0);
    const [apy, setApy] = useState(0);

    useEffect(() => {
        if (investData) {
            let invest = 0;
            let avgApy = 0;
            investData.map((item) => {
                const lpPrice =
                    data?.instances.find((pool) => pool.poolName === item.pair.toLocaleUpperCase()).lpPrice ?? 0;
                const pairInfo = data?.instances?.find((pool) => pool.poolName === item.pair.toLocaleUpperCase());
                if (item.strategy === 'furfiStrategy') avgApy = pairInfo.furiofiStrategy.Apy ?? 0;
                else if (item.strategy === 'stableStrategy') avgApy = pairInfo.stableCoinStrategy.Apy ?? 0;
                else if (item.strategy === 'standardStrategy') avgApy = pairInfo.standardStrategy.Apy ?? 0;
                invest += lpPrice * item.amount;
            });
            setTotalInvest(invest);
            setApy(avgApy / investData.length);
        }
    }, [investData]);

    return (
        <div className={classes.dashboardView}>
            <Box sx={{ display: 'flex', flexDirection: 'column', m: 'center', width: { xs: '95%', md: '80%' } }}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        mb: 4,
                    }}
                >
                    <Box mb={2} mx={4}>
                        <Typography sx={{ fontSize: '24px' }}>Your Info</Typography>
                        <Typography>Welcome Back</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            padding: '10px 30px',
                            borderRadius: '20px',
                            width: 'fit-content',
                            border: '1px solid #e57a3bA0',
                            boxShadow: '0px 1px 4px #e57a3b',
                            '& .MuiTypography-root': {
                                color: '#FFF',
                            },
                        }}
                    >
                        <Box mx={1}>
                            <Typography>Total Investment</Typography>
                            <Typography sx={{ fontSize: '24px' }}>{trim(totalInvest, 3)}$</Typography>
                        </Box>
                        <Divider
                            orientation="vertical"
                            sx={{ mx: 1, bgcolor: '#e57a3b', display: { xs: 'none', md: 'block' } }}
                        />
                        <Box mx={1}>
                            <Typography>Estimate Monthly Income</Typography>
                            <Typography sx={{ fontSize: '24px' }}>{trim((totalInvest * apy) / 100, 3)}$</Typography>
                        </Box>
                        <Divider
                            orientation="vertical"
                            sx={{ mx: 1, bgcolor: '#e57a3b', display: { xs: 'none', md: 'block' } }}
                        />
                        <Box mx={1}>
                            <Typography>Estimate APY</Typography>
                            <Typography sx={{ fontSize: '24px' }}>{trim(apy, 3)}%</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Box sx={{ width: '400px' }}>
                        {investData && investData.length > 0 ? (
                            <Slide {...slideSettings}>
                                {investData?.map((data, index) => (
                                    <ClaimCard detail={data} key={index} />
                                ))}
                            </Slide>
                        ) : (
                            <NoClaimCard />
                        )}
                    </Box>
                    <Box sx={{ width: '400px', ml: 5 }}>
                        <StakingCard />
                    </Box>
                </Box>
                <Box mt={4}>
                    <Typography sx={{ fontSize: '24px', ml: 4 }}>Stablecoin Farmings</Typography>
                    <Box display="flex" flexWrap="wrap">
                        {stablePools.map((pool, index) => (
                            <PoolCard key={index} poolInfo={pool} />
                        ))}
                    </Box>
                </Box>
                {/* <Box mt={2}>
                    <Typography sx={{ fontSize: '24px', ml: 4 }}>Mixed Farmings</Typography>
                    <Box display='flex' flexWrap='wrap' >{
                        mixedPools.map((pool, index) => (
                            <PoolCard key={index} poolInfo={pool} />
                        ))
                    }</Box>
                </Box> */}
                <div id="pools" />
            </Box>
        </div>
    );
}

export default Dashboard;
