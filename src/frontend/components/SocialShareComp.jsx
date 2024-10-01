import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUp,
  faGear,
  faRoadCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SocialShareComp() {
  const [setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section id="fixed-social">
        <ul className="social">
          <li>
            <a href="#" onClick={scrollToTop}>
              <span>Scroll up</span>
              <span>
                <FontAwesomeIcon icon={faArrowUp} size="2xl" />
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/hyundaiams.id/"
              target="_blank"
              rel="noreferrer"
            >
              <span>Instagram</span>
              <span>
                <FontAwesomeIcon icon={faInstagram} size="2xl" />
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/+6281290008526"
              target="_blank"
              rel="noreferrer"
            >
              <span>WhatsApp</span>
              <span>
                <FontAwesomeIcon icon={faWhatsapp} size="2xl" />
              </span>
            </a>
          </li>
          <li>
            <Link to="/services">
              <span>Service</span>
              <span>
                <FontAwesomeIcon icon={faGear} size="2xl" />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/test-drive">
              <span>Test Drive</span>
              <span>
                <FontAwesomeIcon icon={faRoadCircleCheck} size="2xl" />
              </span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
