import { Post } from "@/components/post/post"

export function MainPost({ data }:{data?:any}) {
    return (
        <>
            <div className="mt-3.5">
                <Post />
            </div>
        </>
    )
}