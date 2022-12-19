import React from 'react'
// import "antd/dist/antd.css";

interface IProps {
    children: React.ReactNode
}

function AntdProvider(props: IProps) {
  return(
    <>
      {props.children}
    </>
  )
}

export default AntdProvider