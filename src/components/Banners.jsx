import ScrollStack, { ScrollStackItem } from './ScrollStack'
import pencilCaseBanner from '../assets/Pencil Case Eva Banner-Recovered.jpg'
import shopeeBanner from '../assets/Shopee Banner.jpg'
import lazadaCover from '../assets/Lazada Cover.jpg'
import { div, section } from 'motion/react-client'

function Banners() {
  return (
        <section>
            <div>
                <h1 style={{ marginBottom: '20px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' , marginTop: '20px' }}>Banners</h1>
            </div>
            <ScrollStack
                useWindowScroll
                stackPosition="28%"
                scaleEndPosition="14%"
                itemDistance={140}
            >
            <ScrollStackItem>
                <img src={pencilCaseBanner}
                alt="Pencil Case Eva Banner" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}/>
            </ScrollStackItem>
            <ScrollStackItem>
                <img src={lazadaCover}
                alt="Lazada Cover" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}/>
            </ScrollStackItem>
            <ScrollStackItem>
                <img src={shopeeBanner}
                alt="Shopee Banner" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}/>
            </ScrollStackItem>
            </ScrollStack>
        
        </section>
        
  )
}

export default Banners
