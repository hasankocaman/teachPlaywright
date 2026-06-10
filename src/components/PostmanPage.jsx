import TopicPage from './TopicPage'
import { postmanData } from '../data/postmanData'

function PostmanPage() {
    return (
        <TopicPage
            data={postmanData}
            gradient="from-orange-500 to-orange-700"
            bgLight="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
        />
    )
}

export default PostmanPage
