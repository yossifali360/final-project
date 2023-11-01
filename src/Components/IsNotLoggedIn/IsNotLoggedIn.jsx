import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export const IsNotLoggedIn = ({children}) => {
    const isAuth = useSelector(state => state.authReducer.isAuth)
    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuth){
            navigate("/")
        }
    },[isAuth , navigate])
  return (
    <>
    {children}
    </>
  )
}
