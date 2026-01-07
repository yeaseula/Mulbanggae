import * as S from "./post.styled"

export function PostMeta ({data}:{data?:any}) {
    return (
        <div className="flex gap-1.5 items-center">
            <S.Font>방금 전</S.Font>
            <S.Font>·</S.Font>
            <S.Font>조회수 20</S.Font>
        </div>
    )
}