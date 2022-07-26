import venzelGreenIcon from "Static/challenge/venzel-green.svg";
import venzelBlueIcon from "Static/challenge/venzel-blue.svg";
import venzelPurpleIcon from "Static/challenge/venzel-purple.svg";
import venzelYellowIcon from "Static/challenge/venzel-yellow.svg";
import React from "react";

const TIER_LIMITS_RUR = {
    t5: 0,
    t4: 150,
    t3: 300,
    t2: 700,
    t1: 1000
}

export const getTierNumber = donationAmountString => {
    const donationAmount = +donationAmountString

    if(donationAmount < TIER_LIMITS_RUR.t4) return 5
    else if(donationAmount < TIER_LIMITS_RUR.t3) return 4
    else if(donationAmount < TIER_LIMITS_RUR.t2) return 3
    else if(donationAmount < TIER_LIMITS_RUR.t1) return 2
    else return 1
}

export const getVenzel = donationAmountString => {
    const donationAmount = +donationAmountString
    const tier = getTierNumber(donationAmount);

    if (tier === 4) return <img className='Challenge__venzel' src={venzelGreenIcon} alt=""/>;
    else if (tier === 3) return <img className='Challenge__venzel' src={venzelBlueIcon} alt=""/>;
    else if (tier === 2) return <img className='Challenge__venzel' src={venzelPurpleIcon} alt=""/>;
    else if (tier === 1) return <img className='Challenge__venzel' src={venzelYellowIcon} alt=""/>
};