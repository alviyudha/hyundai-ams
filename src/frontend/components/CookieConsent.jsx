import CookieConsent from 'react-cookie-consent';

export default function CookieConsentComp() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Setuju"
      style={{
        background: "#fff",
        color: "#002c5f",
        padding: "1rem 2rem",
        fontSize: "14px",
        boxShadow: "0px 4px 20px rgba(173, 216, 230, 1)" 
      }}
      buttonStyle={{
        backgroundColor: "#3B82F6",
        color: "#FFFFFF",
        fontSize: "14px",
        padding: "8px 16px",
        borderRadius: "4px",
      }}
      containerClasses="text-center"
      contentClasses="text-sm font-medium"
      buttonClasses="transition ease-in-out duration-200 hover:bg-blue-700"
      expires={150}
    >
      Kami menggunakan cookie untuk meningkatkan pengalaman Anda di situs ini. Dengan melanjutkan, Anda menyetujui kebijakan privasi kami.{" "}
      <a href="/privacy-policy" className="text-red-500 underline hover:text-red-600 transition duration-200">
        Pelajari lebih lanjut
      </a>
    </CookieConsent>
  );
}
