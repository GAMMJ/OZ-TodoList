import useFetch from "../hook/useFetch"

const RandomQuote = () => {
  const [isLoading, data] = useFetch("https://korean-advice-open-api.vercel.app/api/advice")

  return (
    <>
      {!isLoading && (
        <>
          <div>{data.message}</div>
          <div>{data.author}</div>
        </>
      )}
    </>
  )
}

export default RandomQuote
