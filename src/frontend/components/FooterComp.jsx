import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faSquareFacebook, faSquareInstagram } from "@fortawesome/free-brands-svg-icons";


export default function FooterComp() {
  
  return (
    <div>
        <footer className="footer text-white p-10 bg-hyundai" data-aos="fade-up"
    data-aos-anchor-placement="center-bottom">
        <div className="container mx-auto grid grid-cols-1">
    <div>
      <h3 className="text-xl font-bold mb-2">Office</h3>
      <p>
        Jl. RP. Soeroso No.38, RT.2/RW.2,<br />
        Gondangdia, Kec. Menteng, Kota Jakarta Pusat<br />
        Daerah Khusus Ibukota Jakarta 10350<br />
        <strong>Phone:</strong> 0812-9000-8526<br />
        <strong>Email:</strong> info@hyundaiams.co.id<br />
      </p>
    </div>
    </div>
  <nav>
    <h6 className="footer-title">Our Location</h6>
    <a className="link link-hover">Hyundai Bintaro</a>
    <a className="link link-hover">Hyundai Pegangsaan</a>
    <a className="link link-hover">Hyundai Pondok Gede</a>
    <a className="link link-hover">Hyundai Tangerang City</a>
    <a className="link link-hover">Hyundai City Store Summarecon Mall Serpong</a>
  </nav>
</footer>
<footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
  <aside className="grid-flow-col items-center">
    <img src="/ams_logo_merah.png" alt="" className='h-8' />
   
  </aside>
  <nav className="md:place-self-center md:justify-self-end">
    
  <div className="social-links mb-3 ">
          <a href="#" className="hover:scale-150"><FontAwesomeIcon icon={faSquareFacebook} className='hover:scale-150 transition-all duration-500'/></a>
          <a href="https://www.instagram.com/hyundaiams.id/" target='_blank' className="instagram" rel="noreferrer"><FontAwesomeIcon icon={faSquareInstagram} className='hover:scale-150 transition-all duration-500' /></a>
        </div>
  </nav>
</footer>
    </div>


  
  )
}
