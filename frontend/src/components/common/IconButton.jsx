import React from 'react'

export const IconButton=({text,onClick,children,disabled,outline=false,customClasses,type}) => {
  return (
    <button disabled={disabled} onClick={onclick} type={type}>
      {
        children ? (
          <>
            <span>
              {text}
            </span>
            {children}
          </>
        ) : (
          { text }
        )
      }
    </button>
  )
}
