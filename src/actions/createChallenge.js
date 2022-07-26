import {
    SET_CREATE_CHALLENGE_TYPE,
    SET_CREATE_CHALLENGE_DESCRIPTION,
    SET_CREATE_CHALLENGE_TITLE,
    SET_CREATE_CHALLENGE_DRAFT
} from 'Constants/actions'

export const setCreateChallengeType = type => ({
    type: SET_CREATE_CHALLENGE_TYPE,
    payload: type
});

export const setCreateChallengeTitle = title => ({
    type: SET_CREATE_CHALLENGE_TITLE,
    payload: title
});

export const setCreateChallengeDescription = description => ({
    type: SET_CREATE_CHALLENGE_DESCRIPTION,
    payload: description
});

export const setCreateChallengeDraft = challengeDraft => ({
    type: SET_CREATE_CHALLENGE_DRAFT,
    payload: challengeDraft
});

