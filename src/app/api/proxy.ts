// disable
export default async function proxy(token: string): Promise<any> {
  if (token !== null) {
    const response = await fetch(
      'https://incognitosocial.vercel.app/api/profile',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const user = await response.json()
    return user
  } else {
    return null
  }
}
