import useFetch from "../hook/useFetch"

const RandomQuote = () => {
  const [isLoading, data] = useFetch("https://korean-advice-open-api.vercel.app/api/advice")

  return (
    <>
      {!isLoading && (
        <div className="quotes">
          <div className="quote-message">"{data.message}"</div>
          <div className="quote-author">{data.author}</div>
        </div>
      )}
    </>
  )
}

export default RandomQuote
