import React, {useEffect} from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { BsChatLeft } from 'react-icons/bs'
import { RiNotification3Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import avatar from '../data/avatar.jpg'

import { Cart, Chat, Notif, UserProfile} from'.'
import { useStateContext } from '../contexts/contextProvider'

const Navbutton =({title, customFunc, icon, color, dotColor}) =>  (
  <TooltipComponent content={title} position="BottomCenter">
    <button 
      type='button' 
      onClick={() => customFunc()} 
      style={{ color }} 
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span style={{ background: dotColor }} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'/>
      {icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const {activeMenu, setActiveMenu, isClick, screenSize, setScreenSize, handleClick, currentColor} = useStateContext()

  useEffect(()=>{
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener('rezize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  },[])

  useEffect(() =>{
    (screenSize <= 900) 
    ? setActiveMenu(false)
    : setActiveMenu(true)
  }, [screenSize])
  
  const handleActiveMenu = () => setActiveMenu(!activeMenu)

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <Navbutton 
        title="Menu" 
        // customFunc={()=> setActiveMenu((prevMenu) => !prevMenu)} 
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu/>}
      />

      <div className="flex">
        <Navbutton 
          title="Cart"
          customFunc={() => handleClick('cart')} 
          color={currentColor}
          icon={<FiShoppingCart/>}
        />
        <Navbutton
          title="Chat"
          dotColor="#03c9d7"
          customFunc={() => handleClick('chat')}  
          color={currentColor}
          icon={<BsChatLeft/>}
        />
        <Navbutton
          title="Notification"
          dotColor="#03c9d7"
          customFunc={() => handleClick('notif')}  
          color={currentColor}
          icon={<RiNotification3Line/>}
        />
        <TooltipComponent
          content="Profile"
          position="BottomCenter"
        >
          <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg" onClick={() => handleClick('userProfile')}>
            <img src={avatar} alt="user-profile" className='rounded-full w-8 h-8'/>
            <p>
              <span className='text-gray-400 text-14'>Hi, </span>{' '}
              <span className='text-gray-400 font-bold ml-1 text-14'>Herry</span>
            </p>
            <MdKeyboardArrowDown className='text-gray-400 text-14' />
          </div>
        </TooltipComponent>
        {isClick.cart && <Cart/>}
        {isClick.chat && <Chat/>}
        {isClick.notif && <Notif/>}
        {isClick.userProfile && <UserProfile/>}
      </div>
    </div>
  )
}

export default Navbar