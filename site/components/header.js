import styles from '../styles/home.module.scss'
import { useEffect } from 'react'
import Cookie from 'js-cookie'

function LinkButton({lang, href, text}) {
  return (
    <a href={href}>
      <button style={{
        fontSize: "24px",
        marginLeft: "auto",
        padding: "10px 15px",
        backgroundColor: "var(--accent)",
      }}>
        {text}
      </button>
    </a>
  )
}

const Header = ({lang, setLang}) => {
  let getLang = () => {
    if (lang === "sv") {
      return "in english"
    } else if (lang === "en") {
      return "in swedish"
    } else {
      return "nothing"
    }
  }
  
  let switchLang = () => {
    if (lang === "sv") {
      setLang("en")
    } else if (lang === "en") {
      setLang("sv")
    }
  }

  useEffect(() => {
      console.log("heer");
      Cookie.set("lang", lang, {expires: 356, sameSite: "strict"});
  }, [lang])

  return (
    <div style={{
      width: "100%",
      backgroundColor: "var(--background)",
      padding: "20px 60px",

      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
    }} >
      <div>
        <LinkButton text={lang === "en" ? "blog" : "blogg"} href="/blog" />
      </div>
      <a href="/">
        <h2>{lang == "en" ? "dojjes personal homepage" : "dojjes hemsida"}</h2>
      </a>
      <button 
        style={{
          fontSize: "24px",
          marginLeft: "auto",
        }}
        onClick={switchLang}
        >
        {getLang()}
      </button>
    </div>
  )
}

export default Header;
