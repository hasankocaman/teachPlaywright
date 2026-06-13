import TopicPage from './TopicPage'
import { restAssuredData } from '../data/restAssuredData'

function RestAssuredPage() {
    return (
        <TopicPage
            data={restAssuredData}
            gradient="from-green-600 to-emerald-700"
            bgLight="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
        />
    )
}

export default RestAssuredPage
