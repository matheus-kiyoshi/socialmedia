import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function ErrorAlert({text}: {text: string}) {
	return (
		<Stack sx={{ width: '100%' }} spacing={2}>
			<Alert severity="error">{text}</Alert>
    </Stack>
	)
}

function WarningAlert({text}: {text: string}) {
	return (
		<Stack sx={{ width: '100%' }} spacing={2}>
			<Alert severity="warning">{text}</Alert>
    </Stack>
	)
}

function InfoAlert({text}: {text: string}) {
	return (
		<Stack sx={{ width: '100%' }} spacing={2}>
			<Alert severity="info">{text}</Alert>
    </Stack>
	)
}

function SuccessAlert({text}: {text: string}) {
	return (
		<Stack sx={{ width: '100%' }} spacing={2}>
			<Alert severity="success">{text}</Alert>
    </Stack>
	)
}

export const Alerts = {
	Error: ErrorAlert,
	Warning: WarningAlert,
	Info: InfoAlert,
	Success: SuccessAlert
}
