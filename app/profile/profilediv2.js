// ProfileDiv2 component
import React from 'react';
import Grid from '@mui/material/Grid';
import { UserEmissions } from './user-emissions';
import { UserReports } from './user-reports';
import { UserPubReports } from './user-pubreports';

export const ProfileDiv2 = ({ showPrivatePosts, showAllReports, showPublicPosts }) => {
    return (
        <Grid>
            <UserEmissions />
            <br />
            {showAllReports ? (
                <>
                    <UserReports />
                    <UserPubReports />
                </>
            ) : showPrivatePosts ? (
                <UserReports />
            ) : showPublicPosts ? (
                <UserPubReports />
            ) : null}
            <br />
        </Grid>
    );
};
