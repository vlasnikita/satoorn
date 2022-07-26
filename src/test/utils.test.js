import {numbersMask} from "Utils/input_masks";
import {getTierNumber} from 'Utils/challenge_tiers'
import {validateEmail, validateUrl} from 'Utils'

it('returns proper numbers string', () => {
    const notOnlyNumberString = numbersMask('abc123');
    expect(notOnlyNumberString).toBe('123')
});

it('returns proper tier number', () => {
    const donationTier5 = getTierNumber('0');
    const donationTier4 = getTierNumber('200');
    const donationTier3 = getTierNumber('400');
    const donationTier2 = getTierNumber('800');
    const donationTier1 = getTierNumber('2000');
    expect(donationTier5).toBe(5);
    expect(donationTier4).toBe(4);
    expect(donationTier3).toBe(3);
    expect(donationTier2).toBe(2);
    expect(donationTier1).toBe(1)
});

it('returns if url', () => {
    const isUrl = validateUrl('vk.com');
    const isNotUrl = validateUrl('vk..com');
    expect(isUrl).toBe(true);
    expect(isNotUrl).toBe(false)
});
it('returns if email', () => {
    const isEmail = validateEmail('test@vk.com');
    const isNotEmail = validateEmail('vk.@.m');
    expect(isEmail).toBe(true);
    expect(isNotEmail).toBe(false)
});