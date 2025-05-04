import { CircularProgress, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

const AnalyticsTab = ({ authorId }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/stats/${authorId}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                if (!response.ok) throw new Error('Failed to fetch statistics');
                const data = await response.json();
                setStatistics(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (authorId) {
            fetchStatistics();
        }
    }, [authorId]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!statistics) return <Typography>No statistics available.</Typography>;

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false
    };

    const activityData = {
        labels: ['Total Writings', 'Total Reads', 'Total Likes'],
        datasets: [{
            label: 'Activity Data',
            data: [statistics.totalWritings, statistics.totalReads, statistics.totalLikes],
            backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(255, 206, 86, 0.5)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1
        }]
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px', overflow: 'hidden', height: '500px', width: '1000px' }}>
            <Typography variant="h6">Analytics Overview</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '10px', height: '450px' }}>
                        <Bar data={activityData} options={barChartOptions} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '10px', height: '450px' }}>
                        <Pie data={activityData} options={pieChartOptions} />
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AnalyticsTab;
