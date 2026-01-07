import styled from "styled-components"

export const Wrapper = styled.div`
    padding: 15px 0;
    border-bottom: 1px solid var(--gray_semidark_color);
`
export const ContentsArea = styled.div`
    display: flex;
    gap: 10px;
`
export const Category = styled.span`
    display: inline-block;
    padding: 4px 10px;
    border-radius: 500px;
    background-color: var(--sub_light_color);
    color: var(--gray_dark_color);
    font-size: 1rem;
`
export const Writer = styled.span`
    font-size: 1.4rem;
    font-weight: 500;
`
export const LeftSide = styled.div`
    flex: 1;
`
export const RightSide = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background-color: gold
`
export const Font = styled.span`
    color: var(--gray_dark_color);
    font-size: 1.1rem;
`
export const Font2 = styled.span`
    display: flex;
    align-items: center;
    color: var(--gray_black_color);
    font-size: 1.1rem;
`