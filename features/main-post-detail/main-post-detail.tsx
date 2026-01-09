"use client"
import Image from 'next/image'
import * as S from '../../components/post/post.styled'
import { CommonWrapper } from '@/styled/layout.styled'
import { PostMeta } from '@/components/post/postmeta'
import { PostEngagement } from '@/components/post/post-engagement'

export function MainPostDetail() {
    return (
        <CommonWrapper>
            <div className='pt-[15px]'>
                <S.Category>합사</S.Category>
                <div className='profilezone mt-[10px]'>
                    <div className='flex gap-[10px] items-center'>
                        <Image src={'/images/empty-profile.svg'}
                        width={36}
                        height={36}
                        alt=''
                        />
                        <div className='text-[1.3rem] font-bold'>닉네임</div>
                    </div>
                </div>
                <div className='mt-5'>
                    <p className='text-[1.4rem]'>
                        이 귀여운 우리 고기 이름 뭔지 아시나요?<br />
                            <br />
                        이름은 풍선몰리라는 종인데요,<br />
                        이름대로 볼록한 풍선 배를 가진게 특징입니다 ㅎㅎ<br />
                        화이트, 오렌지, 블랙 다양한 색상을 가지고 있어요.<br /><br />

                        관심 있으신 분 제 프로필로 오셔서 구경 한 번 해보세요 :D
                    </p>
                </div>
                <div className='mt-5'>
                    <div className='hashtag'>
                        <span className='text-[1.4rem] text-var(--main_color)'>#풍선몰리</span>
                    </div>
                    <div className='mt-5'>
                        <PostMeta />
                    </div>
                    <div className='mt-3.5'>
                        <PostEngagement />
                    </div>
                </div>
            </div>
        </CommonWrapper>
    )
}

const Nickname = {}