import { useRouter } from 'next/router'

const Add = ({ }) => {
  const router = useRouter()
  const { text } = router.query

  return <p>Post: {text}</p>
}

export default Add
