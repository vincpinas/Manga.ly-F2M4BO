// Data Fetching Function
export const postData = async(url: string, data: any = {}) => {
    let prefix;
    if (window.location.href.includes('ma-cloud')) prefix = 'http://30472.hosts1.ma-cloud.nl' 
    else prefix = 'http://localhost'

    const response = await fetch(`${prefix}${url}`, {
        method: 'POST',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });

    return response.json();
};


// Home Page Text Handler
export const pageTextHandler = (text: string) => {
    if(text.includes('/home')) return { 
        header: 'Services', 
        title: 'The Home Page', 
        description: 'Get an overview of our best manga and join thousands of others in the reading expierence of a life time with manhwa like Solo Leveling and much more!'
    }
    else if(text.includes('/github')) return { 
        header: 'Open Source', 
        title: 'The Source Code', 
        description: 'Check out the source code of this project and many of our other projects, and who knows your contribution might end up being loved by a ton of people!'
    } 
    else if(text.includes('/welcome')) return { 
        header: 'Welcome', 
        title: 'Free Manga Online', 
        description: 'Our team hopes to spread the joy we got from other reading sites to you by bringing you what we think is the best version of such a website.'
    } 
    else if (text.includes('/founders')) return {
            header: 'Founders',
            title: 'Mr. A & Mr. B',
            description: 'The founders of this team are dedicated to improving the online etertainment ecosystem by providing online reading materials and a platform for authors to share their works, click here to read more.'
    }
    else if (text.includes('youtube')) return {
        header: 'DevLogs',
        title: 'Our YouTube Channel',
        description: `Check out our Dev Logs on YouTube where we explain in detail what we are working on and what we have made so far, we read the comments so it's also a great place to give some recommendations for the next update😉`
    }
};

export const themes = {
    light: [
        {property: 'color', value: '#161616'},
        {property: '--textcolor', value: '#161616'},
        {property: '--background', value: '#f1f1f1'},
        {property: '--lighterbackground', value: '#e6e6e6'},
        {property: '--loadbarcolor', value: '#000000'},
        {property: '--focuscolor', value: '#111111'},
    ],
    dark: [
        {property: 'color', value: '#eaeaea'},
        {property: '--textcolor', value: '#eaeaea'},
        {property: '--background', value: '#111111'},
        {property: '--lighterbackground', value: '#1a1a1a'},
        {property: '--loadbarcolor', value: '#3399ff'},
        {property: '--focuscolor', value: '#eaeaea'},
    ]
}