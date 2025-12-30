"use client"

import { useForm, SubmitHandler, FormProvider, useWatch } from "react-hook-form"
import { InputField } from "@/components/form/input-field"
import { CommonWrapper } from "@/styled/layout.styled"
import { SubmitButton } from "@/components/form/submit-button"

export interface SignFormValid {
    email: string
    password: string
    passwordCheck: string
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

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const PASS_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return (
        <CommonWrapper>
            <div className="pt-17">
                <p className="text-[2.4rem] font-bold">물방개를 시작해볼까요?</p>
                <p className="mt-6">
                    작은 어항에서 시작하는<br></br>
                    당신의 이야기를 담아보세요.
                </p>

                <div className="mt-10">
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
                            <p className="text-red-600 mt-3 text-xl">{errors.email.message}</p>
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
                            <p className="text-red-600 mt-3 text-xl">{errors.password.message}</p>
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
                            <p className="text-red-600 mt-3 text-xl">{errors.passwordCheck.message}</p>
                            }
                        </div>
                        <div className="h-18 mt-14">
                            <SubmitButton disabled={!isValid || isSubmitting} type="submit">회원가입</SubmitButton>
                        </div>
                    </form>
                </div>
            </div>
        </CommonWrapper>
    )
}