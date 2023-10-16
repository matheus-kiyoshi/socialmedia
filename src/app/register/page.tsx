'use client'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useForm, Resolver } from 'react-hook-form'
import useCreate from '../components/customHooks/useCreate'
import { useRouter } from 'next/navigation'
import BasicModal from '../components/modal/Modal'
import { Alerts } from '../components/alert/Alert'
import { useState } from 'react'

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
    errors.username = { type: 'required', message: 'Username is required.' }
  } else {
    const usernameRegex = /^[a-z0-9]+$/
    if (values.username.trim() !== values.username || !usernameRegex.test(values.username) || values.username.length < 1) {
      errors.username = { type: 'invalid', message: 'Username is invalid. Must only contain lowercase letters and numbers, no spaces, no emojis/symbols/special characters.' }
    }
  }

  if (!values.password) {
    errors.password = { type: 'required', message: 'Password is required.' }
  } else if (values.password.length <= 8) {
    errors.password = { type: 'invalid', message: 'Password must be at least 8 characters long.' }
  }

  return {
    values,
    errors,
  }
}

export default function Register() {
  const [modal, setModal] = useState(false)
  const [alertText, setAlertText] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver })
  const router = useRouter()

  const OnSubmit = async (data: FormValues) => {
    const { username, password } = data
    const response = await useCreate(username, password)
    if (response) {
      router.push('/api/auth/signin')
    } else {
      setAlertText('Something went wrong, please try again.')
      setModal(true)
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center z-50 fixed bg-white">
      {modal && (
        <BasicModal open={modal} handleClick={() => setModal(false)}>
          <Alerts.Error text={alertText} />
        </BasicModal>
      )}
      <article className="w-[400px] h-[500px] rounded-lg py-4 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>
        <div className="flex w-5/6 flex-col justify-center items-center gap-6">
          <Box
            component="form"
            onSubmit={handleSubmit(OnSubmit)}
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
              className="bg-blue-500"
            >
              Sign Up
            </Button>
          </Box>
        </div>
      </article>
    </div>
  )
}
