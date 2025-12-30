"use client"

import Link from "next/link"
import { useForm, SubmitHandler } from "react-hook-form"
import { EMAIL_REGEX, PASS_REGEX } from "@/utils/validation"
import { InputField } from "@/components/form/input-field"
import { InputAgreeField } from "@/components/form/input-agree-field"
import { SubmitButton } from "@/components/form/submit-button"
import { CommonWrapper } from "@/styled/layout.styled"

export interface SignFormValid {
    email: string
    password: string
    passwordCheck: string
    agreeTermsofUse: boolean
    privacyTermsofUse: boolean
}

export function SignUp() {

    const {
        register,
        formState: {errors, isValid, isSubmitting },
        handleSubmit,trigger,getValues
    } = useForm<SignFormValid>({
        mode: "onChange",
    })

    const onSubmit: SubmitHandler<SignFormValid> = () => handleSignUp()

    const handleSignUp = () => {

    }

    return (
        <CommonWrapper>
            <div className="pt-17">
                <p className="text-[2.4rem] font-bold">물방개를 시작해볼까요?</p>
                <p className="mt-6">
                    작은 어항에서 시작하는<br></br>
                    당신의 이야기를 담아보세요.
                </p>

                <div className="mt-22">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                        placeholder="이메일을 입력해주세요."
                        label="이메일"
                        name="email"
                        required
                        error={errors.email?.message}
                        register={register}
                        rules={{
                            required: true,
                            pattern: {
                                value: EMAIL_REGEX,
                                message: '이메일 형식을 확인해주세요. ex)book@naver.com'
                            },
                            // validate: async(email) => {
                            //     if(!EMAIL_REGEX.test(email)) return;
                            //     //const existEmail = await checkEmailExistence(email)
                            //     //return existEmail ? '이미 가입된 이메일입니다.' : true
                            //     return ''
                            // }
                        }}/>
                        {errors.email &&
                            <p className="mt-3 text-xl text-red-600">{errors.email.message}</p>
                        }
                        <div className="mt-8">
                            <InputField
                            type="password"
                            placeholder="비밀번호를 입력해 주세요."
                            label="비밀번호"
                            name="password"
                            required
                            error={errors.password?.message}
                            register={register}
                            rules={{
                                required: true,
                                pattern: {
                                    value: PASS_REGEX,
                                    message: '비밀번호는 문자+숫자 8자리 이상입니다.'
                                },
                                onChange:() => {
                                    trigger('passwordCheck')
                                }
                            }}/>
                            {errors.password &&
                            <p className="mt-3 text-xl text-red-600">{errors.password.message}</p>
                            }
                        </div>
                        <div className="mt-8">
                            <InputField
                            type="password"
                            placeholder={"비밀번호를 한번 더 입력해주세요"}
                            label="비밀번호 확인"
                            name="passwordCheck"
                            required
                            error={errors.passwordCheck?.message}
                            register={register}
                            rules={{
                                required: true,
                                validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다.'
                            }}
                            />
                            {errors.passwordCheck &&
                            <p className="mt-3 text-xl text-red-600">{errors.passwordCheck.message}</p>
                            }
                        </div>
                        <div className="mt-14">
                            <InputAgreeField
                            name="agreeTermsofUse"
                            type="checkbox"
                            label="(필수) 서비스 이용 약관에 동의합니다."
                            required
                            register={register}
                            rules={{
                                required: true
                            }}
                            />
                        </div>
                        <div className="mt-4">
                            <InputAgreeField
                            name="agreePersonal"
                            type="checkbox"
                            label="(필수) 개인정보 수집 및 이용에 동의합니다."
                            required
                            register={register}
                            rules={{
                                required: true
                            }}
                            />
                        </div>
                        <div className="mt-14 h-18">
                            <SubmitButton disabled={!isValid || isSubmitting} type="submit">회원가입</SubmitButton>
                        </div>
                    </form>

                    <div className="mt-16 mb-18 w-full h-0.5 bg-gray-200"></div>

                    <p className="text-center text-[1.2rem] text-gray-400">이미 계정이 있으신가요?
                        <Link href={'/login'} className="text-(--main_color) ml-2">이메일로 로그인</Link>
                    </p>
                </div>
            </div>
        </CommonWrapper>
    )
}