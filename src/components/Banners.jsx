import ScrollStack, { ScrollStackItem } from './ScrollStack'
import pencilCaseBanner from '../assets/Pencil Case Eva Banner-Recovered.jpg'
import shopeeBanner from '../assets/Shopee Banner.jpg'
import lazadaCover from '../assets/Lazada Cover.jpg'
import blossom from '../assets/Blossom-Cover3-scaled.png'
import journaling from '../assets/Journaling-Cover-Recovered-scaled (1).jpg'
import medal from '../assets/Medal-and-Certificate-Banner-scaled.jpg'
import certificate from '../assets/photo_2025-12-18_16-34-14.jpg'


function Banners() {
  return (
        <section className="section" id="banners">
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
            <ScrollStackItem>
                <img src={blossom}
                alt="Blossom Cover" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}/>
            </ScrollStackItem>
            <ScrollStackItem>
                <img src={journaling}
                alt="Journaling Cover" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}/>
            </ScrollStackItem>
            <ScrollStackItem>
                <img src={medal}
                alt="Medal and Certificate Banner" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}/>
            </ScrollStackItem>
            <ScrollStackItem>
                <img src={certificate}
                alt="Certificate Banner" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}/>
            </ScrollStackItem>
            </ScrollStack>
        
        </section>
        
  )
}

export default Banners
