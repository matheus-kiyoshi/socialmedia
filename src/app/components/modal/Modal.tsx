'use client'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useForm, Resolver } from 'react-hook-form'
import useLogin from '../customHooks/useLogin'
import useCreate from '../customHooks/useCreate'

type FormValues = {
  username: string
  password: string
}

type Errors = {
  username?: {
    type: string
    message: string
  }
  password?: {
    type: string
    message: string
  }
}

const resolver: Resolver<FormValues> = async (values) => {
  const errors: Partial<Errors> = {}

  if (!values.username) {
    errors.username = {
      type: 'required',
      message: 'Username is required.',
    }
	}	

  if (!values.password) {
    errors.password = {
      type: 'required',
      message: 'Password is required.',
    }
  }

  return {
    values,
    errors,
  }
}

export default function Modal({type}: {type: string}) {
	const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver })

	const onSubmit = async (data: FormValues) => {
		const { username, password } = data
		if (type === 'login') {
			const response = await useLogin(username, password)
			console.log(response)
		} else if (type === 'create') {
			const response = await useCreate(username, password)
			if (response) {
				type = 'login'
			}
		}
	}

	return (
		<div className="w-screen h-screen flex justify-center items-center z-10 fixed bg-black bg-opacity-50">
			<article className="bg-white w-5/6 rounded-lg py-4 flex flex-col justify-center items-center">
				<h1 className="text-2xl font-bold text-center mb-2">{type}</h1>
				<div className="flex w-5/6 flex-col justify-center items-center gap-6">
					<Box
						component="form"
						onSubmit={handleSubmit(onSubmit)}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							autoComplete="username"
							autoFocus
							{...register('username')}
						/>
						{errors.username && (
							<p style={{ color: 'red', fontSize: '13px', marginTop: '0' }}>
								{errors?.username?.message}
							</p>
						)}{' '}
						<TextField
							margin="normal"
							required
							fullWidth
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							{...register('password')}
						/>
						{errors.password && (
							<p style={{ color: 'red', fontSize: '13px', marginTop: '0' }}>
								{errors.password.message}
							</p>
						)}{' '}
						<Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
						className='bg-blue-500'
          >
            {type === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>
						<Grid item>
							<Link href="/sign-up" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Box>
				</div>
			</article>
		</div>
	)
}