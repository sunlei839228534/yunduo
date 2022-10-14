import { MenuProps } from "antd"
import { MenuClickEventHandler } from "rc-menu/lib/interface"
import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router"



export const useMenu = (items: MenuProps['items']) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [selectedKey, setSelectedKey] = useState(pathname)

  const matchSelectedKey = () => {
    let result = ''
    const keys = pathname.split('/').filter(i => i)
    const normalizedKeys = keys.map((v, i) => `/${keys.slice(0, i + 1).join('/')}`)
    items?.forEach(i => {
      if (!i?.key) return
      const key = normalizedKeys.find(n => n === i.key)
      //如果匹配上了
      if (key) {
        result = key
      } else {
        return
      }
    })
    return result
  }

  const changeMenuItem: MenuClickEventHandler = ({ key }) => {
    navigate(key)
  }

  useEffect(() => {
    setSelectedKey(matchSelectedKey())
  }, [pathname])

  return useMemo(() => ({
    changeMenuItem,
    selectedKey
  }), [selectedKey])
}