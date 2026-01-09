import { MainPostDetail } from "@/features/main-post-detail/main-post-detail"
import { Comment } from "@/features/comment/comment"

export default function PostContents() {
    return (
        <>
            <MainPostDetail />
            <div className="bar"></div>
            <Comment />
        </>
    )
}