import { Link } from 'react-router-dom'
import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import {  AnimateHeight } from './index'

export default function Omic(props) {
    const [showing, setShowing] = useState(false)
    
    return (
        <section>
            <div className='flex center sep-sm mym'>
                {[['glass', 'Glass UI'], ['components', 'Component Library'], ['sites', 'Sites']].map(([id, name], i) => (
                    <button className={`chip ${showing===id && 'selected'}`} onClick={() => setShowing(showing===id ? null : id)}>{name}</button>
                ))}
                {/* <button className={`chip ${showing==='glass' && 'selected'}`} onClick={() => setShowing(showing==='glass' ? null : 'glass')}>glass UI</button>
                <button className={`chip ${showing==='components' && 'selected'}`} onClick={() => setShowing(showing==='components' ? null : 'components')}>component library</button>
                <button className={`chip ${showing==='sites' && 'selected'}`} onClick={() => setShowing(showing==='sites' ? null : 'sites')}>sites</button> */}
            </div>

            <AnimateHeight open={showing==='glass'}>
                <Glass />
            </AnimateHeight>
            
            <AnimateHeight open={showing==='components'}>
                <Components />
            </AnimateHeight>
            
            <AnimateHeight open={showing==='sites'}>
                <Sites />
            </AnimateHeight>
        </section>
    )
}

const Glass = () => {
    return (
        <div className='glass mtm'>
            <h3>Glass UI</h3>
            <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
            <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
        </div>
    )
}

const Components = () => {
    return (
        <div className='components mtm'>
            <h3>Components</h3>
            <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
            <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
        </div>
    )
}

const sites = [
    {
        name:'os.omic.ai',
        id: 'os',
        link: 'https://www.devel.omic.ai',
        desc: 'A collaborative suite of genomics analysis tools powered by AI, served through a web app',
        img: 'img/ml.png',
        gradient: 'linear-gradient(45deg, #5b9bea11, #5b9bea33)',
        screenshots: [
            { name: 'OS Signin page', id: 'signin', desc: 'The landing page where you can sign in, create an account, or check out our efforts against Covid-19. On the right is a rotating gallery of GIFs showing off our platform.' },
            { name: 'OS Dashboard, version 1', id: 'dash1', desc: 'This is one version of our homepage, where you can manage your team, navigate to each part of the site, and receive basic activity notifications (right).' },
            { name: 'OS Dashboard, version 2', id: 'dash2', desc: 'This version of the homepage is much more informative and acts more as a biomedical dashboard, which was our aim. You can see the status of any running experiments, browse your team\'s pipelines, and receive chat and activity notifications.' },
            { name: 'Inlink python notebooks', id: 'notebooks', desc: 'Building an entire notebook editor is a bit of a large task, so instead I just used an iFrame linking to a Jupyter Notebook and applied my custom styling to the interface.' },
            { name: 'Gene selection (step in drug discovery)', id: 'gene', desc: 'In this step of drug discovery, you are provided a potential gene as well as genes with similar structures. You can view these genes in 3D and see properties such as protein-binding pockets and residues.' },
            { name: 'Risk stratification dashboard', id: 'risk', desc: 'A dashboard for one of our models, risk stratification. This dashboard is intended to be used by doctors looking for their most at-risk patients and patient cohorts.' },
            { name: 'Biomedical search page', id: 'search', desc: 'The search page for our AI search. It uses natural language processing to decipher the query and return related results, such as patents, charts, and affected patient cohorts.' },
            { name: 'Target selection (step in drug discovery)', id: 'targets', desc: 'In this step of drug discovery, we return drugs that we have screened that may target the necessary biological pathway or molecule. The pipeline returns a string representing the drug, and I used a library to display that molecule.' }
        ]
    },
    {
        name:'omic.ai',
        id: 'omic',
        link: 'https://www.omic.ai',
        desc: 'The informational site for Omic, showing users what the platform has to offer',
        img: 'img/omic-logo.png',
        gradient: 'linear-gradient(45deg, #a8f6ff55, #bd83e855)',
        screenshots: [
            { name: 'Omic.ai landing page', id: 'landing', desc: 'This the landing page for our informational website. The search bar here isn\'t functional, it autoloads a query then animates the answer appearing. This site was made in one night by me and the CTO.' },
            { name: 'Our platform', id: 'platform', desc: 'This was just an animated graphic that I placed at the top of the page showing off our platform. The dashboard had a parallax effect and soft glow behind it, giving it a futuristic feel.' },
            { name: 'Omic research publications', id: 'research', desc: 'A page showing publications by our company and their status.' },
        ]
    },
    {
        name:'c19.ai',
        id: 'c19',
        link: 'https://www.c19.ai',
        desc: 'An onboarding site for Omic OS, asking users of all disciplines to contribute to our open-source fight against Covid-19',
        img: 'img/c19.png',
        expired: true,
        gradient: 'linear-gradient(45deg, #ff9dca11, #ff9dca55)',
        screenshots: [
            { name: 'C19.ai landing page', id: 'landing', desc: 'The landing page for c19.ai. This site served as a call to action for everyone, no matter their skills or expertise. The banner cycled through representative images for doctors, biologists, coders, and everyday people.' },
            { name: 'Omic staff table', id: 'staff', desc: 'A table introducing our staff and what they do at Omic.' },
            // { name: 'Outreach to biology community', id: 'bio', desc: '...' },
        ]
    }
]

const Sites = () => {
    return (
        <SitesContainer className='mtm'>
            <h3 className=''>Websites I developed for Omic</h3>
            <p style={{fontSize: '0.9rem', opacity: 0.5, fontStyle: 'italic'}} className='mbm mtxs'>The UI for the following pages may be inspired by my work, but I have not developed for Omic since 2021 and they have made changes.</p>

            <div className=''>
                {sites.map((site, i) => (
                    <a href={site.link} target='_blank'>
                        <div className={`card hoverable mts ${site.expired && 'expired'}`} key={site.id} style={{ background: site.gradient }}>
                            <h4 className='mbxs'>{site.name}</h4>
                            <p style={{ lineHeight: 1.1 }}>{site.desc}</p>
                        </div>
                    </a>
                ))}
            </div>

        </SitesContainer>
    )
}

const SitesContainer = styled.div`
    .card {
        transition: transform 0.25s ease;
        &:hover {
            transform: translateX(10px);
        }

        &.expired {
            // border: 1px solid #f3626255;
            // color: #f36262;

            &:hover {
                // border: 1px solid #f36262;
            }

            &:after {
                pointer-events: none;
                color: #f36262;
                font-size: 0.7rem;
                content: 'SSL certificate expired';
                position: absolute;
                top: calc(100% + 25px);
                left: 0;
                width: 100%;
                opacity: 0;
                transition: all 0.25s ease;
            }

            // make the expired disclaimer text visible
            &:hover {
                &:after {
                    opacity: 1;
                    top: calc(100% + 5px);
                }
            }
        }
    }
`