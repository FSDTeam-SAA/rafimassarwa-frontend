import NewsComponent from "./NewsComponent"
import NewsScoreDashboard from "./NewsScoreDashboard"

const NewsAndScore = () => {
  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="lg:col-span-4">
            <NewsComponent />
        </div>

        <div className="lg:col-span-2">
            <NewsScoreDashboard />
        </div>
    </div>
  )
}

export default NewsAndScore