import { createSelector } from 'reselect';

const getParts = state => state.parts;

const parseParts = createSelector(
    [getParts],
    parts => parts,
);

export default parseParts;
