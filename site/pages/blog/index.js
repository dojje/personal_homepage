import styles from '../../styles/blog.module.scss'
import moment from 'moment'
import Page from '../../components/page';
import Cookie from 'js-cookie'
import cookie from "cookie"
import parseCookies from '../../helpers/parseCookies';

import { useState, useEffect } from 'react';
import TunnelbaneRace from '../../blogposts/subway-race';

function BlogPost({name, time, id}) {
    let postDate = moment.unix(time)
    let href = "/blog/" + id
    return (
        <a href={href} className={styles.blog_post} key={id}>
            <b>
                {name}
            </b>
            <p
                style={{
                    margin: "0",
                }}
            >
                {postDate.format("YYYY-MM-DD HH:MM")}
            </p>
        </a>
    )
}

export default function Blog({initialLang}) {
    console.log(initialLang)
    const [lang, setLang] = useState(initialLang);

    let posts = [TunnelbaneRace];

    let valid_posts = posts.filter(post => {
        return new post().manifest().languages.includes(lang)
    });

    return (
    <Page lang={lang} setLang={setLang}>
        {
            valid_posts.map(post => {
                let post_manifest = new post().manifest();
                return <BlogPost id={post_manifest.id} name={post_manifest.name[lang]} time={post_manifest.lastEdited}/>
            })
        }
    </Page>
    )
}

Blog.getInitialProps = ({ req }) => {
    const cookies = parseCookies(req);

    return {
        initialLang: cookies.lang || "en"
    }
}
